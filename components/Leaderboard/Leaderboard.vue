<template>
  <section class="leaderboard-wrapper">
    <div class="leaderboard-container"></div>
  </section>
</template>
<style lang="scss" scoped src="./Leaderboard.scss"></style>

<script setup lang="ts">
const props = defineProps({
  tableOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  tableData: {
    type: Array,
    required: false,
  },
});

const dummyData = [
  {
    score: "52",
    count: "30",
    id: "VLsoKr9MCIl3CW6Jzxg1rxHiLZWDW94c",
    username: "ominitayo",
    profile_photo: null,
  },
  {
    score: "52",
    count: "20",
    id: "Xs0EYlhyzhdRdV228KVOBUDrMVZ6gw5q",
    username: "codechef",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
  {
    score: "38",
    count: "20",
    id: "vtpcP5wBR5vyiLizGrqcQDqHcmk5Gc4j",
    username: "addempsea",
    profile_photo: null,
  },
];

const data: typeof dummyData = props?.tableData
  ? (props?.tableData as typeof dummyData)
  : dummyData;
</script>
