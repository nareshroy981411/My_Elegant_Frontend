import React from 'react';
import { TextField, Box, Stack, Button, Container, Typography, Paper } from '@mui/material';

function Addtojob() {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add a Job
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="job-title" label="Job Title" variant="filled" fullWidth />
          <TextField
            id="job-description"
            label="Job Description"
            variant="filled"
            fullWidth
            multiline
            rows={4}
          />
          <TextField id="qualifications" label="Qualifications" variant="filled" fullWidth />
          <TextField id="key-skills" label="Key Skills" variant="filled" fullWidth />
          <TextField id="employment-type" label="Employment Type" variant="filled" fullWidth />
        </Box>

        <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" size="large">
            Add Job
          </Button>
          <Button variant="outlined" color="secondary" size="large">
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Addtojob;
