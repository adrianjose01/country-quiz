// Recognize all CSS files as module imports.
declare module "*.css" {}
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
