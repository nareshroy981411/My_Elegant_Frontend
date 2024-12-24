import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const CompanyDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="div">
            Company Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                cursor: "pointer",
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
              }}
              alt="Company Avatar"
            >
              <Avatar src="/broken-image.jpg" />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center", // Horizontally center the content
          alignItems: "center", // Vertically center the content
          minHeight: "calc(100vh - 64px)", // Subtract AppBar height for full viewport use
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Welcome to the Company Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => alert("Add New Job Clicked")}
          >
            Add New Job
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CompanyDashboard;