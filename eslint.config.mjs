import next from 'eslint-config-next';

const config = [
  ...next,
  { ignores: ['out/**', '.next/**', 'public/**', 'assets-src/**', '.taste-skill/**'] },
];

export default config;
