
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
import { LocationOn, Email, Phone, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
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
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
    if (!token) {
      navigate("/Companylogin");
    } else {
      fetchJobs();
    }
    fetchJobs();
  }, []);
  
  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://my-elegant-backend-api.onrender.com/jobs/getJobsByCompany", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
  
      if (response.status === 200) {
        setJobs(response.data.data);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        if (error.response.status === 403) {
          console.error("Forbidden. Likely token issue or permissions.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  
  

  const deleteJob = async (jobId) => {
    try {
      console.log( `Attempting to delete job with ID: ${jobId}`);
  
      // Sending a DELETE request to the API endpoint
      const res = await axios.delete(`https://my-elegant-backend-api.onrender.com/jobs/Job/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")} `},
      });
  
      if (res.status === 200) {
        console.log("Job deleted successfully:", res.data.message || "Job deleted.");
  
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        setSelectedJob(null); 
      } else {
        console.error("Unexpected response while deleting job:", res.statusText);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Failed to delete job:", errorMessage);
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

  const handleCardClick = async (jobId) => {
    console.log("Fetching job with ID:", jobId);
  
    try {
      const res = await axios.get(`https://my-elegant-backend-api.onrender.com/jobs/getJob/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
  
      if (res.status === 200) {
        console.log("Job fetched successfully:", res.data.job);
        setSelectedJob(res.data.job); 
      } else {
        console.error("Failed to fetch job details:", res.statusText);
      }
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Failed to get job:", errorMessage);
    }
  };
  
  

  if (selectedJob) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Job Details
          </Typography>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3,backgroundColor:"rgb (255, 248, 226)" }} >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedJob?.title || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Category:</strong> {selectedJob?.category || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Location:</strong> {selectedJob?.location || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Qualification:</strong> {selectedJob?.qualification || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Key Skills:</strong> {selectedJob?.skills || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Employment Type:</strong> {selectedJob?.employementType || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Salary:</strong> {selectedJob?.salary || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Positions:</strong> {selectedJob?.position || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Experience:</strong> {selectedJob?.experienceLevel || "N/A"}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    fontWeight: "bold",
                    boxShadow: 3,
                    "&:hover": { backgroundColor: "#d32f2f" },
                  }}
                  onClick={() => deleteJob(selectedJob?._id)}
                >
                  Remove
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    boxShadow: 3,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => setSelectedJob(null)}
                >
                  Cancel
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "rgb(228, 45, 64)"}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", }}>
          <Typography variant="h4" component="div" sx={{fontFamily:"Times New Roman",}}>
            RealEstatePro
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => navigate("/applieduser")}
            sx={{ fontFamily:"Times New Roman",fontSize:"1rem",marginRight:"10px"}}
          >
            Applicants
          </Button>
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
        <Typography variant="h4" sx={{ mb: 4, animation: "colorChange 3s infinite", }}>
          Welcome to the Company Dashboard
        </Typography>
        <style>
        {`
          @keyframes colorChange {
            0% {color: rgb(71, 221, 255)}
            50% {color:rgb(255, 151, 71); /* Change to a different color (e.g., Tomato) */}
            100% {color:rgb(212, 55, 230);
          }
        `}
      </style>

        {/* Job Cards or No Job Message */}
        {jobs.length > 0 ? (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id}>
                <Card
                  sx={{
                    backgroundColor:"rgb(239, 222, 136)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleCardClick(job._id)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Category:</strong> {job.category}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Location:</strong> {job.location}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Salary:</strong> ${job.salary.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No jobs available.</Typography>
        )}
        {/* Add New Job Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 ,borderRadius:"20px",backgroundColor:"rgb(239, 47, 47)"}}
          onClick={() => navigate("/Addtojob")}
        >
          Add New Job
        </Button>
      </Container>

      {/* footer */}
       <Box sx={{backgroundColor: "rgb(228, 45, 64)", color: "#fff", py: 4, px: 2 }}>
          <Grid container justifyContent="space-evenly" alignItems="flex-start">
            {/* Company Details */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Company Details
              </Typography>
              <Typography>RealEstate Co.</Typography>
              <Typography>Building Dreams, One Home at a Time.</Typography>
              <Typography>www.realestate.com</Typography>
            </Grid>
      
            {/* Contact Info */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Contact Info
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOn sx={{ mr: 1 }} /> <Typography>123 RealEstate Ave, City, Country</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Email sx={{ mr: 1 }} /> <Typography>contact@realestate.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Phone sx={{ mr: 1 }} /> <Typography>+1 234-567-8900</Typography>
              </Box>
            </Grid>
      
            {/* Social Links */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Social Links
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  gap: 2,
                }}
              >
                {[
                  { icon: <Facebook />, link: "https://facebook.com", color: "#1877F2" },
                  { icon: <Twitter />, link: "https://twitter.com", color: "#1DA1F2" },
                  { icon: <Instagram />, link: "https://instagram.com", color: "linear-gradient(45deg, #FF0099, #FF9933)" },
                  { icon: <LinkedIn />, link: "https://linkedin.com", color: "#0077B5" },
                ].map((platform, index) => (
                  <a
                    key={index}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: platform.color.includes("gradient") ? undefined : platform.color,
                        background: platform.color.includes("gradient") ? platform.color : undefined,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        color: "#fff",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.2)",
                          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)",
                        },
                      }}
                    >
                      {platform.icon}
                    </Box>
                  </a>
                ))}
              </Box>
            </Grid>
          </Grid>
      
          {/* Footer Text */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
            © 2023 All Rights Reserved By RealEstate Co.
          </Typography>
        </Box>
    </Box>
  );
};

export default CompanyDashboard;
