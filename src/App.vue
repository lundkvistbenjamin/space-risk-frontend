<script setup lang="ts">
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
      <section class="hero">
        <div>
          <p class="section-label">TODAY'S ASSESSMENT</p>
          <h2>Space weather conditions</h2>
          <p class="hero-description">
            Current solar activity and its potential impact on critical
            infrastructure.
          </p>
        </div>

        <div class="threat-badge">
          HIGH
        </div>
      </section>

      <section class="metrics-grid">
        <article class="metric-card">
          <p class="metric-label">OVERALL RISK</p>
          <p class="metric-value">67.22</p>
          <p class="metric-unit">risk score</p>
        </article>

        <article class="metric-card">
          <p class="metric-label">GPS DISRUPTION</p>
          <p class="metric-value">67.22</p>
          <p class="metric-unit">risk score</p>
        </article>

        <article class="metric-card">
          <p class="metric-label">POWER GRID</p>
          <p class="metric-value">58.37</p>
          <p class="metric-unit">risk score</p>
        </article>

        <article class="metric-card">
          <p class="metric-label">RADIO BLACKOUT</p>
          <p class="metric-value">51.88</p>
          <p class="metric-unit">risk score</p>
        </article>
      </section>

      <section class="dashboard-section">
        <div class="section-heading">
          <div>
            <p class="section-label">SOLAR ACTIVITY</p>
            <h2>Current observations</h2>
          </div>
        </div>

        <div class="observation-grid">
          <article class="observation-card">
            <p class="metric-label">SOLAR FLARES</p>
            <p class="observation-value">13</p>
            <p class="observation-description">
              Events detected in the assessment window
            </p>
          </article>

          <article class="observation-card">
            <p class="metric-label">CORONAL MASS EJECTIONS</p>
            <p class="observation-value">113</p>
            <p class="observation-description">
              Events detected in the assessment window
            </p>
          </article>

          <article class="observation-card">
            <p class="metric-label">PEAK FLARE</p>
            <p class="observation-value">M3.6</p>
            <p class="observation-description">
              Strongest recorded solar flare
            </p>
          </article>

          <article class="observation-card">
            <p class="metric-label">PRIMARY CME SPEED</p>
            <p class="observation-value">1549</p>
            <p class="observation-description">
              km/s · Earth-directed
            </p>
          </article>
        </div>
      </section>

      <section class="dashboard-section">
        <div class="section-heading">
          <div>
            <p class="section-label">RISK TRENDS</p>
            <h2>Recent assessments</h2>
          </div>

          <span class="section-meta">Last 7 days</span>
        </div>

        <div class="chart-placeholder">
          <span>Trend chart will go here</span>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>
        Space Weather Risk Monitor · Data sourced from NASA DONKI
      </p>
    </footer>
  </div>
</template>