import { useEffect, useState } from "react";
import { getAllRequest, approveEvents } from "../../service/api";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress, Container } from "@mui/material";

const AdminEventApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const adminId = "cm59h9rcf0000mmwq4tmpxsxq"; 

  // Fetch requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllRequest(adminId);
      setRequests(response.data.requests || []);
      console.log(response)
    } catch (err) {
      setError("Failed to fetch requests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle approve/reject action
  const handleAction = async (eventId, status) => {
    try {
      await approveEvents(eventId, status);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.event.id === eventId
            ? { ...request, event: { ...request.event, status, isAdminApproved: status === "APPROVED" } }
            : request
        )
      );
    } catch (err) {
      console.error(`Failed to ${status.toLowerCase()} the event.`, err);
      alert(`Failed to ${status.toLowerCase()} the event.`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin Event Approval
      </Typography>
      {requests.length === 0 ? (
        <Typography>No requests available.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Organizer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.event.title}</TableCell>
                <TableCell>{request.event.description}</TableCell>
                <TableCell>{request.user.name} ({request.user.email})</TableCell>
                <TableCell>{request.event.status}</TableCell>
                <TableCell>
                  {request.event.status === "PENDING" ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAction(request.event.id, "APPROVED")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleAction(request.event.id, "REJECTED")}
                        style={{ marginLeft: "10px" }}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Typography>
                      {request.event.status === "APPROVED" ? "Approved" : "Rejected"}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default AdminEventApprovalPage;

