import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const CompanyloginPage = () => {
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    registrationNumber: "", // Changed password to registration number
  });

  const [errors, setErrors] = useState({
    email: "",
    registrationNumber: "", // Updated error state for registration number
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate Email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value !== "") {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email ID.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    // Validate Registration Number
    if (name === "registrationNumber") {
      if (value.length < 6 && value !== "") {
        setErrors((prev) => ({
          ...prev,
          registrationNumber:
            "Registration number must be at least 6 characters.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, registrationNumber: "" }));
      }
    }

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (errors.email || errors.registrationNumber) {
      alert("Please fix the errors before logging in.");
      return;
    }

    // Perform login logic here
    alert(
      `Logged in with Email: ${loginData.email} and Registration Number: ${loginData.registrationNumber}`
    );
    console.log("Login Data:", loginData);
  };

  return (

    <>
     <AppBar position="sticky" color="primary">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <IconButton color="inherit" onClick={() => navigate("/")}>
              <HomeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ marginRight: 1 }}>
              RealEstatePro
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => navigate("/Companylogin")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/Companyregistration")}>
            SignUp
          </Button>
        </Toolbar>
      </AppBar>


    <Box
      sx={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 4,
        border: "1px solid #ddd",
        borderRadius: 3,
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, marginBottom: 2, textAlign: "center" }}
      >
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Grid container spacing={3}>
          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email ID"
              placeholder="Enter your email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          {/* Registration Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="text"
              label="Registration Number"
              placeholder="Enter your registration number"
              name="registrationNumber"
              value={loginData.registrationNumber}
              onChange={handleChange}
              error={!!errors.registrationNumber}
              helperText={errors.registrationNumber}
            />
          </Grid>
          {/* Login Button */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", marginTop: 0 }}>
            <Typography variant="body2">
              New user?{" "}
              <Button
                style={{ color: "blue" }}
                onClick={() => navigate("/Companyregistration")}
                sx={{ textTransform: "full-size-kana", padding: 0 }}
              >
                Signup
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
    </>
  );
};

export default CompanyloginPage;
