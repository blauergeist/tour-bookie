const express = require('express');
const reviewController = require('./../controllers/reviewController.js');
const authController = require('./../controllers/authController.js');

const { protect, restrictTo } = authController;
const {
  getAllReviews,
  createReview,
  updateReview,
  setTourUserIds,
  getReview,
  deleteReview,
} = reviewController;

const router = express.Router({ mergeParams: true });

router.use(protect); // Routes past this line are protected to authenticated users

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('admin', 'user'), updateReview)
  .delete(restrictTo('admin', 'user'), deleteReview);
// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

module.exports = router;
