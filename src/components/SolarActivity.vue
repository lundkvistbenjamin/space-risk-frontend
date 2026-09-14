<script setup lang="ts">
import type { Assessment } from '../types/assessment'

defineProps<{
  assessment: Assessment
}>()
</script>

<template>
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
          Solar flare events observed on this date.
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
          CME events observed on this date.
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
          Strongest solar flare observed on this date.
        </p>
      </article>

      <article class="observation-card">
        <p class="metric-label">
          PRIMARY CME SPEED
        </p>

        <p class="observation-value">
          {{ assessment.primary_cme_features.speed }} km/s
        </p>

        <p class="observation-description">
          Primary CME speed and directional assessment used by the risk model.
        </p>
      </article>

    </div>
  </section>
</template>