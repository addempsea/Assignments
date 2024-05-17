<template>
    <section class="faq-wrapper" id="faqs">
        <div class="faq-header">
            <h3 class="section-title">Frequently asked questions.</h3>
            <p class="section-subtitle">Everything you need to know about {{ state.appName }}.</p>
        </div>
        <div class="container">
            <AccordionGroup />
        </div>
    </section>
</template>

<script setup lang="ts">
import { APP_NAME } from '~~/config';

const state: FAQState = {
    appName: APP_NAME
}
</script>
<style lang="scss" scoped src="./FrequentlyAskedQuestions.scss"></style>
