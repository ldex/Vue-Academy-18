<template>
  <product-list :products="products"></product-list>
</template>

<script>
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'App',
  components: {
    ProductList
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Trek SSL 2017",
          price: 999.9,
          description: "Racing bike.",
          discontinued: false,
          fixedPrice: false,
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/angularstore-29f4b.appspot.com/o/products%2Ftrek.jpg?alt=media&token=42e1650e-7ff9-467f-bde7-0423786c94fd",
          modifiedDate: "2017-06-17",
        },
        {
          id: 2,
          name: "City XT 2015",
          price: 659.5,
          modifiedDate: "2015-03-01",
          description: "City bike.",
          fixedPrice: false,
          discontinued: true,
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/angularstore-29f4b.appspot.com/o/products%2Fcity.jpg?alt=media&token=5a79c5c3-177f-44b3-b99e-fe6be97c4f7a",
        },
        {
          id: 3,
          name: "Cosmic Cobat 2015",
          price: 499.9,
          modifiedDate: "2015-05-17",
          description: "Great bike.",
          fixedPrice: false,
          discontinued: false,
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/angularstore-29f4b.appspot.com/o/products%2Fcosmic-cobat.jpg?alt=media&token=9df1af7a-9b79-4bf6-9b98-9079581fb7d1",
        },
        {
          id: 4,
          name: "Hero DTB 2016",
          price: 759,
          modifiedDate: "2015-05-19",
          description: "Champion bike.",
          fixedPrice: false,
          discontinued: false,
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/angularstore-29f4b.appspot.com/o/products%2Fhero-dtb.jpg?alt=media&token=8cda2f52-2b86-43eb-aa86-2537346e8736",
        },
        {
          id: 5,
          name: "S-WORKS 2016",
          price: 1299.9,
          modifiedDate: "2015-06-17",
          description: "Ultra bike.",
          fixedPrice: false,
          discontinued: false,
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/angularstore-29f4b.appspot.com/o/products%2Fs-works.jpg?alt=media&token=5bf064a9-c8f7-4b47-a113-8825f95934f4",
        },
      ],
    }
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
