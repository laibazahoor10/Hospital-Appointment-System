// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import {
//   Container, Typography, Button, Box, Alert, Dialog, DialogTitle,
//   DialogContent, DialogActions, TextField, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, Paper
// } from '@mui/material';

// const AdminDashboard = () => {
//   const { API_URL } = useContext(AuthContext);
//   const [appointments, setAppointments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [appointmentsRes, usersRes] = await Promise.all([
//         axios.get(`${API_URL}/appointments`),
//         axios.get(`${API_URL}/users`)
//       ]);
//       setAppointments(appointmentsRes.data);
//       setUsers(usersRes.data);
//     } catch (error) {
//       setMessage('Error loading data');
//     }
//   };

//   const handleStatusChange = async (appointmentId, newStatus) => {
//     try {
//       await axios.put(`${API_URL}/appointments/${appointmentId}/status`, { status: newStatus });
//       setMessage('Status updated successfully!');
//       fetchData();
//     } catch (error) {
//       setMessage('Error updating status');
//     }
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/users`, formData);
//       setMessage('User created successfully!');
//       setOpen(false);
//       setFormData({ name: '', email: '', password: '' });
//       fetchData();
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Error creating user');
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h5" sx={{ mb: 2 }}>All Appointments</Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Patient</TableCell>
//                 <TableCell>Doctor</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Time</TableCell>
//                 <TableCell>Reason</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {appointments.map((appointment) => (
//                 <TableRow key={appointment._id}>
//                   <TableCell>{appointment.patientName}</TableCell>
//                   <TableCell>Dr. {appointment.doctorName}</TableCell>
//                   <TableCell>{appointment.department}</TableCell>
//                   <TableCell>{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
//                   <TableCell>{appointment.appointmentTime}</TableCell>
//                   <TableCell>{appointment.reason}</TableCell>
//                   <TableCell>{appointment.status}</TableCell>
//                   <TableCell>
//                     <Button 
//                       size="small" 
//                       onClick={() => handleStatusChange(appointment._id, 'Approved')}
//                       disabled={appointment.status === 'Approved'}
//                       sx={{ mr: 1 }}
//                     >
//                       Approve
//                     </Button>
//                     <Button 
//                       size="small" 
//                       color="error"
//                       onClick={() => handleStatusChange(appointment._id, 'Rejected')}
//                       disabled={appointment.status === 'Rejected'}
//                     >
//                       Reject
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       <Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5">Users</Typography>
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add New User
//           </Button>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Role</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user._id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <Box component="form" onSubmit={handleCreateUser} sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               label="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               margin="normal"
//               required
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleCreateUser} variant="contained">
//             Create User
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';

const AdminDashboard = () => {
  const { API_URL } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const [appointmentsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/appointments`),
        axios.get(`${API_URL}/users`)
      ]);
      setAppointments(appointmentsRes.data);
      setUsers(usersRes.data);
      setMessage('');
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading data: ' + (error.response?.data?.message || error.message));
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`${API_URL}/appointments/${appointmentId}/status`, { 
        status: newStatus 
      });
      setMessage(`Appointment ${newStatus.toLowerCase()} successfully!`);
      fetchData(); // Refresh the appointments list
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Error updating status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users`, formData);
      setMessage('User created successfully!');
      setOpen(false);
      setFormData({ name: '', email: '', password: '' });
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating user');
    }
  };

  const getStatusChip = (status) => {
    const statusColors = {
      'Pending': 'warning',
      'Approved': 'success',
      'Rejected': 'error',
      'Completed': 'info'
    };
    
    return (
      <Chip 
        label={status} 
        color={statusColors[status] || 'default'} 
        size="small"
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {message && (
        <Alert 
          severity={message.includes('Error') ? 'error' : 'success'} 
          sx={{ mb: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      {/* APPOINTMENTS SECTION */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          All Appointments ({appointments.length})
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Patient</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Reason</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => (
                  <TableRow key={appointment._id} hover>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>Dr. {appointment.doctorName}</TableCell>
                    <TableCell>{appointment.department}</TableCell>
                    <TableCell>
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{appointment.appointmentTime}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>{getStatusChip(appointment.status)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          size="small" 
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusChange(appointment._id, 'Approved')}
                          disabled={appointment.status === 'Approved'}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained"
                          color="error"
                          onClick={() => handleStatusChange(appointment._id, 'Rejected')}
                          disabled={appointment.status === 'Rejected'}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* USERS SECTION */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Users ({users.length})</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add New User
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* ADD USER DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateUser} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              margin="normal"
              required
              helperText="Minimum 6 characters"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;