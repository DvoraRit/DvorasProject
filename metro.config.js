// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = (config.watchFolders || []).filter(
  folder => !folder.includes('.gradle')
);

config.resolver.blockList = [
  /node_modules\/.*\/android\/.*\.gradle\/.*/,
  /android\/.*\.gradle\/.*/,
];

module.exports = config;
