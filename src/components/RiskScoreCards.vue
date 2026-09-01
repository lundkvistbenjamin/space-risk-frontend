<script setup lang="ts">
import type { Assessment } from '../types/assessment'

defineProps<{
  assessment: Assessment
}>()
</script>

<template>
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
</template>