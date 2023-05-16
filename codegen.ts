import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api-mumbai.lens.dev/',
  documents: './src/graphql/*.graphql',
  generates: {
    './src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
        'fragment-matcher',
      ],
      config: {
        dedupeFragments: true,
        fetcher: { func: './auth-fetcher#fetcher', isReactHook: false },
      },
    },
  },
};

export default config;
