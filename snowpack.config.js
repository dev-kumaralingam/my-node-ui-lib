export default {
  mount: {
    public: '/',
    src: '/dist',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
    sourcemap: true,
  },
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  alias: {
    '@components': './src/components',
    '@utils': './src/utils',
  },
  devOptions: {
    port: 8080,
    open: 'default',  // Automatically open in the default browser
    hmr: true,        // Enable Hot Module Replacement for faster development
  },
};
