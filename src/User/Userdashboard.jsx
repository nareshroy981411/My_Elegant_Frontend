
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
  Button,
  Box,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Userdashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          navigate("/Userlogin");
          return;
        }

        const response = await axios.get("https://my-elegant-backend-api.onrender.com/jobs/getJobsByCategory", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.data);
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
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RealEstatePro
          </Typography>
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
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Welcome to Your Dashboard
        </Typography>

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
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleCardClick(category._id)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
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
    </Box>
  );
};

export default Userdashboard;
