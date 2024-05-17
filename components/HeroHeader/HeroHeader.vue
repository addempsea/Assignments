<template>
  <main class="hero">
    <Navbar :home-nav="true" />
    <section class="hero-header">
      <div class="container hero-header-container">
        <h1 class="hero-header-title">Compete With</h1>
        <h1 class="hero-header-title second">
          Other Fans & <span>Win!*</span>
        </h1>
        <p class="hero-header-subtitle">
          Predict match results & rack up points!
        </p>
        <div class="hero-header-input-wrapper">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            class="hero-header-input"
            v-model="email"
          />
          <button type="submit" class="hero-header-button" @click="handleClick">
            Get Started
          </button>
        </div>
      </div>
    </section>
    <div class="hero__icons">
      <img src="../../assets/icons/hero-left.svg" alt="" />
      <img src="../../assets/icons/hero-right.svg" alt="" />
    </div>
  </main>
</template>
<style lang="scss" scoped src="./HeroHeader.scss"></style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const router = useRouter();

const handleClick = () => {
  if (email.value) {
    localStorage.setItem("GoborrUserEmail", email.value);
    router.push("/register");
  }
};
</script>
