import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
    return (
        <Box 
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.100'
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h4" component="h1" sx={{ color: 'text.primary', fontWeight: 'bold'}}>
                    Create Account!
                </Typography>
                <Box component="form" sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        placeholder="me@exe-coll.ac.uk"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        placeholder="******************"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        placeholder="******************"
                        variant="outlined"
                        margin="normal"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
