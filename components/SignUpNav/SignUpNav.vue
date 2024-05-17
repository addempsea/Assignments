<template>
  <header class="signup-header">
    <div class="container signup-header-container">
      <NuxtLink to="/">
        <h1 class="signup-header-logo">Goborr!!</h1>
      </NuxtLink>
      <nav class="signup-header-navigation" v-if="pageTitle === 'register'">
        <ul class="signup-header-navigation-links nav_ul">
          <li>
            <NuxtLink to="/predictions">Predictions</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/leaderboard">Leaderboard </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">FAQs</NuxtLink>
          </li>
        </ul>
      </nav>
      <ul class="signup-header-navigation-links">
        <li v-if="pageTitle !== 'login'">
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li v-if="pageTitle === 'login'">
          <NuxtLink to="/register">Sign Up</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped src="./SignUpNav.scss"></style>
