<template>
  <header class="dashboard-header">
    <div class="container dashboard-header-container">
      <div class="dashboard-header-flex">
        <NuxtLink to="/dashboard/competitions">
          <h1 class="dashboard-header-logo">Goborr!!</h1>
        </NuxtLink>
        <nav class="dashboard-header-navigation">
          <ul class="dashboard-header-navigation-links">
            <NuxtLink to="/dashboard/competitions" v-slot="{ isActive }">
              <li :class="{ active: isActive }">Competitions</li>
            </NuxtLink>
            <NuxtLink to="/how-to-play" v-slot="{ isActive }">
              <li :class="{ active: isActive }">How To Play</li>
            </NuxtLink>
          </ul>
        </nav>
      </div>
      <div class="dashboard-header-avatar">
        <img class="avatar_icon" :src="profile?.profile_photo || `/icons/people.png`" />
        <div class="dashboard-header-avatar-flex" @click="toggleDropdown">
          <div>
            <p class="dashboard-header-avatar-flex-title">Username</p>
            <p class="dashboard-header-avatar-flex-name">
              {{ profile.username || "" }}
            </p>
          </div>
          <img src="/icons/headerCaret.svg" />
        </div>
        <div class="dashboard-header-avatar-dropdown" v-if="showDropDown">
          <NuxtLink to="/dashboard/profile"> <p>Profile</p> </NuxtLink>
          <div><button @click="logout">Logout</button></div>
        </div>
      </div>
    </div>
  </header>
  <div class="mobile-header">
    <header>
      <div class="logo">Goborr!</div>
      <div aria-label="open-menu" id="nav-icon" @click="showNavigation">
        <span id="spanNav" class="nav1"></span>
        <span id="spanNav" class="nav2"></span>
      </div>
      <div :class="{ mobileDrawer: showNav, hide: !showNav }">
        <div class="mobileDrawer__header">
          <div class="mobileDrawer__header--logo">Goborr!</div>
          <div @click="showNavigation">
            <svg
              stroke="#0052C5"
              fill="#0052C5"
              stroke-width="0"
              viewBox="0 0 512 512"
              class="text-white"
              height="48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
              ></path>
            </svg>
          </div>
        </div>
        <nav class="mobileDrawer__nav">
          <ul>
            <NuxtLink to="/dashboard/competitions" v-slot="{ isActive }">
              <li :class="{ active: isActive }">Competitions</li>
            </NuxtLink>
              <NuxtLink to="/how-to-play" v-slot="{ isActive }">
              <li :class="{ active: isActive }">How To Play</li>
            </NuxtLink>
            <NuxtLink to="/dashboard/profile" v-slot="{ isActive }">
              <li :class="{ active: isActive }">Profile</li>
            </NuxtLink>
          </ul>
        </nav>
        <div class="dashboard-header-avatar logout">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped src="./DashboardNav.scss"></style>

<script setup lang="ts">
import { useAuthStore } from "~~/store/authStore";
import { ref } from "vue";
import { useProfileStore } from "@/store/profile";
import { useToast } from "vue-toastification";

const $toast = useToast();
const profileStore = useProfileStore();

const profile = profileStore.getters.getProfile;
const authStore = useAuthStore();
const userAuthCookie = useCookie("userAuthCookie");

onMounted(async () => {
  try {
    profileStore.action.fetchProfile();
  } catch (error) {
    $toast.error((error as any)?.response?.data?.message, {
      timeout: 5000,
    });
    return error;
  }
});

let showNav = ref(false);
let showDropDown = ref(false);

const showNavigation = () => {
  showNav.value = !showNav.value;
};

const toggleDropdown = () => {
  showDropDown.value = !showDropDown.value;
};

const logout = () => {
  authStore.logoutAction();
  userAuthCookie.value = "";
  window.location.href = window.location.origin;
};
</script>
