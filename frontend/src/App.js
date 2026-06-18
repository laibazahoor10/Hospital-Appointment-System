// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
// import Login from './components/Login';
// import UserDashboard from './components/UserDashboard';
// import AdminDashboard from './components/AdminDashboard';

// // Protected Route Component
// const ProtectedRoute = ({ children, adminOnly }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && user.role !== 'admin') {
//     return <Navigate to="/appointments" />;
//   }

//   return children;
// };

// // Main Layout Component
// const Layout = ({ children }) => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <Box>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Hospital Appointment System
//           </Typography>
//           {user && (
//             <>
//               <Typography sx={{ mr: 2 }}>
//                 {user.name} ({user.role})
//               </Typography>
//               <Button color="inherit" onClick={logout}>
//                 Logout
//               </Button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="lg">
//         {children}
//       </Container>
//     </Box>
//   );
// };

// function AppContent() {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route 
//             path="/login" 
//             element={user ? <Navigate to="/appointments" /> : <Login />} 
//           />
//           <Route 
//             path="/appointments" 
//             element={
//               <ProtectedRoute>
//                 <UserDashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/admin" 
//             element={
//               <ProtectedRoute adminOnly>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;


import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/appointments" />;
  }

  return children;
};

// Main Layout Component
const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hospital Appointment System
          </Typography>
          {user && (
            <>
              <Typography sx={{ mr: 2 }}>
                {user.name} ({user.role})
              </Typography>
              
              {/* Show both navigation buttons for admin */}
              {user.role === 'admin' && (
                <>
                  <Button 
                    color="inherit" 
                    onClick={() => window.location.href = '/appointments'}
                    sx={{ mr: 1 }}
                  >
                    My Appointments
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => window.location.href = '/admin'}
                    sx={{ mr: 1 }}
                  >
                    Admin Dashboard
                  </Button>
                </>
              )}
              
              {/* Show only appointments button for regular user */}
              {user.role === 'user' && (
                <Button 
                  color="inherit" 
                  onClick={() => window.location.href = '/appointments'}
                  sx={{ mr: 1 }}
                >
                  My Appointments
                </Button>
              )}
              
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
};

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/appointments" /> : <Login />} 
          />
          <Route 
            path="/appointments" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;