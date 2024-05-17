<template>
  <div class="dashboard-layout">
    <DashboardNav />
    <main class="dashboard-section">
      <section class="container">
        <slot />
      </section>
    </main>
    <footer>
      <nav class="dashboard-footer__navigation container">
        <ul class="dashboard-footer__navigation__links">
          <li>
            <NuxtLink to="/privacy-policy"> Privacy Policy </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/terms-and-conditions"> Terms & Conditions </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/how-to-play"> How To Play </NuxtLink>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  &-footer__navigation {
    height: 80px;
    padding: 0 30px;

    &__links {
      display: flex;
      height: 100%;
      align-items: center;

      li {
      margin-right: 20px;
      font-size: 15px;
      color: $black;
      transition: all 300ms ease-in;

      @include on-hover {
        color: $light-blue;
      }
    }
    }
  }

  &-layout {
    display: grid;
    grid-template-rows: 144px 1fr;
    grid-template-columns: 1fr;
    min-height: 100vh;

    @media screen and (max-width: 768px) {
      grid-template-rows: 80px 1fr;
    }
  }

  &-section {
    background: #f5f6ff;

    .container {
      padding: 40px 80px 70px;

      @media screen and (max-width: 768px) {
        padding: 40px 20px 50px;
      }
    }
  }
}
</style>
