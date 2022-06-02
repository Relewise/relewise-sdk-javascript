declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        RELEWISE_API_KEY: string;
        RELEWISE_DATASET_ID: string;
      }
    }
  }
  
  export {}