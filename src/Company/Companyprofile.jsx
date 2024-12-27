import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  CssBaseline,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Companyprofile = () => {
  const navigate = useNavigate(); 

  const handleCloseClick = () => {
    navigate("/CompanyDashboard"); 
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Navbar */}
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#003366", // US blue color
              color: "white",
            }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Profile
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={handleCloseClick}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Form content */}
          <Box
            component="form"
            noValidate
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField label="Company Name" fullWidth required />
            <TextField label=" Company Email" type="email" fullWidth required />
            <TextField label="Company Established Date" type="date" fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="Company Registration Number" fullWidth required />
            <TextField label="Company Website Link"  type="url"fullWidth required />
            <TextField label="Password" type="password" fullWidth required />
            <TextField
              label="About Company"
              fullWidth
              multiline
              rows={4}
              required
            />
            <TextField label="Location"fullWidth required />
          </Box>

          {/* Footer */}
          <Box
            sx={{
              backgroundColor: "#003366", // US blue color
              color: "white",
              py: 2,
              px: 3,
              display: "flex",
              justifyContent: "flex-end", // Align Save button to the right
              alignItems: "center",
            }}
          >
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Companyprofile;