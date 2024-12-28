
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
// } from "@mui/material";
// import { AccountCircle} from "@mui/icons-material";
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const Userlistedjobs = () => {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applySuccess, setApplySuccess] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Retrieve the token from local storage
//         const token = localStorage.getItem('token');
        
//         const response = await axios.get(
//           `http://localhost:5000/jobs/getJobsByCategory?category=${category}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}` // Include the token in the request
//             }
//           }
//         );
//         console.log(response.data);

//         setData(response.data.data); 
        
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         if (err.response && err.response.status === 403) {
//           setError('Unauthorized access. Please log in.');
//         } else {
//           setError('Unable to load data. Please try again later.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [category]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setAnchorEl(null);
//     navigate("/Userlogin");
//   };

//   const handleProfile = () => {
//     setAnchorEl(null);
//     navigate("/Userprofile");
//   };

//   const handleJobClick = (job) => {
//     setSelectedJob(job);
//   };

//   // const handleApply = async () => {
//   //   try {
//   //     const authToken = localStorage.getItem("token");
//   //     if (!authToken) {
//   //       navigate("/Userlogin");
//   //       return;
//   //     }
//   //     const userResponse = await axios.get("http://localhost:5000/users/me", {
//   //       headers: { Authorization: `Bearer ${authToken}` }, // Include auth token if required
//   //     });

//   //     const user = userResponse.data;
//   //     const payload = {
//   //       job: selectedJob,
//   //       user: {
//   //         fullname: user.fullname,
//   //         email: user.email,
//   //         mobilenumber: user.mobilenumber,
//   //         skills: user.skills,
//   //       },
//   //     };

//   //     // Send POST request with job and user details
//   //     const response = await axios.post("http://localhost:5000/jobs/apply", payload, {
//   //       headers: { "Content-Type": "application/json" },
//   //     });

//   //     setApplySuccess(true);
//   //     setTimeout(() => setApplySuccess(false), 3000);
//   //   } catch (err) {
//   //     console.error("Error applying for the job:", err);
//   //   } finally {
//   //     setSelectedJob(null); // Clear selected job
//   //   }
//   // };

//   const handleCancel = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <Box>
//       {/* Navbar */}
//       <AppBar position="sticky" color="primary">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
//             RealEstatePro
//           </Typography>
//           <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ marginRight: 1 }}>
//             <ArrowCircleLeftIcon fontSize="large" />
//           </IconButton>
//           <Button
//             color="inherit"
//             onClick={() => navigate("/listed-applied")}
//             sx={{ marginRight: 2 }}
//           >
//             Listed U Applied
//           </Button>
//           <IconButton color="inherit" onClick={handleMenuOpen}>
//             <AccountCircle fontSize="large" />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//             <MenuItem onClick={handleProfile}>Profile</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Page Content */}
//       <Container sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom textAlign="center">
//           {category} Jobs
//         </Typography>
//         {loading ? (
//           <Box textAlign="center" my={4}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error" textAlign="center">
//             {error}
//           </Typography>
//         ) : data.length > 0 ? (
//           <Grid container spacing={4} justifyContent="center">
//             {data.map((item, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card
//                   onClick={() => handleJobClick(item)}
//                   sx={{
//                     cursor: "pointer",
//                     transition: "transform 0.3s, box-shadow 0.3s",
//                     "&:hover": {
//                       transform: "scale(1.05)",
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h4" gutterBottom>
//                       {item.title}
//                     </Typography>
//                     <Typography variant="h6" gutterBottom>
//                       {item.companyName}
//                     </Typography>
//                     <Typography variant="body1" color="textSecondary">
//                       {item.qualification}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {item.location}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="h6" align="center">
//             No jobs found in this category.
//           </Typography>
//         )}
//       </Container>

//       {/* Apply Dialog */}
//       {selectedJob && (
//         <Dialog open={true} onClose={handleCancel} fullWidth maxWidth="sm">
//           <DialogTitle>Apply for Job</DialogTitle>
//           <DialogContent>
//             <Typography variant="h6" gutterBottom>
//               {selectedJob.title}
//             </Typography>
//             <Typography variant="body2">
//               Company: {selectedJob.companyName}
//             </Typography>
//             <Typography variant="body2">
//               Location: {selectedJob.location}
//             </Typography>
//             <Typography variant="body2">
//               Qualification: {selectedJob.qualification}
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleApply} color="primary">
//               Apply
//             </Button>
//             <Button onClick={handleCancel} color="secondary">
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {/* Success Message */}
//       {applySuccess && (
//         <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
//           <Typography variant="body1" color="success">
//             Successfully applied for the job!
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Userlistedjobs;

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Userlistedjobs = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        
        const response = await axios.get(
          `https://my-elegant-backend-api.onrender.com/jobs/getJobsByCategory?category=${category}`,
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the request
            }
          }
        );
        console.log(response.data.data);

        setData(response.data.data); 
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && err.response.status === 403) {
          setError('Unauthorized access. Please log in.');
        } else {
          setError('Unable to load data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAnchorEl(null);
    navigate("/Userlogin");
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/Userprofile");
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/Userlogin");
        return;
      }
      
      const payload = {
        job: selectedJob,
        user: {
          // User details from localStorage or from API if needed
          fullname: "John Doe", // Replace with actual user data
          email: "john.doe@example.com", // Replace with actual user data
          mobilenumber: "1234567890", // Replace with actual user data
          skills: ["React", "Node.js"], // Example skills
        },
      };

      const response = await axios.post(
        "http://localhost:5000/jobs/apply",
        payload,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log(response);
      setApplySuccess(true);
      setTimeout(() => setApplySuccess(false), 3000); // Hide after 3 seconds
    } catch (err) {
      console.error("Error applying for the job:", err);
      setApplySuccess(false);
    } finally {
      setSelectedJob(null); // Clear selected job
    }
  };

  const handleCancel = () => {
    setSelectedJob(null);
  };

  return (
    <Box>
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

      {/* Page Content */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {category} Jobs
        </Typography>
        {loading ? (
          <Box textAlign="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : data.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {data.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  onClick={() => handleJobClick(item)}
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {item.companyName}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {item.qualification}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {item.location}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {item.salary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" textAlign="center">
            No data found for this category.
          </Typography>
        )}
      </Container>

      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={Boolean(selectedJob)} onClose={handleCancel}>
          <DialogTitle>{selectedJob.category} Job Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              <strong>Job Title:</strong> {selectedJob.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {selectedJob.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Qualification:</strong> {selectedJob.qualification}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>KeySkills:</strong> {selectedJob.keySkills}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>EmploymentType:</strong> {selectedJob.employmentType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>CompanyName:</strong> {selectedJob.companyName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>AboutCompany:</strong> {selectedJob.aboutCompany}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Location:</strong> {selectedJob.location}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Salary:</strong> {selectedJob.salary}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Experience:</strong> {selectedJob.Experience}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Position:</strong> {selectedJob.Position}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleApply}>Apply</Button>
            <Snackbar
              open={applySuccess}
              autoHideDuration={3000} // Auto-hide after 3 seconds
              onClose={() => setApplySuccess(false)}
            >
              <Alert onClose={() => setApplySuccess(false)} severity="success">
                Job applied successfully!
              </Alert>
            </Snackbar>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Success Alert */}
      {applySuccess && (
        <Snackbar
          open={applySuccess}
          autoHideDuration={3000} // Auto-hide after 3 seconds
          onClose={() => setApplySuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Change vertical to "middle" if supported for middle alignment
        >
          <Alert onClose={() => setApplySuccess(false)} severity="success">
            Job applied successfully!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Userlistedjobs;
