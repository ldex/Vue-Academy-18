<template>
    <section v-if="error">
      {{error.message}}
    </section>
    <section v-else>
      <div v-if="loading">
        <h2 class="loading">Loading products</h2>
      </div>
      <product-list v-else :products="products"></product-list>
    </section>
</template>

<script>
import ProductService from './services/ProductService.js';
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'App',
  components: {
    ProductList
  },
  data() {
    return {
      products: [],
      error: null,
      loading: false
    }
  },
  created () {
    this.loading = true;
      ProductService
        .getProducts()
        .then(response => {
          this.products = response.data
        })
        .catch(error => {
          this.error = error
        })
      .finally(() => this.loading = false);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
