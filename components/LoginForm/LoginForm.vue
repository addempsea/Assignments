<template>
  <div class="container login">
    <h1 class="login-title">Sign into your account</h1>
    <Form @submit="onSubmit" :validation-schema="schema">
      <CustomInput label="Email" placeholder="Enter email" name="email" type="text" rightError />
      <CustomInput
        label="Password"
        placeholder="Enter password"
        name="password"
        type="password"
        helperText="8+ characters, can include symbols."
        rightError
      />
      <p class="login-desc">
        <NuxtLink to="/forgot-password">Forgot Password?</NuxtLink>
      </p>
      <div class="login-submit">
        <CustomButton
          :isLoading="isLoading"
          imageUrl="/icons/chevronright.svg"
          showImage
          title="Sign in"
        />
      </div>
    </Form>
  </div>
  <div class="login-imgDiv">
    <img src="/icons/login-bg.svg" alt="" class="login-img" />
    <img src="/icons/login-bg2.svg" alt="" class="login-img2" />
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import * as yup from "yup";
import { logInService } from "../../services/auth";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/store/authStore";

const userAuthCookie = useCookie("userAuthCookie");
const router = useRouter();
const $toast = useToast();
const authStore = useAuthStore();

const isLoading = ref(false);

const schema = yup.object().shape({
  email: yup.string().required("Email is a required field").email("Input a valid email address"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password can not be less than 8 characters"),
});

async function onSubmit(values, { resetForm }) {
  const getRouteBeforeAuth = process.client ? localStorage.getItem("routeBeforeAuth") : "";
  try {
    isLoading.value = true;
    const loginResponse = await logInService(values);
    process.client ? localStorage.setItem("userToken", loginResponse?.data?.data?.token) : "";
    authStore.$state.authenticated = true;
    userAuthCookie.value = true;
    authStore.$state.userObject = loginResponse.data.data;
    $toast.success("Login successful!", {
      timeout: 5000,
    });

    if (getRouteBeforeAuth !== null && getRouteBeforeAuth !== "") {
      window.location.replace(window.location.href.split('/')[0] + getRouteBeforeAuth)
      isLoading.value = false;
      localStorage.removeItem("routeBeforeAuth");
      return
    }
    window.location.replace(window.location.href.split('/')[0] + '/dashboard/competitions')
    isLoading.value = false;
  } catch (error) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped src="./LoginForm.scss"></style>
