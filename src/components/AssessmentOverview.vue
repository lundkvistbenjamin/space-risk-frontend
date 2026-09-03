<script setup lang="ts">
import type { Assessment } from '../types/assessment'

defineProps<{
  assessment: Assessment
}>()
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
</template>