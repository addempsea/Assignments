<template>
  <div class="container how-to-play">
    <h1>Welcome to Goborr!</h1>
    <p>
      Whether you're a seasoned football enthusiast or a novice looking to test your prediction
      skills, we've got a simple and elegant scoring system to keep you engaged and entertained
      throughout the season. Here's a breakdown of how to score points with our prediction system:
    </p>
    <h2 class="section-two">Scoring System</h2>
    <p class="mb-20">
      Our scoring system is designed to reward accuracy and insight. For each match you predict, you
      have the opportunity to earn points based on the accuracy of your forecast. Here's how it
      works:
    </p>
    <ol>
      <li>
        <div>
          <div class="play-flex">
            <h3>Home Team Correct Score</h3>
            <PointsComponent :pointsEarned="1" />
          </div>
          <p>If you correctly predict the exact score of the home team, you'll earn 1 point.</p>
        </div>
      </li>
      <li>
        <div>
          <div class="play-flex">
            <h3>Away Team Correct Score</h3>
            <PointsComponent :pointsEarned="1" />
          </div>
          <p>Guessing the correct score for the away team also earns you 1 point.</p>
        </div>
      </li>
      <li>
        <div>
          <div class="play-flex">
            <h3>Correct Goal Difference</h3>
            <PointsComponent :pointsEarned="1" />
          </div>
          <p>
            If your prediction nails the goal difference between the two teams, you'll score an
            additional point.
          </p>
        </div>
      </li>
      <li>
        <div>
          <div class="play-flex">
            <h3>Correct Outcome</h3>
            <PointsComponent :pointsEarned="3" />
          </div>
          <p>
            The most rewarding prediction is to correctly forecast the outcome of the match, whether
            it's a win, draw, or loss for either team. If your prediction aligns with the real-life
            result, you'll bag a hefty 3 points.
          </p>
        </div>
      </li>
    </ol>
    <p class="mb-20">Now, let's illustrate how this scoring system works with some examples:</p>
    <h2 class="section-two">Examples</h2>
    <ul>
      <li class="mb-20" v-for="(el, id) in examples" :key="id">
        <p class="bold mb-20">Example {{ id + 1 }}: Real-life score - Arsenal 1, Man City 3</p>
        <div class="play-flex">
          <p class="bold">Prediction: Arsenal {{ el?.homeScore }} - {{ el?.awayScore }} Man City</p>
          <PointsComponent :pointsEarned="el?.totalPoints" />
        </div>
        <ul>
          <li>
            <div class="play-flex">
              <p>
                Home team correct score - {{ el?.homeCorrectScore }}
                {{ el?.homeCorrectScore === 1 ? "pt" : "pts" }}
              </p>
            </div>
          </li>
          <li>
            <div class="play-flex">
              <p>Away team correct score - {{ el?.awayCorrectScore }}
                {{ el?.awayCorrectScore === 1 ? "pt" : "pts" }}</p>
            </div>
          </li>
          <li>
            <div class="play-flex">
              <p>Correct goal difference - {{ el?.goalDifference }}
                {{ el?.goalDifference === 1 ? "pt" : "pts" }}</p>
            </div>
          </li>
          <li>
            <div class="play-flex">
              <p>Correct outcome - {{ el?.correctOutcome }}
                {{ el?.correctOutcome === 1 ? "pt" : "pts" }}</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <p class="mb-20">
      By participating in our predictions, you not only engage with the matches on a deeper level
      but also have the chance to accumulate points, compete with others, and showcase your football
      intuition. Don't hesitate to join in the fun and start making your predictions today!
    </p>
    <p>
      Keep in mind that we tally the points after each round, and the top predictors may have the
      opportunity to win exciting prizes at the end of the season. So, what are you waiting for?
      Dive into the world of football predictions, showcase your skills, and enjoy the thrill of the
      beautiful game!
    </p>

    <button
      class="button"
      @click="$router.push(!authenticateduser ? '/login' : '/dashboard/competitions')"
    >
      {{ !authenticateduser ? "Login" : "Predict Now" }}
    </button>
  </div>
</template>
<style lang="scss" scoped src="./HowToPlayContent.scss"></style>

<script setup lang="ts">
const examples = [
  {
    homeScore: 2,
    awayScore: 1,
    totalPoints: 0,
    homeCorrectScore: 0,
    awayCorrectScore: 0,
    goalDifference: 0,
    correctOutcome: 0,
  },
  {
    homeScore: 1,
    awayScore: 0,
    totalPoints: 1,
    homeCorrectScore: 1,
    awayCorrectScore: 0,
    goalDifference: 0,
    correctOutcome: 0,
  },
  {
    homeScore: 3,
    awayScore: 3,
    totalPoints: 1,
    homeCorrectScore: 0,
    awayCorrectScore: 1,
    goalDifference: 0,
    correctOutcome: 0,
  },
  {
    homeScore: 0,
    awayScore: 5,
    totalPoints: 3,
    homeCorrectScore: 0,
    awayCorrectScore: 0,
    goalDifference: 0,
    correctOutcome: 3,
  },
  {
    homeScore: 0,
    awayScore: 2,
    totalPoints: 4,
    homeCorrectScore: 0,
    awayCorrectScore: 0,
    goalDifference: 1,
    correctOutcome: 3,
  },
  {
    homeScore: 0,
    awayScore: 3,
    totalPoints: 4,
    homeCorrectScore: 0,
    awayCorrectScore: 1,
    goalDifference: 0,
    correctOutcome: 3,
  },
  {
    homeScore: 1,
    awayScore: 2,
    totalPoints: 4,
    homeCorrectScore: 1,
    awayCorrectScore: 0,
    goalDifference: 0,
    correctOutcome: 3,
  },
  {
    homeScore: 1,
    awayScore: 3,
    totalPoints: 6,
    homeCorrectScore: 1,
    awayCorrectScore: 1,
    goalDifference: 1,
    correctOutcome: 3,
  },
];

const authenticateduser = ref("");

onMounted(() => {
  const token = process.client ? localStorage.getItem("userToken") : "";
  authenticateduser.value = token!;
});
</script>
