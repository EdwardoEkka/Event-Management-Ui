import { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole } from '../../service/api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Stack,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setLoading(false);

        // Initialize roles state with current user roles
        const initialRoles = {};
        fetchedUsers.users.forEach((user) => {
          initialRoles[user.id] = user.role;
        });
        setRoles(initialRoles);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));
  };

  const handleUpdateRole = async (userId) => {
    try {
      const newRole = roles[userId];
      await updateUserRole({ userId, userRole: newRole });
      setToast({
        open: true,
        message: `Role updated to ${newRole} for user ${userId}`,
        severity: 'success',
      });
    } catch (error) {
      console.error("Error updating role:", error);
      setToast({
        open: true,
        message: 'Failed to update role. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">All Users</Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center">
        {users.users.map((user) => (
          <Box key={user.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">Current Role: {user.role}</Typography>
                <Select
                  value={roles[user.id] || user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="ORGANIZER">ORGANIZER</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => handleUpdateRole(user.id)}
                >
                  Update Role
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>

      {/* Snackbar for toast notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SuperAdmin;
