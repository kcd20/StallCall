// Lets TypeScript understand `import styles from './X.module.css'`.
// Vite turns each class in the file into a unique, scoped class name.
declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
