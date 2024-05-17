<template>
  <div class="custom-input" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name" class="custom-input-label" :class="labelClass">{{ label }}</label>
    <div class="custom-input-field" :class="[inputClass, { 'disabled': isDisabled }]">
      <input
        :name="name"
        :id="name"
        :type="inputType"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
        :disabled="isDisabled"
      />
      <img :src="passwordIcon" alt="" v-if="type === 'password'" @click="onClickPasswordIcon" />
    </div>
    <p v-if="helperText" class="custom-input-helper">{{ helperText }}</p>
    <div class="custom-input-error" :class="{ 'right-error': rightError }" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
import { useField } from "vee-validate";

const showPassword = ref(false);

const passwordIcon = computed(() =>
  showPassword.value ? "/icons/show-password.svg" : "/icons/hide-password.svg"
);

const onClickPasswordIcon = () => {
  showPassword.value = !showPassword.value;
};

interface ICustomInputProps {
  type: string;
  value?: string;
  name: string;
  label: string;
  placeholder: string;
  rightError?: boolean;
  helperText?: string;
  labelClass?: string;
  inputClass?: string;
  isDisabled?: boolean;
}

const props = defineProps<ICustomInputProps>();

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

const inputType = computed(() => (showPassword.value ? "text" : props.type));
</script>

<style lang="scss" scoped src="./CustomInput.scss"></style>
