module.exports = function (api) {
  api.cache(false);
  return {
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '../../.env',
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
