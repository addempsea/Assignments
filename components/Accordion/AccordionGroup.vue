<template>
  <div class="accordion-group">
    <AccordionItem
      v-for="question in questions"
      :key="question.id"
      :item-id="question.id"
      :content="question.content"
      :title="question.title"
      :is-open="state.openQuestion === question.id"
      @toggle="toggleAccordion"
    />
  </div>
</template>

<script setup lang="ts">
const state = reactive({ openQuestion: 0 });
const questions: IAccordionItem[] = [
  {
    id: 1,
    title: "What is Goborr?",
    content:
      "Goborr is a platform for you to compete with other football fans by predicting the outcome of football matches and stacking up points. Start predicting today!",
  },
  {
    id: 3,
    title: "Is there a limit to how many predictions I can make?",
    content: `You can make predictions on all the available games for that week. Specific guidelines, including any limitations on the number of predictions, will be outlined in the terms and conditions.`,
  },
  {
    id: 4,
    title: "How are the winners determined?",
    content: `Winners are determined based on the accuracy of their predictions relative to the actual outcomes of the sports events. Points are awarded for correct predictions, and the participant(s) with the highest points at the end of the week wins. Check the rules section for detailed information on scoring.`,
  },
  // {
  //     id: 5,
  //     title: 'I won the pool! How can I withdraw my winnings, and are there any fees associated with it?',
  //     content: `Winnings are automatically sent to the bank account you've linked with our app at the end of each week's competition. Typically, it can take up to a few business days for the funds to reflect in your account, depending on your bank's processing times. There are no additional fees on our end for this transfer, but always check with your bank in case they have any incoming transfer fees.`
  // }
];
function toggleAccordion(id: number) {
  if (state.openQuestion === id) {
    state.openQuestion = 0;
  } else {
    state.openQuestion = id;
  }
}
</script>
