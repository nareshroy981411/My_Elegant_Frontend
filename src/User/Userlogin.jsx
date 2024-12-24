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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const UserLoginPage = () => {

    const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate Email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value !== "") {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email ID." }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    // Validate Password
    if (name === "password") {
      if (value.length < 6 && value !== "") {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      alert("Please fix the errors before logging in.");
      return;
    }

    // Perform login logic here
    alert(`Logged in with Email: ${loginData.email}`);
    console.log("Login Data:", loginData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
          <Button color="inherit" onClick={() => navigate("/Userlogin")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/UserRegistration")}>
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
          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                  style={{color:"blue"}}
                  onClick={() => navigate("/UserRegistration")}
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

export default UserLoginPage;