import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]); 
  const [selectedJob, setSelectedJob] = useState(null); 

  useEffect(() => {
        
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/addjob");
        console.log(response);
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:3000/addjob/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      setSelectedJob(null); 
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/Companyprofile");
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    navigate("/Companylogin");
    handleMenuClose();
  };

  const handleCardClick = (jobId) => {
    const job = jobs.find((job) => job.id === jobId);
    setSelectedJob(job);
  };

  if (selectedJob) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Job Details
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedJob.jobTitle}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {selectedJob.category}
              </Typography>
              <Typography variant="body1">
                <strong>Company Name:</strong> {selectedJob.companyName}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {selectedJob.location}
              </Typography>
              <Typography variant="body1">
                <strong>Qualification:</strong> {selectedJob.qualification}
              </Typography>
              <Typography variant="body1">
                <strong>Key Skills:</strong> {selectedJob.keySkills}
              </Typography>
              <Typography variant="body1">
                <strong>Employment Type:</strong> {selectedJob.employmentType}
              </Typography>
              <Typography variant="body1">
                <strong>Salary:</strong> {selectedJob.Salary}
              </Typography>
              <Typography variant="body1">
                <strong>Position:</strong> {selectedJob.Position}
              </Typography>
              <Typography variant="body1">
                <strong>Experience:</strong> {selectedJob.Experience}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => deleteJob(selectedJob.id)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

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
              onClick={handleAvatarClick}
            >
              <Avatar src="/broken-image.jpg" />
            </Avatar>

            {/* Menu for Avatar */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          padding: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome to the Company Dashboard
        </Typography>

        {/* Job Cards or No Job Message */}
        {jobs.length > 0 ? (
          <Grid container spacing={3}>
            {jobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleCardClick(job.id)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {job.jobTitle}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Category:</strong> {job.category}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Company Name:</strong> {job.companyName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : null}

        {/* Add New Job Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => navigate("/Addtojob")}
        >
          Add New Job
        </Button>
      </Container>
        </Box>
    
  );
};

export default CompanyDashboard;