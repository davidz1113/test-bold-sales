# AngularBoldTest

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.0.5.

## Tecnologías Utilizadas

- **Angular**: Framework principal para el desarrollo de la aplicación.
- **TypeScript**: Lenguaje de programación utilizado.
- **SCSS**: Preprocesador CSS para estilos.
- **Karma**: Herramienta de pruebas unitarias.
- **Jest**: Framework de pruebas unitarias. (se cambio Jasmine por Jest)
- **NgRx**: Manejo del estado de la aplicación.
- **Conventional Commits**: Convenciones para mensajes de commit.

## Funcionalidades Adicionales

- **Skeletons**: Implementación de skeletons para mejorar la experiencia de usuario durante la carga de datos.
- **Paginación**: La aplicación incluye paginación para manejar grandes conjuntos de datos.
- **Filtros**: Filtros avanzados para buscar y filtrar datos.
- **Filtrar por monto**: Se puede filtrar por monto de manera Ascendete y Descendente.
- **Persistencia en Local Storage**: Los filtros se persisten en el local storage para mantener el estado cuando se recarga la página.
- **Pruebas unitarias con Jest**: Se realizan algunas pruebas unitarias.

## Servidor de Desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquiera de los archivos fuente.

## Servidor de Producción

El proyecto fue desplegado en la nube con Vercel: https://bold-sales-alpha.vercel.app/home-sales

Vista previa de la aplicación

![captura](https://raw.githubusercontent.com/davidz1113/test-bold-sales/master/src/assets/screenshoots/home-page.png)


## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de Pruebas Unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de Jest.

Ejecucion de pruebas unitarias:

![captura](https://raw.githubusercontent.com/davidz1113/test-bold-sales/master/src/assets/screenshoots/coverage.png)


## Commits Convencionales

Este proyecto sigue las convenciones de [Conventional Commits](https://www.conventionalcommits.org/) para mensajes de commit.

## Estructura de Carpetas

La estructura de carpetas sigue el estandar de arquitectura hexagonal

```plaintext
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   └── models/
│   ├── features/
│   │   ├── sales/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── store/
│   ├── shared/
│   │   ├── components/
│   │   └── utils/
│   └── app.module.ts
├── assets/
│   ├── images/
│   └── styles/
├── environments/
└── index.html