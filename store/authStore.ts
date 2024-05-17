import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
      userObject: {},
    }
  },
  persist: true,
  actions: {
    logoutAction() {
      localStorage.clear();
      this.authenticated = false,
      this.userObject = {}
    }
  }
})