<template>
  <div class="container profile">
    <div class="avatar-div">
      <div class="avatar-div-img">
        <img
          :src="profileDetails?.profile_photo || `/icons/avatar.webp`"
          alt="profile"
        />
      </div>
      <div class="avatar-div-label">
        <SmallSpinner v-if="isUploadLoading" />
        <label for="fileInput" v-else>
          <img src="/icons/Camera.svg" alt="Upload" />

          <input
            type="file"
            ref="fileInput"
            id="fileInput"
            :disabled="isUploadLoading"
            accept="image/jpeg, image/png"
            style="display: none"
            @change="handleFileChange"
          />
        </label>
      </div>
    </div>
    <h1 class="profile-title">Personal Details</h1>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="profileDetails"
    >
      <div class="profile-flex">
        <CustomInput
          label="First Name"
          placeholder="Enter first name"
          name="first_name"
          type="text"
          labelClass="label-12"
        />
        <CustomInput
          label="Last Name"
          placeholder="Enter last name"
          name="last_name"
          type="text"
          labelClass="label-12"
          rightError
        />
      </div>
      <div class="profile-flex">
        <CustomInput
          label="User Name"
          placeholder="username"
          name="username"
          type="text"
          labelClass="label-12"
        />
        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder=""
          isDisabled
          labelClass="label-12"
          rightError
        />
      </div>
      <div class="profile-flex">
        <CustomSelect
          label="Location"
          placeholder="Select location"
          name="state"
          labelClass="label-12"
          :options="locations"
        />
        <CustomSelect
          label="Gender"
          placeholder="Select gender"
          name="gender"
          labelClass="label-12"
          :options="genders"
          rightError
        />
      </div>
      <div class="profile-submit">
        <button type="submit" :disabled="isLoading">
          <SmallSpinner v-if="isLoading" />
          <template v-else> Update </template>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import * as yup from "yup";
import { updateProfile } from "../../services/Profile";
import { useToast } from "vue-toastification";
import axios from "axios";
import { locations } from "../../data/states";
import { genders } from "../../data/gender";

interface IProps {
  profileDetails: Record<string, string>;
  onUpdateProfileDetails: (payload: Record<string, string>) => void;
}

const props = defineProps<IProps>();
const { profileDetails, onUpdateProfileDetails } = props;

const $toast = useToast();

const isLoading = ref(false);
const isUploadLoading = ref(false);
const fileInput = ref(null);

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
  state: yup
    .string()
    .typeError("Please input a valid string")
    .required("Location is a required field"),
  gender: yup.string().required("Gender is a required field"),
});

const handleFileChange = async (event: any) => {
  isUploadLoading.value = true;
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "Goborr-bucket");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/Goborr/image/upload",
        formData
      );
      onUpdateProfileDetails({ profile_photo: response.data?.secure_url });
      await updateProfile({ profile_photo: response.data?.secure_url });
      $toast.success("Image updated successfully!", {
        timeout: 5000,
      });
      isUploadLoading.value = false;
    } catch (error) {
      $toast.error("Error uploading image. Please try again", {
        timeout: 5000,
      });
      isUploadLoading.value = false;
    }
  }
};

async function onSubmit(values: any) {
  try {
    isLoading.value = true;
    const changedValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== profileDetails[key]
      )
    );
    if (Object.keys(changedValues).length > 0) {
      await updateProfile(changedValues as Record<string, string>);
      $toast.success("Profile updated successfully!", {
        timeout: 5000,
      });
    }
    isLoading.value = false;
  } catch (error: any) {
    $toast.error(
      error?.response?.data?.message ||
        "Something went wrong. Please try again later",
      {
        timeout: 5000,
      }
    );
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped src="./PersonalDetailsForm.scss"></style>
