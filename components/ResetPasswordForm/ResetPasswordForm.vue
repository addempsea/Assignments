<template>
  <div class="container reset-password">
    <h1 class="reset-password-title">Reset password</h1>
    <p class="reset-password-desc">Enter your new password below.</p>
    <Form @submit="onSubmit" :validation-schema="schema">
      <CustomInput
        label="New Password"
        placeholder="Enter your password"
        name="password"
        type="password"
        rightError
      />
      <div class="reset-password-submit">
        <CustomButton :isLoading="isLoading" imageUrl="" title="Change Password" />
      </div>
    </Form>
  </div>
  <div class="reset-password-imgDiv">
    <img src="/icons/login-bg.svg" alt="" class="reset-password-img" />
    <img src="/icons/login-bg2.svg" alt="" class="reset-password-img2" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { resetPasswordService } from "../../services/auth";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const $toast = useToast();
const router = useRouter();

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password can not be less than 8 characters"),
});

const isLoading = ref(false);
const route = useRoute();

async function onSubmit(values, { resetForm }) {
  try {
    isLoading.value = true;
    let token = route.query.token
    const payload = { ...values, token };
    const res = await resetPasswordService(payload);
    $toast.success(res?.data?.message, {
      timeout: 5000,
    });
    resetForm();
    isLoading.value = false;
    router.push("/login");
  } catch (error) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped src="./ResetPasswordForm.scss"></style>
