const Appointment = require("./model");

// @desc    Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new appointment
exports.createAppointment = async (req, res) => {
  const { title, calendarId, userId, description, date, email } = req.body;
  try {
    const newAppointment = new Appointment({
      title,
      calendarId,
      userId,
      description,
      date,
      email,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// @desc    Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// @desc    Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
