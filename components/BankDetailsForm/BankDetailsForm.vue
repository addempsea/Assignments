<template>
  <div class="container bank">
    <h1 class="bank-title">Bank</h1>
    <Spinner v-if="isBankLoading" />
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="initialBankDetails"
      v-else
    >
      <div class="bank-flex">
        <CustomSelect
          label="Select Bank"
          placeholder="Select bank"
          name="code"
          labelClass="label-12"
          :options="bankData"
        />
        <CustomInput
          label="Account Number"
          placeholder="Enter Account Number"
          name="accountNumber"
          type="tel"
          labelClass="label-12"
          :helperText="accountName"
          rightError
        />
      </div>
      <div class="bank-submit">
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
import { getBanks, updateProfile, verifyBankAccount } from "../../services/Profile";
import { useToast } from "vue-toastification";

interface IProps {
  profileDetails: Record<string, string>;
}

const props = defineProps<IProps>();
const { profileDetails } = props;

const $toast = useToast();

const isLoading = ref(false);
const isBankLoading = ref(false);
const bankData = ref({});
const accountName = ref(profileDetails?.bank_name || "");
const initialBankDetails = ref({
  code: profileDetails?.bank_account_code,
  accountNumber: profileDetails?.bank_account,
});

const schema = yup.object().shape({
  code: yup.string().required("Bank is required"),
  accountNumber: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .max(10, "Maximum length is 10")
    .required("Account Number is a required field")
});

async function onSubmit(values: any) {
  try {
    isLoading.value = true;
    const res = await verifyBankAccount(values.accountNumber, values.code);
    if (res.data?.data?.bank_id) {
      accountName.value = res?.data?.data?.account_name;
      await updateProfile({
        bank_account_code: values.code.toString(),
        bank_account: res.data?.data?.account_number,
        bank_name: res.data?.data?.account_name,
      });
      $toast.success("Bank details added successfully!", {
        timeout: 5000,
      });
    } else {
      $toast.error("Invalid bank details. Please try again with correct details", {
        timeout: 5000,
      });
    }

    isLoading.value = false;
  } catch (error: any) {
    $toast.error(error?.response?.data?.message || "Something went wrong. Please try again later", {
      timeout: 5000,
    });
    isLoading.value = false;
  }
}

onBeforeMount(async () => {
  try {
    isBankLoading.value = true;
    const res = await getBanks();
    const updatedBanks = res.data.data?.map((el: Record<string, string>) => ({
      label: el.name,
      value: el.code,
    }));
    bankData.value = updatedBanks;
    isBankLoading.value = false;
  } catch (error: any) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isBankLoading.value = false;
  }
});
</script>

<style lang="scss" scoped src="./BankDetailsForm.scss"></style>
