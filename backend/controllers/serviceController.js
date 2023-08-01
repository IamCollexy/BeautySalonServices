const Service = require('../models/Services');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
require('dotenv').config();
// @desc Get all services
// @route GET /services
// @access Private
const getAllServices = asyncHandler(async (req, res) => {
  // Get all services from MongoDB
  const services = await Service.find().lean();

  // If no services
  if (!services?.length) {
    return res.status(400).json({ message: 'No services found' });
  }

  // Add username to each service before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const servicesWithUser = await Promise.all(
    services.map(async (service) => {
      const user = await User.findById(service.user).lean().exec();
      return { ...service, username: user.username };
    })
  );

  res.json(servicesWithUser);
});

// @desc Create new service
// @route POST /services
// @access Private
const createNewService = asyncHandler(async (req, res) => {
  const { user, desiredService, message, completed } = req.body;

  // Confirm data
  if (
    !user ||
    !desiredService ||
    !message ||
    typeof completed !== 'boolean'
  ) {
    return res
      .status(400)
      .json({ message: 'All fields are required' });
  }

  // Check for duplicate desiredService
  const duplicate = await Service.findOne({ desiredService })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: 'Duplicate service desiredService' });
  }

  // Find the user based on the provided user (_id)
  const foundUser = await User.findOne({ username: user })
    .lean()
    .exec();

  if (!foundUser) {
    return res.status(400).json({ message: 'User not found' });
  }

  console.log(typeof foundUser._id);

  // console.log(user, desiredService, message);
  // Create and store the new service with the correct user reference
  const service = await Service.create({
    user: foundUser._id,
    desiredService,
    message,
    completed,
  });

  if (service) {
    // Created
    return res
      .status(201)
      .json({ message: 'New service created', service });
  } else {
    return res
      .status(400)
      .json({ message: 'Invalid service data received' });
  }
});

// @desc Update a service
// @route PATCH /services
// @access Private
const updateService = asyncHandler(async (req, res) => {
  const { id, user, desiredService, message, completed } = req.body;

  // Confirm data
  if (
    !id ||
    !user ||
    !desiredService ||
    !message ||
    typeof completed !== 'boolean'
  ) {
    return res
      .status(400)
      .json({ message: 'All fields are required' });
  }

  // Confirm service exists to update
  const service = await Service.findById(id).exec();

  if (!service) {
    return res.status(400).json({ message: 'Service not found' });
  }

  // Check for duplicate desiredService
  const duplicate = await Service.findOne({ desiredService })
    .lean()
    .exec();

  // Allow renaming of the original service
  if (duplicate && duplicate?._id.toString() !== id) {
    return res
      .status(409)
      .json({ message: 'Duplicate service desiredService' });
  }

  service.user = user;
  service.desiredService = desiredService;
  service.message = message;
  service.completed = completed;

  const updatedService = await service.save();

  res.json(
    `Service attached to userId ${updatedService.user} has been updated`
  );
});

// @desc Delete a service
// @route DELETE /services
// @access Private
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Service ID required' });
  }

  // Confirm service exists to delete
  const service = await Service.findById(id).exec();

  if (!service) {
    return res.status(400).json({ message: 'Service not found' });
  }

  const result = await service.deleteOne();
  console.log(result);
  const reply = `Service attached to userId ${result.user} has been deleted`;

  res.json(reply);
});

module.exports = {
  getAllServices,
  createNewService,
  updateService,
  deleteService,
};
