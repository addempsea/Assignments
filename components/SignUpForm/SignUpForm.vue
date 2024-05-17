<template>
  <div class="container signup">
    <h1 class="signup-title">Create your account</h1>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initialValues="{ email: email }"
    >
      <CustomInput
        label="Username"
        placeholder="Enter username"
        name="username"
        type="text"
        rightError
      />
      <CustomInput
        label="Email"
        placeholder="Enter email"
        name="email"
        type="text"
        rightError
      />
      <div class="signup-flex">
        <CustomInput
          label="Password"
          placeholder="Enter password"
          name="password"
          type="password"
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Type password again"
          name="confirmPassword"
          type="password"
          rightError
        />
      </div>
      <div class="signup-flex">
        <CustomInput
          label="First Name"
          placeholder="Enter first name"
          name="first_name"
          type="text"
        />
        <CustomInput
          label="Last Name"
          placeholder="Enter last name"
          name="last_name"
          type="text"
          rightError
        />
      </div>
      <div class="signup-flex">
        <CustomSelect
          label="Location"
          placeholder="Select location"
          name="state"
          :options="locations"
        />
        <CustomSelect
          label="Gender"
          placeholder="Select gender"
          name="gender"
          :options="genders"
          rightError
        />
      </div>
      <!-- <div class="signup-flex">
        <CheckBoxInput label="I am over 18 years old" name="over18" />
        <CheckBoxInput
          label="I accept the"
          linkText="Terms & Conditions"
          linkHref="/terms"
          name="acceptTerms"
        />
      </div> -->
      <div class="signup-submit">
        <CustomButton
          :isLoading="isLoading"
          imageUrl="/icons/chevronright.svg"
          showImage
          title="Start predicting"
        />
      </div>
    </Form>
  </div>
  <img src="/icons/signup-bg.svg" alt="" class="signup-img" />
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { signUpService } from "../../services/auth";
import { useRouter } from "vue-router";
import { locations } from "../../data/states";
import { genders } from "../../data/gender";
import { useToast } from "vue-toastification";
const $toast = useToast();

const isLoading = ref(false);
const email = ref("");
const router = useRouter();

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Invalid username format. Only alphanumeric characters are allowed."
    ),
  first_name: yup.string().required("First Name is a required field"),
  last_name: yup.string().required("Last Name is a required field"),
  email: yup
    .string()
    .required("Email is a required field")
    .email("Input a valid email address"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password can not be less than 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .min(8, "Password can not be less than 8 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  state: yup.string().required("Location is a required field"),
  gender: yup.string().required("Gender is a required field"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  over18: yup.boolean().oneOf([true], "You must be above 18 years to sign up"),
});

async function onSubmit(values, { resetForm }) {
  try {
    isLoading.value = true;
    delete values?.confirmPassword;
    delete values?.acceptTerms;
    delete values?.over18;
    await signUpService({ ...values, country: "Nigeria" });
    $toast.success("Signup successful!", {
      timeout: 5000,
    });
    resetForm();
    localStorage.removeItem("GoborrUserEmail");
    isLoading.value = false;
    router.push("/login");
  } catch (error) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isLoading.value = false;
  }
}

onMounted(() => {
  const existingEmail = process.client
    ? localStorage.getItem("GoborrUserEmail")
    : "";
  if (existingEmail) {
    email.value = existingEmail;
  }
});
</script>

<style lang="scss" scoped src="./SignUpForm.scss"></style>
