export default {
  mount: {
    public: '/',
    src: '/dist',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  devOptions: {
    hmr: true,
    open: 'default',
    output: 'stream',
  },
  buildOptions: {
    sourcemap: true,
  },
};
