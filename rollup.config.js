// rollup.config.js
import json from '@rollup/plugin-json';

export default {
    input: './src/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'esm',
    },
    plugins: [json()],
};
