<template>
  <div class="select">
    <div class="select-top">
      <div class="select-top-meta">
        <div class="select-top-meta-image">
          <img :src="singleLeague?.logo" />
        </div>
        <div class="select-top-meta-desc">
          <p class="select-top-meta-desc-name">{{ singleLeague?.name }}</p>
          <!-- <p class="select-top-meta-desc-start">Starts in 4 weeks</p> -->
        </div>
      </div>
      <div class="select-top-profile">
        <div>
          <p class="select-top-profile-desc">Hi there</p>
          <p class="select-top-profile-username">{{ user?.first_name }} {{ user?.last_name }}</p>
        </div>
        <div class="select-top-profile-avatar">
          <img src="/icons/people.png" />
        </div>
      </div>
    </div>
    <div class="select-bottom">
      <p class="select-bottom-title">What team do you support?</p>
      <div class="select-bottom-grid">
        <div
          class="select-bottom-grid-team-card"
          v-for="(team, index) in teams"
          :key="index"
          :style="{
            border:
              index + additionalIndex === teamIndex
                ? `1px solid ${team?.image || 'black'}`
                : 'none',
          }"
          @click="handleSelectTeam(index)"
        >
          <div class="select-bottom-grid-team-card-top">
            <p v-if="team?.is_active">{{ team?.short_name }}</p>
          </div>
          <div
            :style="{
              backgroundColor: team?.image,
              height: '40px',
              borderRadius: '0 0 8px 8px',
            }"
          ></div>
        </div>
      </div>
      <div class="select-bottom-buttons">
        <button @click="handleRoute" :disabled="isLoading || isSkipLoading">
          <Spinner v-if="isSkipLoading" />
          <template v-else> Skip </template>
        </button>
        <button @click="handleProceed" :disabled="isLoading || isSkipLoading">
          <Spinner v-if="isLoading" />
          <template v-else> Start predicting </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/store/authStore";
import { useFixturesStore } from "@/store/fixturesStore";
import { joinLeague } from "~~/services/Prediction";

const authStore = useAuthStore();
const fixturesStore = useFixturesStore();

interface ITeamProps {
  singleLeague: ITeamSelectProps;
}

interface ITeamSelectProps {
  created_at?: string;
  current_pool_prize?: string;
  current_position?: number;
  current_round?: number;
  id?: number;
  is_active?: boolean;
  logo?: string;
  name?: string;
  organized_by?: string;
  player_count?: string;
  slug?: string;
  start_date?: string;
  tag?: string;
  updated_at?: string;
}

const props = defineProps<ITeamProps>();

const $toast = useToast();
const router = useRouter();
const teamIndex = ref(0);
const isLoading = ref(false);
const isSkipLoading = ref(false);
const additionalIndex = ref(0);

const user = authStore.$state.userObject as Record<string, string>;

const teams = fixturesStore.getters.getTeams as Record<string, string>[];

onMounted(async () => {
  const teams = await fixturesStore.action.fetchTeams(props.singleLeague.slug as string);
  additionalIndex.value = teams[0]?.id || 1;
});

const handleSelectTeam = (id: number) => {
  teamIndex.value = id + additionalIndex.value;
};

const handleRoute = async () => {
  try {
    teamIndex.value < 1 ? (isSkipLoading.value = true) : (isLoading.value = true);
    await joinLeague(
      props.singleLeague.slug as string,
      teamIndex.value < 1 ? {} : { fav_team_id: teamIndex.value }
    );
    if (teamIndex.value < 1) {
      $toast.success("Favorite team selected!", {
        timeout: 5000,
      });
    }
    document.body.classList.remove("block-modal");
    router.push(`/dashboard/competitions/${props.singleLeague.slug}`);
    isLoading.value = false;
    isSkipLoading.value = false;
  } catch (error) {
    $toast.error((error as any)?.response?.data?.message, {
      timeout: 5000,
    });
    isLoading.value = false;
    isSkipLoading.value = false;
  }
};

const handleProceed = () => {
  if (teamIndex.value < 1) {
    return $toast.error("You have to select a team to proceed!", {
      timeout: 5000,
    });
  }

  handleRoute();
};
</script>

<style lang="scss" scoped src="./TeamSelect.scss"></style>
