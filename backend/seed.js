const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Medicine = require('./models/Medicine');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Patient.deleteMany();
    await Medicine.deleteMany();

    // Create users
    const users = [
      { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' },
      { name: 'John Patient', email: 'patient@example.com', password: 'password123', role: 'patient' },
      { name: 'Jane Receptionist', email: 'receptionist@example.com', password: 'password123', role: 'receptionist' },
      { name: 'Bob Pharmacist', email: 'pharmacist@example.com', password: 'password123', role: 'pharmacist' },
      { name: 'Dr. Smith', email: 'doctor@example.com', password: 'password123', role: 'doctor' }
    ];

    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const user = new User({ ...userData, password: hashedPassword });
      await user.save();

      if (userData.role === 'patient') {
        const patient = new Patient({
          user: user._id,
          medicalHistory: ['Hypertension'],
          allergies: ['Penicillin'],
          emergencyContact: { name: 'Jane Doe', phone: '123-456-7890', relation: 'Spouse' },
          bloodGroup: 'O+',
          height: 175,
          weight: 70
        });
        await patient.save();
      }
    }

    // Create sample medicines
    const medicines = [
      { name: 'Paracetamol', description: 'Pain reliever', price: 5.99, stock: 100 },
      { name: 'Amoxicillin', description: 'Antibiotic', price: 12.50, stock: 50 },
      { name: 'Ibuprofen', description: 'Anti-inflammatory', price: 8.75, stock: 75 }
    ];

    for (const med of medicines) {
      const medicine = new Medicine(med);
      await medicine.save();
    }

    console.log('Sample data seeded successfully!');
    console.log('\nExample Credentials:');
    console.log('Admin: admin@example.com / password123');
    console.log('Patient: patient@example.com / password123');
    console.log('Receptionist: receptionist@example.com / password123');
    console.log('Pharmacist: pharmacist@example.com / password123');
    console.log('Doctor: doctor@example.com / password123');

    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();