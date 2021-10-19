<template>
  <div class="home">
    <modal-button button-text="Open Modal!"></modal-button>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import ModalButton from '../components/ModalButton.vue'

export default {
  name: 'Home',
  components: {
    ModalButton
  }
}
</script>

    ModalButton