window.gFsRoot = module.exports = {
  bin: {
    metal: {
      require: () => require('./bin/metal'),
    },

    term: {
      require: () => require('./bin/term'),
    },
  },
};
