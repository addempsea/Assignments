<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-content">
        <slot></slot>
      </div>

      <button @click="handleCloseModal" class="modal-button">
        <img src="/icons/Close.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

const handleCloseModal = () => {
  emit("close");
};
</script>

<style lang="scss" scoped src="./CustomModal.scss"></style>
