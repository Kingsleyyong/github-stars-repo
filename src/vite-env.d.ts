/// <reference types="vite/client" />
declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}