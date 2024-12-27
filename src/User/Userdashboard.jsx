import React, { useEffect } from "react";
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
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Sample cards
const cards  = [
  {
    category: "Manager",
    description: "Manage your team effectively.",
    image: "https://www.datocms-assets.com/64859/1705727186-manager-s-role-in-organizational-success-1705727186086.png?q=70&auto=format&w=1280", 
  },
  {
    category: "Sales",
    description: "Track your sales and performance.",
    image: "https://www.salesforcesearch.com/storage/2017/05/The_Complete_List_of_Different_Sales_Jobs.jpg", 
  },
  
  {
    category: "Sales Team",
    description: "Oversee and coordinate sales activities.",
    image: "https://sloovi-bloges.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/07/10083014/1-sales-team-structure.webp", 
  },
  {
    category: "Marketing",
    description: "Manage marketing strategies and campaigns.",
    image: "https://mmclearning.com/wp-content/uploads/2023/05/marketing-manager-hard.png", 
  },
  {
    category: "HR",
    description: "Manage human resources operations.",
    image: "https://www.ismartrecruit.com/upload/blog/main_image/HR_Manager_Job_Description.webp", 
  },
  {
    category: "Operations",
    description: "Handle operational workflows and processes.",
    image: "https://emeritus.org/in/wp-content/uploads/sites/3/2022/08/project-management.jpg.optimal.jpg", 
  },
  {
    category: "Digital",
    description: "Handle digital marketing efforts.",
    image: "https://www.sifytechnologies.com/wp-content/uploads/2024/09/DT-2.webp",
  },
];

const Userdashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      navigate("/Userlogin"); 
    }
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

  const handleCardClick = (category) => {
    navigate(`/card/${category}`);
  };

  return (
    <>
      <Box 
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1, 
      backgroundImage: "url('https://img.freepik.com/premium-photo/contemporary-background-color-design-modern-professional-background-design-layout_1020697-419596.jpg')", // Replace with your background image URL
      backgroundSize: "cover", 
      backgroundPosition: "center", 
    }}>
        {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RealEstatePro
          </Typography>

          {/* User Icon */}
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

      {/* Main Content */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Welcome to Your Dashboard
        </Typography>

        {/* Cards Section */}
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleCardClick(card.category)} // Navigate to the listed jobs page with category
                  >
                {/* Added CardMedia for images */}
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.category}
                  sx={{
                    objectFit: "cover", // Ensures the image covers the area of the CardMedia container
                    height: "200px", // Optional: Adjust the height of the image
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{ backgroundColor: "primary.main", color: "white", py: 3, mt: 4 }}
        style={{  width: "100%" }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Our Company</Typography>
              <Typography variant="body2">
                123 Business Street, Tech City, USA
                <br />
                Email: info@ourcompany.com
                <br />
                Phone: +1 (234) 567-890
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: { xs: "center", sm: "right" } }}
            >
              <Typography variant="h6">Follow Us</Typography>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
      </Box>
    </>
  );
};

export default Userdashboard;
