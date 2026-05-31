# 🔒 ERP Seguridad LTDA

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23980279)

**Evaluación Sumativa 2 — Taller de Aseguramiento de la Calidad**  
Grupo: `04-evs2-grupo-acubririfdep`

---

## 👥 Integrantes

| Nombre | Rol en el proyecto |
|---|---|
| José Acuña | Líder QA |
| Francisco Briones | Product Owner |
| Gabriel Del Pino | Analista de pruebas / Dev |
| Alan Rifo | Dev / Responsable GitHub |

---

## 📁 Estructura del proyecto

```
erp-seguridad-ltda/
├── index.html                          ← Página principal
├── styles.css                          ← Estilos globales
├── docs/
│   └── Plan_Calidad_ERP_Seguridad_LTDA.docx
└── modulos/
    ├── rrss/
    │   ├── ERPS 1/   → Ficha de empleado
    │   ├── ERPS 3/   → Contratos y finiquitos
    │   └── ERPS 4/   → Licencias médicas
    ├── inventario/
    │   ├── ERPS 2/   → Remuneraciones
    │   ├── ERPS 10/  → Productos
    │   └── ERPS 11/  → Bodegas
    ├── portal empleado/
    │   ├── ERPS 7/   → Login y dashboard del empleado
    │   └── ERPS 8/   → Liquidaciones de sueldo
    └── seguridad y administracion/
        └── ERPS 17/  → Roles y permisos
```

---

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd erp-seguridad-ltda
   ```

2. Abrir `index.html` directamente en el navegador.  
   No requiere servidor ni dependencias adicionales.

> También puedes abrirlo en GitHub Codespaces usando el botón al inicio de este README.

---

## 🧪 Usuarios de prueba

Estos usuarios están disponibles para probar el sistema desde el módulo **Portal del Empleado (ERPS-07)**.

| Rol | Correo | Contraseña | Acceso |
|---|---|---|---|
| Administrador | `admin@seguridad.cl` | `admin2025` | Todos los módulos |
| RRHH | `rrhh@seguridad.cl` | `rrhh2025` | RRHH y portal empleado |
| Bodeguero | `bodeguero@seguridad.cl` | `bodeguero123` | Inventario y bodegas |
| Empleado | `gabriel@seguridad.cl` | `empleado123` | Portal del empleado |

> ⚠️ Estas credenciales son solo para propósitos de evaluación y demostración.

---

## 📋 Módulos del Sprint 1

| ID | Módulo | Responsable | Estado |
|---|---|---|---|
| ERPS-01 | Ficha de empleado | José Acuña | ✅ Completado |
| ERPS-02 | Remuneraciones | Gabriel Del Pino | ✅ Completado |
| ERPS-03 | Contratos y finiquitos | Alan Rifo | ✅ Completado |
| ERPS-04 | Licencias médicas | José Acuña | ✅ Completado |
| ERPS-07 | Login portal empleado | Francisco Briones | ✅ Completado |
| ERPS-08 | Liquidaciones de sueldo | Francisco Briones | ✅ Completado |
| ERPS-10 | Ficha de productos | Gabriel Del Pino | ✅ Completado |
| ERPS-11 | Gestión de bodegas | Alan Rifo | ✅ Completado |
| ERPS-17 | Roles y permisos | Alan Rifo | ✅ Completado |

---

## 🌿 Estrategia de ramas

```
main        ← código estable para entrega
develop     ← integración entre sprints
feature/ERPS-XX-descripcion  ← una rama por historia de usuario
```

---

## 📄 Documentación

El Plan de Aseguramiento de la Calidad (PAC) se encuentra en:

```
docs/Plan_Calidad_ERP_Seguridad_LTDA.docx
```

Incluye modelos ISO/IEC 25010, IEEE 730, CMMI, métricas de calidad y proceso de control de cambios.

---

*© 2025 Seguridad LTDA — Sistema ERP Web*
