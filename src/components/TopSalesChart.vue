<template>
  <div v-if="chartData?.value?.labels?.length">
    <Bar :chart-data="chartData.value" :chart-options="chartOptions" />
  </div>
  <div v-else>
    Loading chart...
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Top Selling Products'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Quantity Sold'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Products'
      }
    }
  }
}

// Update chartData when products change
watch(
  () => props.products,
  (newProducts) => {
    if (!newProducts?.length) {
      chartData.value = { labels: [], datasets: [] }
      return
    }

    chartData.value = {
      labels: newProducts.map(p => p.name),
      datasets: [
        {
          label: 'Quantity Sold',
          backgroundColor: '#42b983',
          data: newProducts.map(p => p.quantitySold ?? 0)
        }
      ]
    }
  },
  { immediate: true }
)
</script>

<style scoped>
div {
  height: 400px;
  max-width: 700px;
}
</style>
