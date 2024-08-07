'use strict';
const mongoose = require('mongoose');

const AdminPlanModel = mongoose.model('admin-plan', {
  orderId:{
    type: String,
    required: true,
    trim: true
  },
  paymentId: {
    type: String,
    required: true,
    trim: true
  },
  adminId: {
    type: String,
    required: true,
    trim: true
  },
  activePlan:{
    type:String,
    required:true,
    trim:true
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  studentLimit:{
    type: Number,
    required: true,
    trim: true
  },
  paymentStatus: {
    type: Boolean,
    trim: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

module.exports = AdminPlanModel;