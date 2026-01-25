import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        // Support imports like `@/src/format` (tsconfig.json maps `@/*` -> `./*`).
        // Use a regex so `@/something` resolves to `<projectRoot>/something`.
        alias: [
            { find: /^@\/(.*)/, replacement: path.resolve(__dirname, '$1') }
        ]
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'EthReactBigCalendarLocalizer',
            // Produce both ESM and CJS builds
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`
        },
        outDir: 'dist',
        rollupOptions: {
            // externalize peer deps that should not be bundled
            external: ['react', 'react-dom', 'react-big-calendar', 'kenat'],
            output: {
                // preserve global names for UMD builds (not used here but harmless)
                globals: {
                    react: 'React'
                }
            }
        }
    }
})
