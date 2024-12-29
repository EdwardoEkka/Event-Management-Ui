import { useEffect, useState } from "react";
import { getAllApprovedEvents } from "../../service/api";
import { Card, CardContent, Typography, Grid, Container} from "@mui/material";

const ListEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await getAllApprovedEvents();
        console.log(response); 
        setEvents(response);    
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getEvents(); 
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Approved Events
      </Typography>
      {events.length > 0 ? (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Description:</strong> {event.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date and Time:</strong>{" "}
                    {new Date(event.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Status:</strong> {event.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Admin Approval:</strong> {event.isAdminApproved ? "Approved" : "Pending"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Venue Approval:</strong> {event.isVenueApproved ? "Approved" : "Pending"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No events found</Typography>
      )}
    </Container>
  );
};

export default ListEvent;
