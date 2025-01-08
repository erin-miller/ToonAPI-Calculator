import json from '@rollup/plugin-json';

export default {
  input: 'index.js',
  output: {
    dir: './dist',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    json(),
  ],
};
