import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to Snowplow Micro
      '/com.snowplowanalytics.snowplow': {
        target: 'http://localhost:9090', // Your Snowplow Micro URL
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
