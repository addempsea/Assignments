import { defineStore } from "pinia";
import { axiosInstance } from "~~/services";
import { computed, ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const state = {
    profile: ref([]),
  };

  const getters = {
    getProfile: computed(() => state.profile),
  };

  const action = {
    fetchProfile: async () => {
      try {
        const res = await axiosInstance.get(`user/me`);
        state.profile.value = res?.data?.data;
      } catch (error) {
        return error;
      }
    },
  };

  return {
    state,
    getters,
    action,
  };
});
