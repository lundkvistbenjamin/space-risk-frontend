<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

import {
  fetchLatestAssessment,
  fetchTrends,
} from './services/api'

import type {
  Assessment,
  TrendAssessment,
} from './types/assessment'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
)

const assessment = ref<Assessment | null>(null)
const trends = ref<TrendAssessment[]>([])

const loading = ref(true)
const error = ref<string | null>(null)

const trendPeriod = ref<7 | 30>(7)

const chartCanvas = ref<HTMLCanvasElement | null>(null)

let trendChart: Chart | null = null

const displayedTrends = computed(() => {
  return trends.value.slice(0, trendPeriod.value)
})

const averageRisk = computed(() => {
  if (!displayedTrends.value.length) {
    return 0
  }

  const total = displayedTrends.value.reduce(
    (sum, trend) =>
      sum + trend.scores.overall_max,
    0,
  )

  return total / displayedTrends.value.length
})

const highestRisk = computed(() => {
  if (!displayedTrends.value.length) {
    return 0
  }

  return Math.max(
    ...displayedTrends.value.map(
      (trend) => trend.scores.overall_max,
    ),
  )
})

const highRiskDays = computed(() => {
  return displayedTrends.value.filter(
    (trend) => trend.threat_level === 'HIGH',
  ).length
})

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

function destroyTrendChart() {
  if (trendChart) {
    trendChart.destroy()
    trendChart = null
  }
}

function renderTrendChart() {
  if (!chartCanvas.value || !displayedTrends.value.length) {
    destroyTrendChart()
    return
  }

  destroyTrendChart()

  const chartData = [...displayedTrends.value]
    .reverse()

  trendChart = new Chart(
    chartCanvas.value,
    {
      type: 'line',

      data: {
        labels: chartData.map(
          (trend) => trend.assessment_date,
        ),

        datasets: [
          {
            label: 'Overall risk',
            data: chartData.map(
              (trend) => trend.scores.overall_max,
            ),

            borderColor: '#7aa2f7',
            backgroundColor:
              'rgba(122, 162, 247, 0.10)',

            borderWidth: 2,

            pointRadius: 4,
            pointHoverRadius: 6,

            tension: 0.25,

            fill: true,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        interaction: {
          mode: 'index',
          intersect: false,
        },

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            callbacks: {
              label(context) {
                return `Overall risk: ${Number(
                  context.parsed.y,
                ).toFixed(2)}`
              },
            },
          },
        },

        scales: {
          x: {
            grid: {
              color: 'rgba(128, 139, 155, 0.08)',
            },

            ticks: {
              color: '#697586',
              maxRotation: 0,
            },
          },

          y: {
            min: 0,
            max: 100,

            grid: {
              color: 'rgba(128, 139, 155, 0.10)',
            },

            ticks: {
              color: '#697586',
            },
          },
        },
      },
    },
  )
}

watch(
  [displayedTrends, trendPeriod],
  async () => {
    await nextTick()
    renderTrendChart()
  },
)

onMounted(loadDashboard)

onBeforeUnmount(() => {
  destroyTrendChart()
})
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
                Events observed on this date
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
                Events observed on this date
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

        <!-- Assessment date -->
        <section class="dashboard-section">

          <div class="section-heading">
            <div>
              <p class="section-label">
                ASSESSMENT DATE
              </p>

              <h2>
                {{ assessment.assessment_date }}
              </h2>
            </div>
          </div>

          <p class="section-description">
            This assessment represents space weather activity
            recorded for this calendar day.
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
                Daily overall risk
              </h2>
            </div>

            <div class="trend-controls">
              <button
                class="trend-period-button"
                :class="{
                  active: trendPeriod === 7,
                }"
                @click="trendPeriod = 7"
              >
                7 DAYS
              </button>

              <button
                class="trend-period-button"
                :class="{
                  active: trendPeriod === 30,
                }"
                @click="trendPeriod = 30"
              >
                30 DAYS
              </button>
            </div>
          </div>

          <div class="trend-chart">
            <canvas ref="chartCanvas"></canvas>
          </div>

          <!-- Trend summary -->
          <div class="trend-summary">

            <article class="trend-summary-card">
              <p class="metric-label">
                AVERAGE RISK
              </p>

              <p class="trend-summary-value">
                {{ averageRisk.toFixed(2) }}
              </p>

              <p class="metric-unit">
                over {{ displayedTrends.length }} days
              </p>
            </article>

            <article class="trend-summary-card">
              <p class="metric-label">
                HIGHEST RISK
              </p>

              <p class="trend-summary-value">
                {{ highestRisk.toFixed(2) }}
              </p>

              <p class="metric-unit">
                over {{ displayedTrends.length }} days
              </p>
            </article>

            <article class="trend-summary-card">
              <p class="metric-label">
                HIGH-RISK DAYS
              </p>

              <p class="trend-summary-value">
                {{ highRiskDays }}
              </p>

              <p class="metric-unit">
                threat level HIGH
              </p>
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