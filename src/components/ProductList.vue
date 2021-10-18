<template>
  <div>
    <h2>{{ title }}</h2>
    <ul class="products">
      <li
        v-for="product in products"
        :title="JSON.stringify(product)"
        v-bind:key="product.id"
        v-bind:class="{ discontinued: product.discontinued, selected: product === selectedProduct }"
        @click="selectedProduct = product"
      >
        <span class="name">{{ product.name }}</span>
        <span class="description">{{ product.description }}</span>
        <span class="price">{{ product.price }}</span>
      </li>
    </ul>

    <product-details :product="selectedProduct"></product-details>
  </div>
</template>

<script>
import ProductDetails from './ProductDetails.vue';
export default {
    components: { ProductDetails },
    props: {
        products: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            title: "Products",
            selectedProduct: null
        };
    },
};
</script>

<style lang="css" scoped>
.filters {
  padding: 10px;
}
.products {
  margin: 0;
  list-style-type: none;
  padding: 0;
}
.products li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #eee;
  margin: 0.5em;
  padding: 0.3em 0em;
  height: 1.8em;
  border-radius: 4px;
}
.products li:hover {
  color: #607d8b;
  background-color: yellow;
  left: 0.1em;
}
.products li:hover .name,
.products li:hover .price {
  color: #607d8b;
  background-color: #ffd800;
  left: 0.1em;
}
.products li.selected {
  background-color: #0094ff;
  color: white;
}
.products li.selected:hover {
  color: white;
}
.products li.selected .name,
.products li.selected .price {
  background-color: #0026ff;
  color: white;
}
.products .text {
  padding: 0.5em 0.7em 0em 0.7em;
  line-height: 1em;
  left: -1px;
  top: -4px;
  height: 1.8em;
}
.products .name {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: 0.8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products .price {
  float: right;
  width: 15%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-left: 0.8em;
  border-radius: 0px 4px 4px 0px;
}
.products .description {
  height: 1.8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products .discontinued,
.products .discontinued * {
  color: red !important;
}
</style>