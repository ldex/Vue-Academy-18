import { createStore } from 'vuex'
import ProductService from '@/services/ProductService.js';
import axios from 'axios'

export default createStore({
  state: {
    isLoading: false,
    products: [],
    product: {},
    token: null
  },
  mutations: {
    SET_LOADING_STATUS(state) {
      state.isLoading = !state.isLoading;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {
    addProduct({commit}, newProduct) {
      return ProductService.insertProduct(newProduct)
        .then(() => {
          commit('ADD_PRODUCT', newProduct);
        })
    },
    fetchProducts({commit}) {
      commit('SET_LOADING_STATUS');
      return ProductService.getProducts()
        .then(response => {
          commit('SET_PRODUCTS', response.data);
        })
        .finally(() => commit('SET_LOADING_STATUS'));
    },
    fetchProduct({commit,getters}, id) {
      let p = getters.getProductById(id);
      if(p == null) {
        commit('SET_LOADING_STATUS');
        ProductService.getProduct(id)
          .then(response => {
            commit('SET_PRODUCT', response.data);
          })
          .finally(() => commit('SET_LOADING_STATUS'))
      } else {
        commit('SET_PRODUCT', p);
      }
    },
    login ({ commit }, credentials) {
      return axios
        .post('http://www.mocky.io/v2/5b9149823100002a00939952', credentials) // mocky.io allows us to fake a successful authentication from the server
        .then(({ data }) => {
          commit('SET_TOKEN', data.token);
          localStorage.setItem('auth_token', JSON.stringify(data.token));
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        })
    },
    checkPreviousLogin({ commit }) {
      const existingToken = localStorage.getItem('auth_token');
      if(existingToken)
        commit('SET_TOKEN', existingToken);
        localStorage.setItem('auth_token', JSON.stringify(existingToken));
        axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    loggedIn(state) {
      return !!state.token
    }
  },
  modules: {
  }
})
