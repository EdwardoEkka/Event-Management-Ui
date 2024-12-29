import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { createEvent } from "../../service/api";
import { useSelector } from "react-redux";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "", // keep the name as 'date'
    location: "",
  });

  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEvent({ ...formData, createdById: user.id });
      console.log("Event created:", response.data);
      alert("Event created successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Event
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          required
          margin="normal"
        />
        {/* Modified input for Date and Time */}
        <input
          type="datetime-local"
          id="date"
          name="date" // use 'date' to match the state variable
          value={formData.date}
          onChange={handleInputChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "8px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Create Event
        </Button>
      </Box>
    </Container>
  );
};

export default CreateEventForm;
