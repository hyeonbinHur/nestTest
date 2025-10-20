import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Build time measurement plugin
function buildTimePlugin(): Plugin {
  let startTime: number;

  return {
    name: 'build-time-measurement',
    buildStart() {
      startTime = performance.now();
      console.log('\n========================================');
      console.log('Build started at:', new Date().toLocaleString('ko-KR'));
      console.log('========================================\n');
    },
    buildEnd() {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const seconds = (duration / 1000).toFixed(3);

      console.log('\n========================================');
      console.log('Build completed at:', new Date().toLocaleString('ko-KR'));
      console.log('Total build time:', seconds, 'seconds');
      console.log('Total build time:', duration.toFixed(2), 'milliseconds');
      console.log('========================================\n');
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), buildTimePlugin()],
})
