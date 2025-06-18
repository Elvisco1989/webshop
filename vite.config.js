import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     outDir: path.resolve(__dirname, '../Hoved-Opgave-Datamatiker/wwwroot'),
//     emptyOutDir: true,
//   },
//   base: '/',
// })


