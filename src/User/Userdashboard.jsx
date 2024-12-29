import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Grid, Card, CardContent, Box, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";

const Userdashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/Userlogin");
          return;
        }
        const response = await axios.get("https://my-elegant-backend-api.onrender.com/jobs/getJobsByCategory", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data.data); // Set fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [navigate]);

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

  const handleCardClick = (categoryName) => {
    navigate(`/getJobsByCategory/${categoryName}`);
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ background: "rgb(228, 45, 64)" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "Times New Roman" }}>
            RealEstatePro
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/listed-applied")}
            sx={{ marginRight: { xs: 1, sm: 2, md: 3 } }}
          >
            Listed U Applied
          </Button>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ my: 4, paddingX: { xs: 2, sm: 4, md: 6 } }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ animation: "colorChange 3s infinite", fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
          Welcome to Your Dashboard
        </Typography>
        <style>
          {`
            @keyframes colorChange {
              0% { color: rgb(71, 221, 255); }
              25% { color: rgb(237, 96, 80); }
              50% { color: rgb(241, 145, 71); }
              75% { color: rgb(125, 124, 123); }
              100% { color: rgb(212, 55, 230); }
            }
          `}
        </style>
        <Grid container spacing={4}>
          {categories.length === 0 ? (
            <Typography variant="h6" align="center">
              Loading categories...
            </Typography>
          ) : (
            categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#bfe7ff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      backgroundColor: "#e6f7ff",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleCardClick(category._id)}
                >
                  <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: "Times New Roman" }}>
                      {category._id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Userdashboard;
