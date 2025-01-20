```
src/
├── modules/
│   ├── users/
│       ├── repositories/
│       │   ├── UserRepository.ts
│       │   └── ...
│       ├── services/
│       │   ├── UserService.ts
│       │   └── ...
│       ├── ui/
│           ├── components/
│           │   ├── UserForm.tsx
│           │   └── ...
│           └── pages/
│               ├── UsersPage.tsx
│               └── ...
├── shared/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── ...
│   ├── utils/
│   │   ├── api.ts
│   │   └── ...
│   ├── types/
│   │   ├── common.ts
│   │   └── ...
│   └── assets/
│       ├── images/
│       └── styles/
│           ├── global.css
│           └── ...
├── store/
│   ├── rootReducer.ts
│   ├── store.ts
│   └── slices/
│       ├── userSlice.ts
│       └── orderSlice.ts
├── config/
│   ├── routes.ts
│   └── ...
|
|__ docs/
|
|
|__ scripts/
|
|
└── App.tsx
```

1. modules/: Contiene los diferentes módulos de la aplicación.
    - repositories/: Aquí se encuentran los archivos relacionados con la interacción con los datos. Estos se encargan de la lógica de acceso a la API.
    - services/: Contiene los archivos de lógica de negocio. Estos se encargan de implementar la funcionalidad principal del módulo, como crear, actualizar y eliminar usuarios.
    - ui/: Esta carpeta alberga los componentes y páginas de la interfaz de usuario relacionados con el módulo de usuarios.

2. shared/: Contiene elementos comunes y reutilizables en toda la aplicación.
    - components/: Aquí se encuentran los componentes compartidos, como el Layout.
    - hooks/: Contiene hooks personalizados que pueden ser utilizados en toda la aplicación, como el useAuth.
    - utils/: Incluye funciones y herramientas de uso general, como api.ts.
    - types/: Alberga los tipos y interfaces comunes, como common.ts.
    - assets/: Contiene los archivos de assets, como imágenes y estilos globales.


3. store/: Esta carpeta maneja la gestión del estado global de la aplicación utilizando la zustand.


4. config/: Aquí se encuentran los archivos de configuración de la aplicación, como routes.ts.

5. docs/: Archivos internos, como pdf, rar, etc

6. scripts/: Permitirá automatizar tareas comunes, como compilación, despliegue, etc.