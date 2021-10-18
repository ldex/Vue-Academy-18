import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://storerestservice.azurewebsites.net/api`,
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
  getProducts() {
    let sortParams = `?$orderby=ModifiedDate%20desc`;
    return apiClient
            .get(RESOURCE_NAME + sortParams)
            .then(products => new Promise(resolve => setTimeout(() => resolve(products), 500)))  // slowing down the response for testing purpose...
  },
  getProduct(id) {
    return apiClient.get(`${RESOURCE_NAME}/${id}`)
  }
}