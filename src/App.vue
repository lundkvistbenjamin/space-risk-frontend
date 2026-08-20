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
        fetchTrends(7),
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
    <header class="site-header">
      <div class="header-content">
        <div>
          <p class="eyebrow">SPACE WEATHER RISK</p>
          <h1>Infrastructure Risk Monitor</h1>
        </div>

        <div class="status">
          <span class="status-dot"></span>
          <span>Live data</span>
        </div>
      </div>
    </header>

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

        <section class="hero">
          <div>
            <p class="section-label">
              TODAY'S ASSESSMENT
            </p>

            <h2>
              Space weather conditions
            </h2>

            <p class="hero-description">
              Current solar activity and its potential
              impact on critical infrastructure.
            </p>
          </div>

          <div
            class="threat-badge"
            :class="`threat-${assessment.threat_level.toLowerCase()}`"
          >
            {{ assessment.threat_level }}
          </div>
        </section>

        <!-- Risk scores -->
        <section class="metrics-grid">

          <article class="metric-card">
            <p class="metric-label">
              OVERALL RISK
            </p>

            <p class="metric-value">
              {{ assessment.scores.overall_max.toFixed(2) }}
            </p>

            <p class="metric-unit">
              risk score
            </p>
          </article>

          <article class="metric-card">
            <p class="metric-label">
              GPS DISRUPTION
            </p>

            <p class="metric-value">
              {{ assessment.scores.gps_disruption.toFixed(2) }}
            </p>

            <p class="metric-unit">
              risk score
            </p>
          </article>

          <article class="metric-card">
            <p class="metric-label">
              POWER GRID
            </p>

            <p class="metric-value">
              {{ assessment.scores.power_grid.toFixed(2) }}
            </p>

            <p class="metric-unit">
              risk score
            </p>
          </article>

          <article class="metric-card">
            <p class="metric-label">
              RADIO BLACKOUT
            </p>

            <p class="metric-value">
              {{ assessment.scores.radio_blackout.toFixed(2) }}
            </p>

            <p class="metric-unit">
              risk score
            </p>
          </article>

        </section>

        <!-- Solar observations -->
        <section class="dashboard-section">

          <div class="section-heading">
            <div>
              <p class="section-label">
                SOLAR ACTIVITY
              </p>

              <h2>
                Current observations
              </h2>
            </div>
          </div>

          <div class="observation-grid">

            <article class="observation-card">
              <p class="metric-label">
                SOLAR FLARES
              </p>

              <p class="observation-value">
                {{ assessment.flare_count }}
              </p>

              <p class="observation-description">
                Events detected in the assessment window
              </p>
            </article>

            <article class="observation-card">
              <p class="metric-label">
                CORONAL MASS EJECTIONS
              </p>

              <p class="observation-value">
                {{ assessment.cme_count }}
              </p>

              <p class="observation-description">
                Events detected in the assessment window
              </p>
            </article>

            <article class="observation-card">
              <p class="metric-label">
                PEAK FLARE
              </p>

              <p class="observation-value">
                {{ assessment.peak_solar_flare_class }}
              </p>

              <p class="observation-description">
                Strongest recorded solar flare
              </p>
            </article>

            <article class="observation-card">
              <p class="metric-label">
                PRIMARY CME SPEED
              </p>

              <p class="observation-value">
                {{ assessment.primary_cme_features.speed }}
              </p>

              <p class="observation-description">
                km/s ·
                {{
                  assessment.primary_cme_features
                    .is_earth_directed
                    ? 'Earth-directed'
                    : 'Not Earth-directed'
                }}
              </p>
            </article>

          </div>
        </section>

        <!-- Assessment window -->
        <section class="dashboard-section">

          <div class="section-heading">
            <div>
              <p class="section-label">
                ASSESSMENT WINDOW
              </p>

              <h2>
                {{ assessment.window_start }}
                →
                {{ assessment.window_end }}
              </h2>
            </div>
          </div>

          <p class="section-description">
            This assessment analyzes NASA DONKI space
            weather events from the previous 30 days.
          </p>

        </section>

        <!-- Trends -->
        <section class="dashboard-section">

          <div class="section-heading">
            <div>
              <p class="section-label">
                RISK TRENDS
              </p>

              <h2>
                Recent assessments
              </h2>
            </div>

            <span class="section-meta">
              {{ trends.length }} days
            </span>
          </div>

          <div class="trend-list">

            <article
              v-for="trend in trends"
              :key="trend.assessment_date"
              class="trend-row"
            >

              <div>
                <p class="trend-date">
                  {{ trend.assessment_date }}
                </p>

                <p class="trend-threat">
                  {{ trend.threat_level }}
                </p>
              </div>

              <div class="trend-score">
                {{ trend.scores.overall_max.toFixed(2) }}
              </div>

              <div class="trend-events">
                {{ trend.flare_count }} flares
                ·
                {{ trend.cme_count }} CMEs
              </div>

            </article>

          </div>

        </section>

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