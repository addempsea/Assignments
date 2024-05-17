<template>
  <main class="hero">
    <Navbar :home-nav="true" />
    <section class="hero-header">
      <div class="container hero-header-container">
        <h1 class="hero-header-title">Terms & Conditions</h1>
      </div>
    </section>
    <div class="hero__icons">
      <img src="../assets/icons/hero-left.svg" alt="" />
      <img src="../assets/icons/hero-right.svg" alt="" />
    </div>
  </main>

  <div class="container content">
    <p class="bold mb-20">Effective Date: 10 October 2023</p>
    <p class="mb-20">
      Welcome to Goborr! These Terms and Conditions ("Terms") govern your use of
      our website and our football prediction platform. By accessing and using
      Goborr, you agree to abide by these Terms and any amendments thereto.
    </p>

    <ol>
      <li>
        <div>
          <h3>Acceptance of Terms</h3>
          <ul>
            <li>
              <p>
                By creating an account or participating in any competition
                hosted on Goborr, you signify your acceptance of these Terms.
              </p>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <div>
          <h3>Eligibility</h3>
          <p>
            You must be at least 18 years of age to use Goborr. By agreeing to
            these Terms, you represent and warrant that you are at least 18
            years old.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Account Registration</h3>
          <p>
            To participate in our competitions, you must create an account
            providing accurate and complete information.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>User Conduct</h3>
          <p>
            You agree to use Goborr responsibly and to refrain from engaging in
            any unlawful, harassing, or abusive behavior.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Competitions</h3>
          <p>
            Competitions on Goborr are intended for entertainment purposes only.
            Users are responsible for complying with all applicable laws in
            their jurisdiction regarding participation.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Intellectual Property</h3>
          <p>
            The content on Goborr, including text, graphics, and logos, are the
            property of Goborr and protected by copyright, trademark, and other
            intellectual property laws.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Disclaimer of Warranties</h3>
          <p>
            Goborr is provided "as-is," without any warranties of any kind,
            either express or implied.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Limitation of Liability</h3>
          <p>
            In no event shall Goborr or its affiliates be liable for any direct,
            indirect, punitive, incidental, special, or consequential damages
            arising out of or in any way connected with the use of Goborr.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Indemnification</h3>
          <p>
            You agree to indemnify, defend, and hold harmless Goborr, its
            affiliates, officers, directors, employees, agents, and licensors
            from and against all claims, damages, losses, expenses, and costs
            arising out of your use of Goborr.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Modification of Terms</h3>
          <p>
            We reserve the right to change, modify, or update these Terms at any
            time without notice. It's your responsibility to review these Terms
            periodically.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Governing Law</h3>
          <p>These Terms shall be governed by the laws of Nigeria.</p>
        </div>
      </li>
      <li>
        <div>
          <h3>Contact Us</h3>
          <p>
            If you have any questions regarding these Terms, you may contact us.
          </p>
        </div>
      </li>
    </ol>
  </div>
  <Footer />
</template>

<script lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: 'Terms and Condition',
});
</script>
<style lang="scss" scoped>
.hero {
  background: $light-blue;
  min-height: 70vh;

  @media screen and (max-width: 768px) {
    min-height: 40vh;
  }
  &__icons {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 30vh;
    width: 100%;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
.hero-header {
  background: $light-blue;
  display: flex;

  &-container {
    margin: auto;
    text-align: center;
  }

  &-title {
    font-size: 120px;
    font-weight: 800;
    letter-spacing: -5px;
    span {
      display: inline-block;
      background: url(../assets/icons/hero-win.svg);
      padding: 0 30px 50px;
      background-size: contain;
      background-repeat: no-repeat;
    }
    @media screen and (max-width: 768px) {
      font-size: 60px;
    }
  }
}

.content {
  padding: 100px;

  @media screen and (max-width: 768px) {
    padding: 30px;
  }

  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }

  li {
    font-size: 20px;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }

  p {
    font-size: 16px;
    line-height: 24px;
  }

  .bold {
    font-weight: 600;
  }

  .section-two {
    margin-top: 50px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }
}
</style>
