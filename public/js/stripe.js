import axios from 'axios';
import { showAlert } from './alerts';
// import stripe from 'stripe';

const stripe = Stripe(
  'pk_test_51NUSxLBqpdfLIKz6To77MfcjmRvOC0ggFvQwIGbRRFoIuL57Guz8zjTNizxWwiBGcRCmMWMooqlFFxMPvnYUeBhU00fckHpZ2M'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
