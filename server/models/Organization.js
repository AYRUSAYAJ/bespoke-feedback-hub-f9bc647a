const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OrganizationSchema = new mongoose.Schema({
  orgCode: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

OrganizationSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Organization', OrganizationSchema);
