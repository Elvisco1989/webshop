<template>
  <div>
    <h2>Create Customer</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Name:</label>
        <input v-model="customer.name" type="text" required />
      </div>
      <div>
        <label>Address:</label>
        <input v-model="customer.address" type="text" required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input v-model="customer.phoneNumber" type="tel" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="customer.email" type="email" required />
      </div>
      <div>
        <label>Delivery Dates (comma separated ISO dates):</label>
        <input v-model="deliveryDatesInput" type="text" placeholder="e.g. 2025-05-30T14:43:21.987Z" />
      </div>
      <div>
        <label>Segment:</label>
        <input v-model="customer.segment" type="text" />
      </div>
      <button type="submit">Create Customer</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "CustomerCreate",
  data() {
    return {
      customer: {
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
        deliveryDates: [],
        segment: "",
      },
      deliveryDatesInput: "",
      message: "",
    };
  },
  methods: {
    async submitForm() {
      // Parse delivery dates input into array
      this.customer.deliveryDates = this.deliveryDatesInput
        .split(",")
        .map(date => date.trim())
        .filter(date => date.length > 0);

      try {
        const response = await fetch("https://localhost:7155/api/Customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
          },
          body: JSON.stringify(this.customer),
        });

        if (response.ok) {
          this.message = "Customer created successfully!";
          // Clear form
          this.customer = {
            name: "",
            address: "",
            phoneNumber: "",
            email: "",
            deliveryDates: [],
            segment: "",
          };
          this.deliveryDatesInput = "";
        } else {
          const errorText = await response.text();
          this.message = `Error: ${errorText}`;
        }
      } catch (error) {
        this.message = `Request failed: ${error.message}`;
      }
    },
  },
};
</script>

<style scoped>
form > div {
  margin-bottom: 1em;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.3em;
}

input {
  width: 300px;
  padding: 0.4em;
  font-size: 1em;
}

button {
  padding: 0.5em 1em;
  font-size: 1em;
}

p {
  margin-top: 1em;
  font-weight: bold;
  color: green;
}
</style>
