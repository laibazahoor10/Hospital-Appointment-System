import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Card, CardContent, Grid
} from '@mui/material';

const UserDashboard = () => {
  const { API_URL } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: '',
    department: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      console.log('Appointments:', response.data);
      setAppointments(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setMessage('Error loading appointments: ' + (error.response?.data?.message || error.message));
    }
  }, [API_URL]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/appointments`, formData);
      setMessage('Appointment booked successfully!');
      setOpen(false);
      setFormData({
        doctorName: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
      });
      fetchAppointments();
    } catch (error) {
      setMessage('Error booking appointment: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'green';
      case 'Rejected': return 'red';
      case 'Pending': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">My Appointments</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Book New Appointment
        </Button>
      </Box>

      {message && (
        <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {appointments.length === 0 ? (
        <Alert severity="info">No appointments found. Book your first appointment!</Alert>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item xs={12} md={6} key={appointment._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Dr. {appointment.doctorName || 'N/A'}
                  </Typography>
                  <Typography color="text.secondary">
                    Department: {appointment.department || 'N/A'}
                  </Typography>
                  <Typography color="text.secondary">
                    Date: {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'Invalid Date'}
                  </Typography>
                  <Typography color="text.secondary">
                    Time: {appointment.appointmentTime || 'N/A'}
                  </Typography>
                  <Typography color="text.secondary">
                    Reason: {appointment.reason || 'N/A'}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mt: 1, 
                      fontWeight: 'bold',
                      color: getStatusColor(appointment.status)
                    }}
                  >
                    Status: {appointment.status || 'Pending'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Doctor Name"
              value={formData.doctorName}
              onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Appointment Date"
              type="date"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Appointment Time"
              type="time"
              value={formData.appointmentTime}
              onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Reason for Visit"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              margin="normal"
              multiline
              rows={3}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? 'Booking...' : 'Book Appointment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboard;