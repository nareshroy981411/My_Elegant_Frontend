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
  Box,
  CardMedia,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const Userlistedjobs = () => {
  const { category } = useParams();
  console.log(category);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cardsData?category=${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load data. Please try again later.");
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

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RealEstatePro
          </Typography>
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
      <Container sx={{ my: 4 }} style={{marginTop: "200px"}}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {category}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={4} justifyContent="center">
          {data.length > 0 ? (
            data.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image || "default-image-url.jpg"}
                    alt={item.category || "Category"}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" textAlign="center">
              No data found for this category.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Userlistedjobs;
