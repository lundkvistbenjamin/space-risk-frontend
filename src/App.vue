<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  fetchLatestAssessment,
  fetchTrends,
} from './services/api'

import type {
  Assessment,
  TrendAssessment,
} from './types/assessment'

import DashboardHeader from './components/DashboardHeader.vue'
import AssessmentOverview from './components/AssessmentOverview.vue'
import RiskScoreCards from './components/RiskScoreCards.vue'
import SolarActivity from './components/SolarActivity.vue'
import RiskTrend from './components/RiskTrend.vue'

const assessment = ref<Assessment | null>(null)
const trends = ref<TrendAssessment[]>([])

const loading = ref(true)
const error = ref<string | null>(null)

async function loadDashboard() {
  try {
    loading.value = true
    error.value = null

    const [latestAssessment, trendData] =
      await Promise.all([
        fetchLatestAssessment(),
        fetchTrends(30),
      ])

    assessment.value = latestAssessment
    trends.value = trendData
  } catch (err) {
    console.error(err)

    error.value =
      'Unable to load the latest space weather data.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <div class="app">

    <DashboardHeader />

    <main class="dashboard">

      <!-- Loading state -->
      <section v-if="loading" class="state-message">
        <p>Loading space weather data...</p>
      </section>

      <!-- Error state -->
      <section v-else-if="error" class="state-message error">
        <p>{{ error }}</p>

        <button @click="loadDashboard">
          Try again
        </button>
      </section>

      <!-- Dashboard -->
      <template v-else-if="assessment">

        <AssessmentOverview
          :assessment="assessment"
        />

        <RiskScoreCards
          :assessment="assessment"
        />

        <SolarActivity
          :assessment="assessment"
        />

        <RiskTrend
          :trends="trends"
        />

      </template>

    </main>

    <footer class="site-footer">
      <p>
        Space Weather Risk Monitor ·
        Data sourced from NASA DONKI
      </p>
    </footer>

  </div>
</template>