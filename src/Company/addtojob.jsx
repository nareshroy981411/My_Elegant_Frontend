import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addtojob = ({ onAddJob }) => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    category: "",
    jobTitle: "",
    qualification: "",
    keySkills: "",
    employmentType: "",
    companyName: "",
    aboutCompany: "",
    location: "",
    salary: "",
    Experience: "",
    Position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate numeric-only fields
    if (["salary", "Position"].includes(name)) {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
    }

    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    // Check if all fields are filled
    if (
      !jobDetails.category ||
      !jobDetails.jobTitle ||
      !jobDetails.qualification ||
      !jobDetails.keySkills ||
      !jobDetails.employmentType ||
      !jobDetails.companyName ||
      !jobDetails.aboutCompany ||
      !jobDetails.location ||
      !jobDetails.salary ||
      !jobDetails.Experience ||
      !jobDetails.Position
    ) {
      alert("Please enter all details before adding the job.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/addjob", jobDetails);

      if (response.status === 201 || response.status === 200) {
        alert("Job added successfully!");
        onAddJob(response.data); 
        navigate("/CompanyDashboard"); 
      } else {
        alert("Failed to add the job. Please try again.");
      }
    } catch (error) {
      console.error("Error adding the job:", error);
      alert("An error occurred while adding the job.");
    }
  };

  const handleCancel = () => {
    navigate("/CompanyDashboard"); 
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          mt: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Add New Job
        </Typography>

        {[
          { label: "Category", name: "category" },
          { label: "Job Title", name: "jobTitle" },
          { label: "Qualification", name: "qualification" },
          { label: "Key Skills", name: "keySkills" },
          { label: "Employment Type", name: "employmentType" },
          { label: "Company Name", name: "companyName" },
          { label: "Experience", name: "Experience" },
          { label: "Position", name: "Position" },
          { label: "Salary", name: "salary" },
          { label: "About Company", name: "aboutCompany" },
          { label: "Location", name: "location" },
        ].map(({ label, name }) => (
          <TextField
            key={name}
            variant="filled"
            label={label}
            name={name}
            value={jobDetails[name]}
            onChange={handleChange}
            fullWidth
            multiline={name !== "salary" && name !== "Position"}
            sx={{ mb: 2 }}
            type={["salary", "Position"].includes(name) ? "number" : "text"}
          />
        ))}

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}
        >
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Addtojob;