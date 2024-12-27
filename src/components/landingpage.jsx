import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useNavigate} from 'react-router-dom';



const slides = [
  {
    image: "https://images.pexels.com/photos/462331/pexels-photo-462331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    text: "Welcome to RealEstatePro - Your Trusted Property Partner"
  },
  {
    image: "https://www.sukhii.group/blog/wp-content/uploads/2023/04/Sukhii-1568x882.jpg",
    text: "Explore Properties Tailored to Your Dreams"
  },
  {
    image: "https://images.pexels.com/photos/681331/pexels-photo-681331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    text: "Connecting Buyers, Sellers, and Real Estate Professionals"
  }
];

const Landingpage = () => {

    const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RealEstatePro
          </Typography>
          <Button color="inherit" onClick={()=> navigate ('/Companylogin')}>Become a Partner</Button>
          <Button color="inherit" onClick={()=> navigate ('/Userlogin')}>Apply for Job</Button>
        </Toolbar>
      </AppBar>

      <br /><br />

      {/* Slider */}
      <Container style={{ maxWidth:"97%", padding: 0 ,}}>
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "60vh",
                //   objectFit: "cover",
                }}
              />
              <Typography
                variant="h5"
                component="div"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "10px 20px",
                  textAlign: "center",
                }}
              >
                {slide.text}
              </Typography>
            </div>
          ))}
        </Slider>
      </Container>

      {/* About Section */}
      <Container sx={{ my: 6, px: { xs: 2, sm: 3, md: 6 } }} style={{ maxWidth:"100%"}}>
        <Typography variant="h4" gutterBottom textAlign="center">
          About Us
        </Typography>
        <Typography variant="body1" textAlign="justify" gutterBottom >
          RealEstatePro is a leading platform connecting buyers, sellers, and real estate professionals. 
          With a mission to revolutionize the property market, we provide innovative tools and resources 
          to make real estate transactions seamless and efficient.
        </Typography>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 3, mt: 4 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">RealEstatePro</Typography>
              <Typography variant="body2">
                123 Real Estate Lane, Dream City, USA
                <br />
                Email: contact@realestatepro.com
                <br />
                Phone: +1 (234) 567-890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              <Typography variant="h6">Follow Us</Typography>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Landingpage;
