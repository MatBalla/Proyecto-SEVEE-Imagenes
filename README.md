# Guía de Configuración de Candidatos (`CandidatosData.js`)

PASO 1:
IR AL REPOSITORIO DE GITHUB Y HACER UN FORK al proyecto 


Tutorial de como crear, estructurar y llenar el archivo `CandidatosData.js` de cualquier año electoral. También explica cómo estructurar y referenciar las imágenes organizadas por años.

---

## 1. Organización Física de Imágenes por Años

Para mantener la limpieza del proyecto, la estructura recomendada para almacenar imágenes organizadas por año dentro de `src/assets/img/` es la siguiente:
```text
src/assets/img/
├── imagenes_presidentes/
│   ├── 1996/
│   │   ├── candidato_001.png
│   │   └── ...
│   └── 2023/
│       ├── candidato_001.png
│       └── ...
└── logos_partidos_politicos/
    ├── 1996/
    │   ├── PSC.png
    │   └── ...
    └── 2023/
        ├── ADN.png
        └── ...
```

---

## 2. Anatomía de `CandidatosData.js`
CADA AÑO TIENE ESTA PLANTILLA PARA LLENAR
```javascript
// ============================================================
// ARCHIVO: src/assets/data/YYYY/CandidatosData.js
// ============================================================

const imageModules = import.meta.glob('../../img/**/*.{png,jpg,jpeg,svg}', {
  eager: false
});

const img = (path) => {
  const fullPath = `../../img/${path}`;
  const loader = imageModules[fullPath];

  if (loader) {
    return async () => {
      const mod = await loader();
      return mod.default;
    };
  }

  console.warn(`⚠️ Imagen no encontrada en glob: ${path}`);
  return async () => "";
};

// ============================================================
// 1. LEYENDA DE COLORES
// ============================================================

export const dessertsData = [];

// ============================================================
// 2. DICCIONARIO DE CANDIDATOS
// ============================================================

export const candidatoData = [];
```

El archivo `CandidatosData.js` de cada año (ubicado en `src/assets/data/<AÑO>/CandidatosData.js`) consta de tres secciones principales:

### Sección A: Mapeador Asíncrono de Imágenes (Vite Glob)
Esta funcion es obligatoria, no borrar


```javascript
// Escanea todos los archivos de imagen de la carpeta 'img/' recursivamente
const imageModules = import.meta.glob("../../img/**/*.{png,jpg,jpeg,svg}", { eager: false });

// Helper que devuelve la función de carga
const img = (path) => {
  const fullPath = `../../img/${path}`;
  const loader = imageModules[fullPath];

  if (loader) {
    return async () => {
      const mod = await loader();
      return mod.default;
    };
  }
  return async () => ""; // Retorno vacío si no se encuentra el archivo
};
```



### Sección B: Diccionario de Candidatos (`candidatoData`)
Es un arreglo de objetos que define la información técnica, nombres, colores base y resolvedores de imágenes para cada candidato de la elección.

#### Campos de cada objeto candidato:
* `partido` *(Number)*: Identificador único entero del candidato en este año. Vincula al candidato con sus colores `p<ID>` definidos en `dessertsData`.
* `nombre` *(String)*: Nombre del candidato en mayúsculas (ej: `"LUISA GONZALEZ"`).
* `url` *(Function)*: Llamada a la función `img()` apuntando a la subcarpeta del año correspondiente (ej: `img("imagenes_presidentes/2023/candidato_001.png")`).
* `logo` *(Function)*: Llamada a la función `img()` apuntando al logotipo del partido político en la subcarpeta del año (ej: `img("logos_partidos_politicos/2023/ADN.png")`).
* `color` *(String)*: Color principal del partido político en formato Hexadecimal. Se utiliza para pintar los gráficos de barra y mapas nacionales. **Nota de diseño:** Para definir este color, se debe investigar previamente la paleta de colores oficial del partido político correspondiente (revisando sus logotipos oficiales o manuales de marca) para garantizar la coherencia y fidelidad de la interfaz.
* `nombrePartido` *(String)*: Nombre o sigla del partido político que aparecerá en los desplegables de la interfaz.
* `json` *(String)*: **Muy Importante.** Debe coincidir exactamente con la clave de este partido que viene en el archivo JSON de resultados oficiales (dentro del objeto `resultados` de cada provincia/cantón).

#### Ejemplo de candidato convencional:
```javascript
  {
    partido: 2,
    nombre: "DANIEL NOBOA AZIN",
    url: img("imagenes_presidentes/2023/candidato_002.png"),
    logo: img("logos_partidos_politicos/2023/ADN.png"),
    color: "#8A2BE2", // color principal (investigar paleta de color oficial del partido)
    nombrePartido: "ADN",
    json: "ADN",
  }
```

---

## 3. Casos Especiales al Llenar Datos

### Caso Especial 1: Alias para Segunda Vuelta o Nombres Cambiantes
A veces, en los datos oficiales (archivos JSON), un mismo candidato o partido se registra con siglas ligeramente diferentes en la primera y segunda vuelta (por ejemplo, `"ADN"` en primera vuelta y `"PID/MOVER"` en la segunda).

Para evitar que los datos se queden sin renderizar, debes crear una **entrada duplicada** del candidato en el diccionario, cambiando únicamente las propiedades `nombrePartido` y `json` para que coincidan con la variante del JSON:

```javascript
  // Entrada 1: Primera Vuelta (ADN)
  {
    partido: 2,
    nombre: "DANIEL NOBOA AZIN",
    url: img("imagenes_presidentes/2023/candidato_002.png"),
    logo: img("logos_partidos_politicos/2023/ADN.png"),
    color: "#8A2BE2", // color principal (investigar paleta de color oficial del partido)
    nombrePartido: "ADN",
    json: "ADN",
  },
  // Entrada 2: Segunda Vuelta (PID/MOVER)
  {
    partido: 9, // ID diferente
    nombre: "DANIEL NOBOA AZIN",
    url: img("imagenes_presidentes/2023/candidato_002.png"), // Reutiliza la misma imagen
    logo: img("logos_partidos_politicos/2023/ADN.png"), // Reutiliza el mismo logo
    color: "#8A2BE2", // color principal (investigar paleta de color oficial del partido)
    nombrePartido: "PID/MOVER", // Nombre alterno en los JSON de segunda vuelta
    json: "PID/MOVER", // Mapeo de clave exacta del JSON
  }
```
*Nota: Recuerda añadir los colores correspondientes para `p9` en la sección `dessertsData`*.

### Caso Especial 2: Registro de Empate
Para que los mapas puedan pintar correctamente zonas donde hay un empate entre dos candidatos, debes definir un candidato ficticio llamado `"EMPATE"` al final de la lista con color gris (`#808080`) y sin imágenes:

```javascript
  {
    partido: 10,
    nombre: "EMPATE",
    url: "",
    logo: "",
    color: "#808080",
    nombrePartido: "EMPATE",
    json: "EMPATE",
  }
```

### Caso Especial 3: Años sin JSONs de Resultados Oficiales (Copias o Borradores)
Hay ciertos años (como `1992`, `1998` o `2009`) cuyos archivos JSON de resultados electorales aún no han sido cargados o procesados oficialmente y a veces son meras copias de la estructura de otros años.

Si estás configurando candidatos para un año que todavía **no cuenta con sus JSONs reales**:
1. **Conservar el Nombre Real del Candidato:** Se debe poner el nombre real del candidato en la propiedad `nombre` para identificar plenamente a quién pertenece el registro (ej: `nombre: "DANIEL NOBOA AZIN"`).
2. **Indicar el Partido en un Comentario:** En la propiedad `nombrePartido`, escribe `"COMPLETAR"` y añade al final un comentario especificando a qué partido pertenece (ej: `// este candidato pertenece al partido ADN`).
3. **Mapeo JSON como Completar:** En la propiedad `json`, coloca `"COMPLETAR"` para indicar que está pendiente mapear la clave exacta una vez que los archivos oficiales estén listos.

#### Ejemplo de configuración pendiente:
```javascript
  {
    partido: 2,
    nombre: "DANIEL NOBOA AZIN", // Nombre real del candidato
    url: img("imagenes_presidentes/2026/candidato_002.png"),
    logo: img("logos_partidos_politicos/2026/partido_002.png"),
    color: "#8A2BE2", // color principal (investigar paleta de color oficial del partido)
    nombrePartido: "COMPLETAR", // este candidato pertenece al partido ADN
    json: "COMPLETAR",
  }
```
## Actividad: Organización de imágenes de candidatos y partidos políticos para estudiantes que les toco ordenar 1996 y 2023

En el PDF adjunto encontrarán las imágenes actuales de candidatos y partidos políticos correspondientes a los años electorales 1996 y 2023.

### Tareas

1. Revisar el PDF y localizar las imágenes asignadas.
2. Si te tocó un candidato o partido de 1996 o 2023, verifica primero si la imagen ya existe en el proyecto.
3. Si la imagen existe, muévela a la carpeta correspondiente de su año electoral.

### Ejemplo

El candidato **Daniel Noboa Azín** ya tiene asociado el logo de su partido:

```txt
logos_partidos_politicos/ADN.png
```

Tu tarea es:

* Renombrar la imagen siguiendo el formato:

```txt
nombre_partido_año_electoral.png
```

* Mover la imagen a la carpeta correspondiente del año electoral.
* Actualizar la ruta (URL) correspondiente en el archivo `CandidatosData.js` de ese año.
ejemplo: logos_partidos_politicos/2023/ADN_2023.png
deberían actualizar en el archivo: logo: img("logos_partidos_politicos/2023/ADN_2023.png"),


### Resultado esperado

Al finalizar, cada año electoral deberá contener únicamente las imágenes de sus candidatos y partidos, correctamente nombradas y con sus rutas actualizadas en `CandidatosData.js`.

---

CADA PERSONA DEBE AGREGAR LA LEYENDA DE COLORES CORRESPONDIENTE A SU CANDIDATO MAS DE ESTO EN LA SECCIÓN C

---
### Sección C: Leyenda de Colores (`dessertsData`)
Define la intensidad de los colores para pintar los degradados en los mapas interactivos de votantes en el exterior (mapas de calor o coropletas).

#### Reglas de Llenado:
1. **Tres niveles fijos:** Debe contener exactamente 3 objetos (Nivel Bajo, Nivel Medio, Nivel Alto).
2. **Mapeo de propiedades (`p1`, `p2`...):** El número de propiedad (ej. `p1`, `p2`) corresponde exactamente al valor entero del campo `partido` de cada candidato definido en la siguiente sección.
3. **Escala de Intensidad (Degradados del Partido):** Para cada partido, define tres tonalidades del mismo color, yendo de más claro (Nivel Bajo) a más oscuro (Nivel Alto):
   * **Nivel Alto (Tono Oscuro):** Debe ser **exactamente el mismo color** que tiene asignado el candidato en su propiedad `color` dentro del diccionario de candidatos (el tono más fuerte del partido).
   * **Nivel Medio (Tono Medio) y Nivel Bajo (Tono Claro):** Deben ser variaciones más claras, pasteles o menos saturadas de ese mismo color principal.

#### Ejemplo de Estructura y Mapeo:
Si tienes al Candidato 1 (Azul Oscuro, `color: "#08519c"`) y al Candidato 2 (Naranja Oscuro, `color: "#a63603"`):

```javascript
export const dessertsData = [
  {
    porcentaje: "Nivel Bajo",
    p1: "#bdd7e7", // Azul muy claro (para zonas con pocos votos de Partido 1)
    p2: "#fdbe85", // Naranja muy claro (para zonas con pocos votos de Partido 2)
  },
  {
    porcentaje: "Nivel Medio",
    p1: "#6baed6", // Azul de intensidad media (Partido 1)
    p2: "#fd8d3c", // Naranja de intensidad media (Partido 2)
  },
  {
    porcentaje: "Nivel Alto",
    p1: "#08519c", // Azul Oscuro Original (Mismo valor de color del Partido 1)
    p2: "#a63603", // Naranja Oscuro Original (Mismo valor de color del Partido 2)
  },
];
```

---

## 4. Resumen de Pasos para un Nuevo Año (Resumen de Trabajo)

1. Mueve/crea las carpetas de las fotos en `src/assets/img/imagenes_presidentes/<AÑO>/` e introduce las imágenes.
2. Mueve/crea las carpetas de los logos en `src/assets/img/logos_partidos_politicos/<AÑO>/` e introduce las imágenes.
3. Ir a `src/assets/data/<AÑO>/CandidatosData.js`.
4. Define el ayudante `img` y asegúrate de que use las rutas relativas correctas (`../../img/...`).
5. Genera la escala de 3 niveles de degradados de color en `dessertsData`, uno por partido en `p1`, `p2`, etc.
6. Agrega el listado de candidatos en `candidatoData` vinculando sus fotos usando `img("imagenes_presidentes/<AÑO>/nombre.png")` y sus logos con `img("logos_partidos_politicos/<AÑO>/logo.png")`.
