<template>
    <div>
        <section v-if="error">
            {{error.message}}
        </section>
        <section v-else>
            <div v-if="loading">
                <h2 class="loading">Loading...</h2>
            </div>
            <div v-else>
                <h2>{{product.name}}</h2>
                <img :src="product.imageUrl ? product.imageUrl : 'https://placeimg.com/200/200/tech'" width="200" style="float:right" />
                <h3>{{product.description}}</h3>
                <p>Price: {{product.price}}</p>
                <p>Fixed price? {{product.fixedPrice}}</p>
                <p>Discontinued? {{product.discontinued}}</p>
                <p>Modified date: {{product.modifiedDate }}</p>
            </div>
        </section>
    </div>
</template>

<script>
    import ProductService from '@/services/ProductService.js';

    export default {
        data () {
            return {
                error: null,
                loading: false,
                product: null
            }
        },
        props: {
            id: {
                type:Number,
                required:true
            }
        },
        created () {
            this.loading = true;
            ProductService.getProduct(this.id)
                .then(response => {
                    this.product = response.data
                })
                .catch(error => {
                    this.error = error;
                })
                .finally(() => this.loading = false)
        },
    }
</script>

<style lang="scss" scoped>

</style>