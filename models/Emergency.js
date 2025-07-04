import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema({
  type: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Emergency', emergencySchema);
