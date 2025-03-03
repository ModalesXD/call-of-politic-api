// eslint.config.mjs
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'], // Ignorar el archivo de configuración
  },
  eslint.configs.recommended, // Reglas recomendadas de ESLint
  ...tseslint.configs.recommendedTypeChecked, // Reglas recomendadas para TypeScript
  eslintPluginPrettierRecommended, // Integrar las reglas de Prettier
  {
    languageOptions: {
      globals: {
        ...globals.node,  // Añadir los globals para Node.js
        ...globals.jest,  // Añadir los globals para Jest
      },
      ecmaVersion: 2020,  // Establecer la versión de ECMAScript
      sourceType: 'module',  // Usar módulos ES
      parserOptions: {
        project: './tsconfig.json',  // Asegúrate de apuntar a tu tsconfig
        tsconfigRootDir: __dirname,  // Definir el directorio raíz para TS
      },
    },
  },
  {
    rules: {
      // Desactivar reglas específicas
      '@typescript-eslint/no-explicit-any': 'off',  // Permitir 'any' en TypeScript
      '@typescript-eslint/no-floating-promises': 'warn',  // Advertir sobre promesas sin manejar
      '@typescript-eslint/no-unsafe-argument': 'warn',  // Advertir sobre argumentos inseguros
      'no-trailing-spaces': 'off',  // Desactivar advertencias sobre espacios al final de las líneas
      'no-multi-spaces': 'off',  // Desactivar advertencias sobre múltiples espacios
      'prettier/prettier': [
        'error',
        {
          'singleQuote': true,  // Usar comillas simples
          'endOfLine': 'auto',  // Manejar fin de línea según el sistema operativo
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',  // Desactivar advertencias sobre tipos explícitos en las fronteras del módulo
      'no-unused-vars': 'warn',  // Advertir sobre variables no utilizadas
    },
  },
  {
    ignorePatterns: ['node_modules/', 'dist/', 'eslint.config.mjs'],  // Ignorar directorios y archivos específicos
  }
);
