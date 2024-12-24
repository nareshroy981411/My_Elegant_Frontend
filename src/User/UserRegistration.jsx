import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home"; // Import the HomeIcon
import { useNavigate } from "react-router-dom";

const UserRegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
    workStatus: "experienced",
    resume: null,
    skills: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    mobileNumber: "",
    resume: "",
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

    // Validate Mobile Number
    if (name === "mobileNumber") {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value) && value !== "") {
        setErrors((prev) => ({
          ...prev,
          mobileNumber: "Enter a valid 10-digit mobile number.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNumber: "" }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.email ||
      errors.password ||
      errors.mobileNumber ||
      errors.resume
    ) {
      alert("Please correct the errors before submitting.");
      return;
    }
    alert("Registration successful!");
    console.log("Form Data:", formData);
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
          maxWidth: 500,
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
          MyElegant SignUp
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Full name"
                placeholder="What is your name?"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email ID"
                placeholder="Tell us your Email ID"
                name="email"
                value={formData.email}
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
                placeholder="(Minimum 6 characters)"
                name="password"
                value={formData.password}
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
            {/* Mobile Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="tel"
                label="Mobile number"
                placeholder="Enter your mobile number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />
            </Grid>

            {/* Skills */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Skills"
                placeholder="Enter your skills (e.g., React, Python, SQL)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </Grid>
            {/* Resume Upload */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                color={formData.resume ? "success" : "primary"}
              >
                {formData.resume ? "Resume Uploaded" : "Upload Resume"}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                SignUp
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 0 }}>
              <Typography variant="body2">
                Already a user?{" "}
                <Button
                  style={{color:"blue"}}
                  onClick={() => navigate("/Userlogin")}
                  sx={{ textTransform: "full-size-kana", padding: 0 }}
                >
                  Login
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UserRegistrationForm;
