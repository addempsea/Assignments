<template>
  <div class="custom-select" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name" class="custom-select-label" :class="labelClass">{{ label }}</label>
    <div class="custom-select-field">
      <select :name="name" :id="name" :value="inputValue" @input="handleChange" @blur="handleBlur">
        <option value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <label :for="name" >
        <img src="/icons/dropdown.svg" alt="" />
      </label>
    </div>
    <div class="custom-select-error" :class="{ 'right-error': rightError }" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  labelClass: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  rightError: {
    type: Boolean,
    required: false,
  },
});

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
</script>

<style lang="scss" scoped src="./CustomSelect.scss"></style>
