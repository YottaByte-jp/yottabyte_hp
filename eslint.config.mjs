import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTypeScriptConfig from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [...nextConfig, ...nextTypeScriptConfig, prettierConfig];

export default eslintConfig;
