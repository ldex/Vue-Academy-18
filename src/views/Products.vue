<template>
    <product-list :products="products" :page-size="5">
        <template v-slot="slotProps">
            <span>{{ slotProps.product.name }}</span> <span>({{ slotProps.product.price }}$)</span>
        </template>
    </product-list>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import { reactive, toRefs, computed, onErrorCaptured } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        ProductList,
    },
    async setup () {
        const store = useStore();

        const state = reactive({
            error: null,
        });
        const products = computed(() => {
            return store.state.products;
        });
        const errorCaptured = onErrorCaptured((error) => {
            console.error('Error in component: ', error.message);
        });
        const fetchProducts = async () => {
            await store
                .dispatch('fetchProducts')
                .catch(error => {
                    state.error = error;
                });
        }
        await fetchProducts();
        return {
            products,
            fetchProducts,
            errorCaptured,
            ...toRefs(state),
        }
    }
}
</script>