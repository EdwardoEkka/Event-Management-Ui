import { useEffect, useState } from "react";
import { getOrganizersEvents, createApprovalRequest, getAllAdmins } from "../../service/api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";

const OrganizedEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admins, setAdmins] = useState([]); // Store admin data
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(""); // Store selected admin
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getOrganizersEvents(user.id);
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred.");
        setLoading(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await getAllAdmins();
        setAdmins(response.data); // Store the admin data
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
    fetchEvents();
  }, [user.id]);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setMessage("");
    setSelectedAdmin("");
  };

  const handleRequest = async () => {
    if (!selectedEvent || !message || !selectedAdmin) return;
    try {
      await createApprovalRequest(user.id, selectedEvent.id, selectedAdmin, message);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id ? { ...event, isRequestedForApproval: true } : event
        )
      );
      handleClose();
    } catch (err) {
      console.error("Error creating request:", err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      {events.length > 0 ? (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Description:</strong> {event.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date and Time:</strong> {new Date(event.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Status:</strong> {event.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Request:</strong>{" "}
                    {event.isRequestedForApproval ? "Requested" : "Not Requested"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Admin Approval:</strong> {event.isAdminApproved ? "Approved" : "Pending"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Venue Approval:</strong> {event.isVenueApproved ? "Approved" : "Pending"}
                  </Typography>
                  {!event.isRequestedForApproval && event.status !== "APPROVED" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleOpen(event)}
                    >
                      Request Approval
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No events found</Typography>
      )}

      {/* Dialog for creating approval request */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Approval Request</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Event: {selectedEvent?.title}
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Admin</InputLabel>
            <Select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              label="Select Admin"
            >
              {admins.map((admin) => (
                <MenuItem key={admin.id} value={admin.id}>
                  {admin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRequest} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrganizedEventsPage;
