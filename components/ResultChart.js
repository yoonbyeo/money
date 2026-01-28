class ResultChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.chart = null; // To store the Chart.js instance
  }

  static get observedAttributes() {
    return ['breakdown'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'breakdown' && oldValue !== newValue) {
      this.renderChart(JSON.parse(newValue));
    }
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 400px; /* Adjust as needed */
          margin: 0 auto;
        }
        canvas {
          width: 100% !important;
          height: auto !important;
        }
      </style>
      <canvas></canvas>
    `;

    const breakdownData = this.getAttribute('breakdown');
    if (breakdownData) {
      this.renderChart(JSON.parse(breakdownData));
    }
  }

  renderChart(breakdown) {
    const canvas = this.shadowRoot.querySelector('canvas');
    if (!canvas) return;

    const labels = breakdown.map(item => item.label);
    const data = breakdown.map(item => item.strength);

    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart instance if any
    }

    this.chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '성향 강도',
          data: data,
          backgroundColor: 'rgba(239, 111, 59, 0.4)', // --accent with opacity
          borderColor: 'rgba(239, 111, 59, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(239, 111, 59, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(239, 111, 59, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(255, 255, 255, 0.2)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            pointLabels: {
              color: '#fff',
              font: {
                size: 12
              }
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              display: false // Hide numerical labels for cleaner look
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '%';
              }
            }
          }
        }
      }
    });
  }
}

try {
  customElements.define('result-chart', ResultChart);
} catch (e) {
  console.error("Error defining result-chart:", e);
}
