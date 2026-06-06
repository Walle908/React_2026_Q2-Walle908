export default {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'vitest related --run'],
  'src/**/*.{css,scss,json,md}': ['prettier --write'],
};
