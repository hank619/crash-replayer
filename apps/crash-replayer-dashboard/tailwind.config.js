/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-09 15:22:52
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
const { COLORS, DEFAULT_COLOR_PLATE } = require('./src/constants/theme');

module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    colors: getTailWindColors(),
  },
  corePlugins: {
    preflight: false,
  },
  important: true,
};

function getTailWindColors() {
  const colors = {};
  Object.values(COLORS).forEach((value) => {
    colors[
      value
    ] = `var(--color-${value}, ${DEFAULT_COLOR_PLATE[value]} / <alpha-value>)`;
  });
  colors.transparent = '#00000000';
  return colors;
}
