<template>
  <div class="payment-page">
    <h1>Betalingsside</h1>

    <div v-if="loadingClientSecret">Indlæser betalingsinformation...</div>

    <form v-show="!loadingClientSecret" @submit.prevent="handleSubmit">
      <div id="card-element" ref="cardElementContainer"></div>

      <button :disabled="loading || !stripe || !clientSecret">
        {{ loading ? 'Behandler betaling...' : 'Betal nu' }}
      </button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
  name: 'Payment',
  data() {
    return {
      stripe: null,
      cardElement: null,
      clientSecret: null,
      loading: false,
      loadingClientSecret: true,
      errorMessage: '',
      successMessage: '',
      orderId: null,
    };
  },
  async mounted() {
    this.orderId = this.$route.params.orderId;

    if (!this.orderId) {
      this.errorMessage = 'Ordre-ID ikke fundet.';
      this.loadingClientSecret = false;
      return;
    }

    try {
      this.stripe = await loadStripe('pk_test_51PY4obRrsSJp9FXI7hpND6aqST9XWp7HvvOLSDmU5n4UexppFGWie4LikOLCOT0evb2NxStLBhnLKWgTeEhQDYMM00p7K7v3Bs');

      // ✅ LOCAL only
      const url = `https://localhost:7155/api/Payments/${this.orderId}/create-payment-intent`;

      const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Kunne ikke oprette betalingsintent.');
      const data = await res.json();
      this.clientSecret = data.clientSecret;

      this.$nextTick(() => {
        const elements = this.stripe.elements();
        this.cardElement = elements.create('card');
        const container = this.$refs.cardElementContainer;
        if (container) {
          this.cardElement.mount(container);
        } else {
          this.errorMessage = 'Fejl: kort-element container ikke fundet.';
        }
      });
    } catch (err) {
      this.errorMessage = err.message || 'Fejl under initialisering.';
    } finally {
      this.loadingClientSecret = false;
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              name: 'Test Kunde',
            },
          },
        });

        if (error) {
          this.errorMessage = error.message;
        } else if (paymentIntent.status === 'succeeded') {
          this.successMessage = 'Betaling gennemført!';
        } else {
          this.errorMessage = 'Betaling mislykkedes.';
        }
      } catch (err) {
        this.errorMessage = 'Fejl under betalingen.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.payment-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}
button {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #6772e5;
  color: white;
  border: none;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-top: 1rem;
}
.success {
  color: green;
  margin-top: 1rem;
}
</style>
