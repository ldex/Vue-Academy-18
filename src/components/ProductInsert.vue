<template>
  <div>
    <form @submit.prevent="onSubmit" novalidate>
      <h2>Add product</h2>

      <div
        class="form-group"
        :class="{ 'form-group--error': v$.$error && v$.product.name.$error }"
      >
        <label for="productName">Name:</label>
        <input
          type="text"
          v-model.trim="v$.product.name.$model"
          class="form-control"
          id="productName"
          maxlength="50"
        />
        <p v-if="v$.$error" class="errorMessage">
          <span v-if="v$.product.name.required.$invalid"
            >Name is required.</span
          >
          <span v-if="v$.product.name.minLength.$invalid"
            >Name must have at least
            {{ v$.product.name.minLength.$params.min }} characters!</span
          >
          <span v-if="v$.product.name.maxlength.$invalid"
            >Name must have less than
            {{ v$.product.name.maxlength.$params.max }} characters!</span
          >
        </p>
      </div>

      <div
        class="form-group"
        :class="{
          'form-group--error': v$.$error && v$.product.description.$error,
        }"
      >
        <label for="productDesc">Description:</label>
        <textarea
          v-model.trim="v$.product.description.$model"
          class="form-control"
          id="productDesc"
        />
        <p v-if="v$.$error" class="errorMessage">
          <span v-if="v$.product.description.minLength.$invalid"
            >Description must have at least
            {{ v$.product.description.minLength.$params.min }} characters!</span
          >
          <span v-if="v$.product.description.maxlength.$invalid"
            >Description must have less than
            {{ v$.product.description.maxlength.$params.max }} characters!</span
          >
        </p>
      </div>

      <div
        class="form-group"
        :class="{ 'form-group--error': v$.$error && v$.product.price.$error }"
      >
        <label for="productPrice">Price:</label>
        <input
          type="number"
          step="0.5"
          v-model.trim="v$.product.price.$model"
          class="form-control"
          id="productPrice"
        />
        <p v-if="v$.$error" class="errorMessage">
          <span v-if="v$.product.price.required.$invalid"
            >Price is required.</span
          >
          <span v-if="v$.product.price.between.$invalid"
            >Price must be between
            {{ v$.product.price.between.$params.min }} and
            {{ v$.product.price.between.$params.max }}</span
          >
        </p>
      </div>

      <div
        class="form-group"
        :class="{
          'form-group--error': v$.$error && v$.product.imageUrl.$error,
        }"
      >
        <label for="imageUrl">Image url:</label>
        <input
          type="text"
          v-model="product.imageUrl"
          class="form-control"
          id="imageUrl"
          placeholder="http://"
        />
        <p v-if="v$.$error" class="errorMessage">
          <span v-if="v$.product.imageUrl.isValidImageUrl.$invalid"
            >Invalid image url.</span
          >
        </p>
      </div>

      <div class="form-group">
        <label for="discontinued">Discontinued?</label>
        <input
          type="checkbox"
          v-model="product.discontinued"
          class="form-control"
          id="discontinued"
        />
      </div>

      <div class="form-group">
        <label for="fixedPrice">Fixed price?</label>
        <input
          type="checkbox"
          v-model="product.fixedPrice"
          class="form-control"
          id="fixedPrice"
        />
      </div>

      <div style="margin: 10px">
        <button type="submit">Save product</button>
      </div>

      <img :src="product.imageUrl" width="200" />
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, between } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const validUrlRegex =
  /^(https?:\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$/g;

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        discontinued: false,
        fixedPrice: false,
      },
    };
  },
  validations: {
    product: {
      name: {
        required,
        minLength: minLength(5),
        maxlength: maxLength(50),
      },
      description: {
        minLength: minLength(5),
        maxlength: maxLength(200),
      },
      price: {
        required,
        between: between(0, 1000000),
      },
      imageUrl: {
        isValidImageUrl(img) {
          return img.length == 0 || validUrlRegex.test(img);
        },
      },
    },
  },
  methods: {
    onSubmit() {
      this.v$.$touch();

      if (!this.v$.product.$error) {
        let newProduct = {
          name: this.product.name,
          price: this.product.price,
          description: this.product.description || "",
          imageUrl: this.product.imageUrl,
          discontinued: this.product.discontinued,
          fixedPrice: this.product.fixedPrice,
        };
        console.log(newProduct);
        this.$store
          .dispatch("addProduct", newProduct)
          .then(() => {
            this.$router.push({ name: "products" });
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.errorMessage {
  color: red;
}
input:active,
input:focus,
input:hover,
textarea:active,
textarea:focus,
textarea:hover {
  background-color: lightyellow;
  border-color: yellow;
}

label {
  clear: both;
  float: left;
  width: 120px;
}

.form-group--error {
  animation-name: shakeError;
  animation-fill-mode: forward;
  animation-duration: 0.6s;
  animation-timing-function: ease-in-out;
}
.form-group--error input,
.form-group--error textarea {
  border-color: #f79483;
}
@keyframes shakeError {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>