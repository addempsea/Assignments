<template>
  <div class="container forgot-password">
    <h1 class="forgot-password-title">Forgot password?</h1>
    <p class="forgot-password-desc">No worries, let’s help you reset it.</p>
    <Form @submit="onSubmit" :validation-schema="schema">
      <CustomInput
        label="Email"
        placeholder="Enter your email address"
        name="email"
        type="text"
        rightError
      />
      <div class="forgot-password-submit">
        <CustomButton :isLoading="isLoading" imageUrl="" title="Reset password" />
      </div>
    </Form>
  </div>
  <div class="forgot-password-imgDiv">
    <img src="/icons/login-bg.svg" alt="" class="forgot-password-img" />
    <img src="/icons/login-bg2.svg" alt="" class="forgot-password-img2" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { forgotPasswordService } from "../../services/auth";
import { useToast } from "vue-toastification";
const $toast = useToast();

const schema = yup.object().shape({
  email: yup.string().required("Email is a required field").email("Input a valid email address"),
});

const isLoading = ref(false);

async function onSubmit(values, { resetForm }) {
  try {
    isLoading.value = true;
    delete values?.confirmPassword;
    delete values?.acceptTerms;
    delete values?.over18;
    const res = await forgotPasswordService(values);
    $toast.success(res?.data?.message, {
      timeout: 5000,
    });
    resetForm();
    isLoading.value = false;
  } catch (error) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped src="./ForgotPasswordForm.scss"></style>
