import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppliedJobsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  // Fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
            navigate("/Userlogin");
        }
        const response = await axios.get("http://localhost:5000/applied-jobs", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Fetched applied jobs:", response.data);
        setJobs(response.data); // Assuming response.data is an array of jobs
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    // Navigate to the profile page
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout functionality
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
            RealEstatePro
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ marginRight: 1 }}
          >
            <ArrowCircleLeftIcon fontSize="large" />
          </IconButton>

          <Button
            color="inherit"
            onClick={() => navigate("/listed-applied")}
            sx={{ marginRight: 2 }}
          >
            Listed U Applied
          </Button>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Content Section */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Applied Jobs
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : jobs.length === 0 ? (
          <Typography variant="body1">No applied jobs found.</Typography>
        ) : (
          <List>
            {jobs.map((job) => (
              <Card key={job.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{job.job?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Company: {job.job?.companyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {job.job?.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Employment Type: {job.job?.employmentType}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
};

export default AppliedJobsPage;
