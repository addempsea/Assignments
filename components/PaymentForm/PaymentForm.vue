<template>
  <div class="amount-form">
    <h1 class="amount-form-title">Add Money To Pool</h1>
    <Form @submit="onSubmit" :validation-schema="schema">
      <CustomInput
        label="Enter amount"
        placeholder="Enter your preferred amount"
        name="amount"
        type="number"
        rightError
        inputClass="amount-form-input border-black"
        labelClass="amount-form-label"
      />
      <div class="amount-form-submit">
        <CustomButton
          :isLoading="isLoading"
          imageUrl=""
          title="Pay"
        />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { addMoneyToPoolService } from "../../services/PoolPayment";
import { useFixturesStore } from '@/store/fixturesStore'

const fixtureStore = useFixturesStore();
const route = useRoute();

const $toast = useToast();
const router = useRouter();

const events = fixtureStore.getters.getMatchEvents;

const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(100, 'Minimum amount is 100 naira')
    .max(2000000, 'Maximum amount is 200k naira')
});

const isLoading = ref(false);

async function onSubmit(values, { resetForm }) {
  try {
    isLoading.value = true;
    const { data } = await addMoneyToPoolService({
      amount: values.amount * 100,
      callback_url: window.location.href,
      competition_slug: `${route.params.slug}`,
      round_id: events.value.current_round
    });
    window.location.replace(data.data.authorization_url);
    isLoading.value = false;
  } catch (error) {
    $toast.error(error?.response?.data?.message, {
      timeout: 5000,
    });
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped src="./PaymentForm.scss"></style>
