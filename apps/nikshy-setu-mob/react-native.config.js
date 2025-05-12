// react-native.config.js
module.exports = {
  assets: ['./src/assets/fonts'],
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['Video'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['Video'],
    },
  },
};
