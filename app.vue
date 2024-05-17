<template>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Goborr | ${titleChunk}` : "Goborr";
  },
});

useSeoMeta({
  title: "Goborr",
  ogTitle: "Goborr: Dive into the Ultimate Soccer Prediction Challenge!",
  description:
    "Join the Goborr community – the pinnacle of soccer predicting platforms! Test your sports acumen, pit against fellow enthusiasts, and stand a chance to win big every week.",
  ogDescription:
    "Predict. Compete. Win. Goborr offers you a front-row seat to the world of soccer forecasting. Rise up the ranks, and grab your weekly jackpot! Ready for the challenge?",
  ogImage:
    "https://res.cloudinary.com/demp/image/upload/v1699383189/Compete_With_io6fec.jpg",
  twitterImage:
    "https://res.cloudinary.com/demp/image/upload/v1699383189/Compete_With_io6fec.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Goborr",
  twitterDescription:
    "Predict. Compete. Win. Goborr offers you a front-row seat to the world of soccer forecasting. Rise up the ranks, and grab your weekly jackpot! Ready for the challenge?",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1.0",
});
</script>
