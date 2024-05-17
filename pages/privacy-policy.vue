<template>
  <main class="hero">
    <Navbar :home-nav="true" />
    <section class="hero-header">
      <div class="container hero-header-container">
        <h1 class="hero-header-title">Privacy Policy</h1>
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
      Welcome to Goborr! We are committed to protecting your privacy and
      ensuring that your personal information is handled in a safe and
      responsible manner. This Privacy Policy outlines how Goborr collects,
      uses, and safeguards your information on our website and through our
      football prediction platform.
    </p>

    <ol>
      <li>
        <div>
          <h3>Information Collection</h3>
          <ul>
            <li>
              <p>
                <span class="bold">Personal Information:</span> When you create
                an account with Goborr, we may collect personal information such
                as your name, email address, and other relevant details.
              </p>
            </li>
            <li>
              <p>
                <span class="bold">Non-Personal Information:</span> We collect
                non-personal information like browser type, device type,
                operating system, and IP addresses to enhance your user
                experience.
              </p>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <div>
          <h3>Information Usage</h3>
          <p>
            Your information helps us personalize and improve your experience on
            Goborr. It enables us to manage your account, respond to inquiries,
            and administer our leaderboard competitions.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Information Sharing</h3>
          <p>
            Goborr does not sell, trade, or rent your personal information to
            third parties. We may share non-personal aggregate statistics about
            our users with partners or advertisers in a non-identifiable format.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Cookies and Tracking Technologies</h3>
          <p>
            We employ cookies and other tracking technologies to collect
            information to enhance your user experience and improve our website.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Security</h3>
          <p>
            We implement stringent security measures to protect your personal
            information. However, no system can be completely secure, and we
            cannot guarantee the absolute security of your information.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Children’s Privacy</h3>
          <p>
            Goborr is not intended for use by individuals under the age of 18.
            We do not knowingly collect personal information from children under
            18.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. Any changes will
            be posted on this page with an updated effective date.
          </p>
        </div>
      </li>
      <li>
        <div>
          <h3>Contact Us</h3>
          <p>
            If you have any questions or concerns regarding our Privacy Policy,
            please contact us <a href="mailto:comms@goborr.com" class="link">here</a>.
          </p>
        </div>
      </li>
    </ol>
    <p class="mb-20">
      Your privacy is of utmost importance to us, and we strive to ensure a
      transparent and secure environment on Goborr. By using our platform, you
      agree to the terms laid out in this Privacy Policy.
    </p>
  </div>
  <Footer />
</template>

<script lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: 'Privacy Policy',
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

  .link {
    color: $light-blue;
  }
}
</style>
