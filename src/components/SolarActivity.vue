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
</template>