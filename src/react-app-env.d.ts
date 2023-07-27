/// <reference types="react-scripts" />
declare module '*.png';
declare module '*.svg';
declare module '*.gif';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_BASE_API: string;
  }
}
