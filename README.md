
# Frontend - Treball Projecte 2Daw

Este repositorio contiene el código frontend del proyecto, construido con React y Vite.

## Stack Tecnológico Principal

- **Framework:** React
- **Bundler:** Vite
- **Estilos:** Tailwind CSS (No aparece en esta plantilla por defecto, pero se ha añadido al proyecto)

---

## Documentación de la Plantilla Base (React + Vite)

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Babel](https://babeljs.io/) (o [oxc](https://oxc.rs) cuando se usa en [rolldown-vite](https://vite.dev/guide/rolldown)) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://githubs.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh.

## React Compiler

El React Compiler está habilitado en esta plantilla. Consulta [esta documentación](https://react.dev/learn/react-compiler) para más información.

Nota: Esto impactará el rendimiento de desarrollo y construcción (build) de Vite.

## Expansión de la configuración de ESLint

Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript con reglas de *lint* que tengan conciencia de tipos activadas. Echa un vistazo a la [plantilla TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para obtener información sobre cómo integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.