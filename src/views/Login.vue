<template>
  <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input
              label="Email"
              type="email" name="email" />
        <br />
        <input
              label="Password"
              type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "admin" });
          console.log('Successfully logged in!');
        })
        .catch(error => {
          console.error('Unsuccessful login: ', error.response);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>