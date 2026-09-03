<script setup lang="ts">
import { computed } from 'vue'

import type { Assessment } from '../types/assessment'

const props = defineProps<{
  assessment: Assessment
}>()

const overallRisk = computed(() => {
  return props.assessment.scores.overall_max
})
</script>

<template>
  <section class="hero">

    <div>
      <p class="section-label">
        TODAY'S ASSESSMENT
      </p>

      <h2>
        Space weather conditions
      </h2>

      <p class="hero-description">
        Daily assessment of solar activity and its potential
        impact on critical infrastructure.
      </p>

      <p class="assessment-meta">
        Assessment date:
        {{ assessment.assessment_date }}
      </p>
    </div>

    <div class="hero-risk">

      <div
        class="threat-badge"
        :class="`threat-${assessment.threat_level.toLowerCase()}`"
      >
        {{ assessment.threat_level }}
      </div>

      <div class="hero-risk-score">
        <span class="metric-label">
          OVERALL RISK
        </span>

        <span class="hero-risk-value">
          {{ overallRisk.toFixed(2) }}
        </span>

        <span class="metric-unit">
          risk score
        </span>
      </div>

    </div>

  </section>
</template>