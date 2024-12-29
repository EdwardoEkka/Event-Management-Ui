import { Container, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <Container maxWidth="lg">
            <Box mt={4} display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="h4" gutterBottom>
                    Welcome, {user.name}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Role: {user.role}
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
