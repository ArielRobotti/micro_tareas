/// <reference types="vite/client" />
declare module '*.scss';

declare module '@/*' {
  const path: string;
  export default path;
}