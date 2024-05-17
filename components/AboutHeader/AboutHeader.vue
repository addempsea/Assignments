<template>
  <main class="hero">
    <Navbar :home-nav="true" />
    <section class="hero-header">
      <div class="container hero-header-container">
        <h1 class="hero-header-title">{{ mainText || 'About' }} <span>{{ spanText || 'Us' }}</span></h1>
      </div>
    </section>
    <div class="hero__icons">
      <img src="../../assets/icons/hero-left.svg" alt="" />
      <img src="../../assets/icons/hero-right.svg" alt="" />
    </div>
  </main>
</template>
<style lang="scss" scoped src="./AboutHeader.scss"></style>

<script setup lang="ts">

interface IHeroProps {
  mainText?: string;
  spanText?: string;
}

defineProps<IHeroProps>();
</script>
