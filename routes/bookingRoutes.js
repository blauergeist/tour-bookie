const express = require('express');

const bookingController = require('./../controllers/bookingController.js');
const authController = require('./../controllers/authController.js');

const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = bookingController;
const { protect, restrictTo } = authController;

const router = express.Router({ mergeParams: true });

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').get(getAllBookings).post(createBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
