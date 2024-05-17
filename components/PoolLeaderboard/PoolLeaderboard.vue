<template>
  <section class="leaderboard-wrapper">
    <div class="container leaderboard-container">
      <div class="leaderboard-container__filter">
        <select name="leaderboard" id="leaderboardId" @change="update" v-model="filter">
          <option value="real" disabled selected>Filter Pool Leaderboard</option>
          <option v-for="(val, id) in filteredEvent" :key="id" :value="val.match_day">
            {{ val.name }}
          </option>
        </select>
      </div>
      <div class="off-table">
        <div class="off-table-body">
          <div class="off-table-row" v-for="(el, id) in tableData?.leaderboard" :key="id">
            <span class="off-table-name">
              {{ id + 1 }}.
              <span class="off-table-color">
                {{ el?.username }}
              </span>
            </span>
            <span class="off-table-points">{{ el?.score }}</span>
            <span class="off-table-amount">{{
              id === 0 ? formatSymbolAmount(+tableData?.poolAmount) : `₦0`
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped src="./PoolLeaderboard.scss"></style>

<script setup lang="ts">
import { formatSymbolAmount } from "../../helpers/moneyformatter";

const props = defineProps({
  tableData: {
    type: Array,
    required: false,
  },
  events: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateLeaderboard"]);

const filter = ref("real");

const filteredEvent = props.events.events.filter(
  (val: { match_day: number }) => val.match_day <= props.events.current_round
);

const update = () => {
  const payload = filter.value.toString();

  emit("updateLeaderboard", payload);
};
</script>
