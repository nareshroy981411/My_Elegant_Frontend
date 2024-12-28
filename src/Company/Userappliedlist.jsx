import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  IconButton ,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
  YouTube,
  LinkedIn,
} from "@mui/icons-material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const AppliedUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const navigate = useNavigate(); // Hook for navigation

   useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token)
    if (!token) {
      navigate("/Companylogin");
      return; 
    }
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://my-elegant-backend-api.onrender.com/application/getApplicationByCompany",
          {
            headers: { Authorization:`Bearer ${token}` },
          }
        );
        console.log(response.data.data)
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, [navigate]); 
  

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
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
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: "url('/15442020_5590457.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, rgb(101,146,166), rgb(101,146,166))",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <HomeIcon 
      fontSize="large" 
      sx={{ cursor: "pointer" }}
      />
      <Typography variant="h6" component="div">
      RealEstatePro
      </Typography>
    </Box>
    {/* {Avthar} */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton 
            onClick={()=>navigate(-1)} 
            color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                cursor: "pointer",
              }}
              alt="User Avatar"
              onClick={handleAvatarClick}
            >
            </Avatar>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: isMobile ? 2 : 4,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ mb: 4, fontWeight: "bold", color: "" }}
        >
          Users Applied for the Job
        </Typography>

        <Grid container spacing={3}>
          {users.length > 0 ? (
            users.map((user) => (
              // console.log(user.job.title)
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #e3f2fd,rgba(178, 222, 245, 0.91))",
                    borderRadius: "16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "#0d47a1" }}
                    >
                      {user.applicant.fullname}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1.5 }}>
                      <strong>Email:</strong> {user.applicant.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1.5 }}>
                      <strong>Phone:</strong> {user.applicant.mobilenumber}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontStyle: "italic", color: "#1a237e" }}
                    >
                      <strong>Job Title:</strong> {user.job.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center", marginTop: 4 }}
            >
              No users have applied yet.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          mt: "auto",
          background: "linear-gradient(135deg, rgb(101,146,166), rgb(101,146,166))",
          color: "#fff",
        }}
      >
        <Grid container spacing={4} sx={{ px: isMobile ? 2 : 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 1, fontWeight: "bold" }}>
              Real Estate Inc.
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Address:</strong> 123 Main Street, Cityville, USA
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@realestate.com" style={{ color: "#BBDEFB" }}>
                info@realestate.com
              </a>
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </Typography>
            <Typography variant="body2">
          <strong>Website:</strong>{" "}
          <a href="https://realestate.com" style={{ color: "#1DA1F2" }}>
            www.realestate.com
          </a>
        </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 1, fontWeight: "bold" }}>
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
                {[
            { icon: <Facebook />, link: "https://facebook.com", color: "#1877F2" },
            { icon: <Twitter />, link: "https://twitter.com", color: "#1DA1F2" },
            { icon: <Pinterest />, link: "https://pinterest.com", color: "#E60023" },
            {
              icon: <Instagram />,
              link: "https://instagram.com",
              color: "linear-gradient(45deg, #FF0099, #FF9933)",
            },
            { icon: <YouTube />, link: "https://youtube.com", color: "#FF0000" },
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
                  width: 35,
                  height: 35,
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
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          © {new Date().getFullYear()} Real Estate Inc. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppliedUser;