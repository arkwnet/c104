import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import packageJson from './package.json'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [vue()],
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    },
    server: {
      proxy: {
        '^/api': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '/')
        }
      }
    }
  })
}
