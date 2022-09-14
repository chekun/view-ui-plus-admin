import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

const config = ({ mode }) => {
  const isProd = mode === 'production'
  const envPrefix = 'APP_'
  const { APP_TITLE = '', APP_DEV_SERVER = '' } = loadEnv(mode, process.cwd(), envPrefix)
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: isProd,
        inject: {
          data: {
            title: APP_TITLE,
          },
        }
      })
    ],
    build: {
      target: 'es2015',
      outDir: path.resolve(__dirname, 'dist'),
      assetsDir: 'assets',
      assetsInlineLimit: 8192,
      sourcemap: !isProd,
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          // assetFileNames: "assets/[name].[hash].[ext]",
        }
      }
    },
    envPrefix,
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
        { find: /^_c\//, replacement: `${path.resolve(__dirname, 'src/components')}/` },
        { find: /^~/, replacement: '' }
      ],
      extensions: ['.js', '.mjs', '.vue', '.json', '.less', '.css']
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/styles/variable.less')}";`
        }
      }
    },
    server: {
      open: APP_DEV_SERVER !== '',
      proxy: {
        '/api': {
          target: APP_DEV_SERVER,
          rewrite: path => path.replace(/^\/api/, ''),
          secure: false,
          changeOrigin: true
        }
      }
    },
    preview: {
      port: 5000
    }
  }
}

export default defineConfig(config)
