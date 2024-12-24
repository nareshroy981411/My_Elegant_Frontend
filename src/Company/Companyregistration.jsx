import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const CompanyRegistrationPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    companyStartDate: "",
    registrationNumber: "",
    location: "",
    companyWebsite: "",
    aboutCompany: "",
  });

  const [errors, setErrors] = useState({
    companyWebsite: "",
    registrationNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // URL validation for Company Website
    if (name === "companyWebsite") {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      if (!urlRegex.test(value) && value !== "") {
        setErrors((prev) => ({
          ...prev,
          companyWebsite:
            "Please enter a valid URL (e.g., https://example.com)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, companyWebsite: "" }));
      }
    }

    // Validation for Registration Number
    if (name === "registrationNumber") {
      const alphaNumericRegex = /^[a-zA-Z0-9]*$/;
      if (!alphaNumericRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          registrationNumber:
            "Registration Number must only contain letters and numbers.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, registrationNumber: "" }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.companyWebsite || errors.registrationNumber) {
      alert("Please correct the errors before submitting.");
      return;
    }

    console.log("Submitted Data:", formData);
    alert("Registration Successful!");
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
          <Button
            color="inherit"
            onClick={() => navigate("/Companyregistration")}
          >
            SignUp
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          maxWidth: 600,
          margin: "50px auto",
          padding: 4,
          boxShadow: theme.shadows[4],
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: theme.palette.primary.main, marginBottom: 3 }}
        >
          Company Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="date"
                label="Company Established Date"
                name="companyStartDate"
                value={formData.companyStartDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                error={!!errors.registrationNumber}
                helperText={errors.registrationNumber}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Company Website"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                error={!!errors.companyWebsite}
                helperText={errors.companyWebsite}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="About Company"
                name="aboutCompany"
                value={formData.aboutCompany}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  padding: "10px 30px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 0 }}>
              <Typography variant="body2">
                Already Regis?{" "}
                <Button
                  style={{ color: "blue" }}
                  onClick={() => navigate("/Companylogin")}
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

export default CompanyRegistrationPage;
