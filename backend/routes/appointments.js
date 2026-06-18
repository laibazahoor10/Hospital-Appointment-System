// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/Appointment');
// const { protect, adminOnly } = require('../middleware/auth');

// // @route   GET /api/appointments
// // @desc    Get all appointments (admin gets all, user gets own)
// // @access  Private
// router.get('/', protect, async (req, res) => {
//   try {
//     let appointments;
    
//     if (req.user.role === 'admin') {
//       appointments = await Appointment.find().populate('userId', 'name email').sort({ createdAt: -1 });
//     } else {
//       appointments = await Appointment.find({ userId: req.user._id }).sort({ createdAt: -1 });
//     }

//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   POST /api/appointments
// // @desc    Create new appointment
// // @access  Private
// router.post('/', protect, async (req, res) => {
//   try {
//     const { doctorName, department, appointmentDate, appointmentTime, reason } = req.body;

//     const appointment = await Appointment.create({
//       userId: req.user._id,
//       patientName: req.user.name,
//       doctorName,
//       department,
//       appointmentDate,
//       appointmentTime,
//       reason
//     });

//     res.status(201).json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   PUT /api/appointments/:id/status
// // @desc    Update appointment status
// // @access  Private (Admin only)
// router.put('/:id/status', protect, adminOnly, async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   PUT /api/appointments/:id/status
// // @desc    Update appointment status
// // @access  Private (Admin only)
// router.put('/:id/status', protect, adminOnly, async (req, res) => {
//   try {
//     const { status } = req.body;

//     // ✅ Allowed statuses only
//     const allowedStatus = ['Pending', 'Approved', 'Rejected'];

//     if (!allowedStatus.includes(status)) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // @route   DELETE /api/appointments/:id
// // @desc    Delete appointment
// // @access  Private
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id);

//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     // Check ownership or admin
//     if (appointment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await appointment.deleteOne();
//     res.json({ message: 'Appointment deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/appointments
// @desc    Get all appointments (admin gets all, user gets own)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let appointments;
    
    if (req.user.role === 'admin') {
      appointments = await Appointment.find().populate('userId', 'name email').sort({ createdAt: -1 });
    } else {
      appointments = await Appointment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { doctorName, department, appointmentDate, appointmentTime, reason } = req.body;

    const appointment = await Appointment.create({
      userId: req.user._id,
      patientName: req.user.name,
      doctorName,
      department,
      appointmentDate,
      appointmentTime,
      reason
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status
// @access  Private (Admin only)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ Validate status - only allow these values
    const allowedStatuses = ['Pending', 'Approved', 'Rejected', 'Completed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}` 
      });
    }

    // Find and update the appointment
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    console.log(`Status updated: Appointment ${req.params.id} -> ${status}`);
    res.json(appointment);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check ownership or admin
    if (appointment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;