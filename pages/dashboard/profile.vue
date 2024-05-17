<template>
  <NuxtLayout name="dashboard-layout">
    <div>
      <PageTitle title="Profile" />
      <Spinner v-if="isPageLoading" isCenter />
      <div v-else>
        <PersonalDetailsForm
          :profileDetails="profileDetails"
          :onUpdateProfileDetails="onUpdateProfileDetails"
        />
        <BankDetailsForm :profileDetails="profileDetails"  />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { fetchProfile } from "../../services/Profile";
import { useToast } from "vue-toastification";

const $toast = useToast();

const profileDetails = ref({});
const isPageLoading = ref(true);

definePageMeta({
  middleware: ["dashboard-auth"],
});

const onUpdateProfileDetails = (payload: Record<string, string>) => {
  profileDetails.value = { ...profileDetails.value, ...payload};
};

onBeforeMount(async () => {
  try {
    const res = await fetchProfile();
    profileDetails.value = res.data.data;
    isPageLoading.value = false;
  } catch (error: any) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isPageLoading.value = false;
  }
});
useHead({
  title: "Profile",
});
</script>
