import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const apiClient = axios.create({
  baseURL: `http://storerestservice.azurewebsites.net/api`,
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.error('API Error, ' + error);
      return Promise.reject(error);
    }
  );

const RESOURCE_NAME = 'products';

export default {
  clearCache: false,

  getProducts() {
    let sortParams = `?$orderby=ModifiedDate%20desc`;
    let forceUpdate = this.clearCache;
    this.clearCache = false;
    return apiClient.get(RESOURCE_NAME + sortParams, { forceUpdate: forceUpdate })
  },

  getProduct(id) {
    return apiClient.get(`${RESOURCE_NAME}/${id}`)
  }
}