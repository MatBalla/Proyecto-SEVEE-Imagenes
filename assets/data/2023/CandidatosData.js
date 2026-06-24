// ============================================================
// ARCHIVO: src/assets/data/2023/CandidatosData.js
// DESCRIPCIÓN: Configuración de candidatos, colores y logos para 2023
// ============================================================

// Importación glob de TODAS las imágenes (Lazy Loading)
const imageModules = import.meta.glob("../../img/**/*.{png,jpg,jpeg,svg}", { eager: false });

// Helper para resolver imágenes
const img = (path) => {
  const fullPath = `../../img/${path}`;
  const loader = imageModules[fullPath];

  if (loader) {
    return async () => {
      const mod = await loader();
      return mod.default;
    };
  }
  // Fallback si no encuentra la imagen
  return async () => "";
};

// ============================================================
// 1. LEYENDA DE COLORES (Escala de intensidad para mapas de calor si se usa)
// ============================================================
export const dessertsData = [
  {
    porcentaje: "Nivel Bajo",
    p1: "#a4e0ee",
    p2: "#D8B4FE",
    p3: "#FDFD96",
    p4: "#FFF0E6",
    p5: "#B1E1E7",
    p6: "#F4C2D7", // Tono pastel RETO
    p7: "#B0C4DE",
    p8: "#ccffeb",
  },
  {
    porcentaje: "Nivel Medio",
    p1: "#45b5ce",
    p2: "#A855F7",
    p3: "#CCCC00",
    p4: "#FF9457",
    p5: "#64C3CE",
    p6: "#D81B60", // Tono medio RETO
    p7: "#4682B4"
    p8: "#80fcc6",
  },
  {
    porcentaje: "Nivel Alto",
    p1: "#12a2c2",
    p2: "#8A2BE2",
    p3: "#FFFF00",
    p4: "#FF5500",
    p5: "#35A0AC",
    p6: "#E0008A", // Tono oscuro/exacto RETO
    p7: "#00008B"
    p8: "#00FA9A",
  },
];

// ============================================================
// 2. DICCIONARIO DE CANDIDATOS 2023
// ============================================================

export const candidatoData = [
  {
    partido: 1,
    nombre: "LUISA GONZALEZ",
    url: img("imagenes_presidentes/2023/LUISA_GONZALEZ_2023.png"), // Placeholder
    logo: img("logos_partidos_politicos/2023/RC_2023.png"), // O Revolución Ciudadana
    color: "#12a2c2", // Celeste RC
    nombrePartido: "RC",
    json: "RC",
  },
  {
    partido: 2,
    nombre: "DANIEL NOBOA AZIN",
    url: img("imagenes_presidentes/2023/DANIELNOBOA_2023.png"),
    logo: img("logos_partidos_politicos/2023/ADN_2023.png"), // Asumiendo que existe o se usará placeholder
    color: "#8A2BE2", // Violeta/Morado ADN
    nombrePartido: "ADN",
    json: "ADN",
  },
  {
    partido: 3,
    nombre: "JAN TOPIC",
    url: img("imagenes_presidentes/2023/JAN_TOPIC_2023.png"),
    logo: img("logos_partidos_politicos/2023/PSC_2023.png"),
    color: "#FFFF00", // Amarillo PSC (o rojo secundario)
    nombrePartido: "PSC/PSP/CD",
    json: "PSC/PSP/CD",
  },
  {
    partido: 4,
    nombre: "OTTO SONNENHOLZNER",
    url: img("imagenes_presidentes/2023/OTTOSONNENHOLZNER_2023.png"),
    logo: img("logos_partidos_politicos/2023/ACTUEMOS_2023.png"),
    color: "#FF5500", // NaranjaPartidoPolitico
    nombrePartido: "AVANZA/SUMA",
    json: "AVANZA/SUMA",
  },
  {
    partido: 5,
    nombre: "YAKU PEREZ",
    url: img("imagenes_presidentes/2023/YAKUPEREZ_2023.png"),
    logo: img("logos_partidos_politicos/2023/CLARO_QUE_SE_PUEDE_2023.png"),
    color: "#35A0AC",
    nombrePartido: "UP/PSE/DSI",
    json: "UP/PSE/DSI",
  },
  {
    partido: 6, // Lista de Xavier Hervas (Movimiento RETO)
    nombre: "XAVIER HERVAS",
    url: img("imagenes_presidentes/2023/XAVIER HERVAS_2023.png"),
    logo: img("logos_partidos_politicos/2023/MOVIMIENTO DEMOCRACIA_2023.png"),
    color: "#E0008A", // Color principal oficial del Movimiento RETO
    nombrePartido: "RETO", // este candidato pertenece al Movimiento RETO
    json: "RETO",
  },
  {
    partido: 7,
    nombre: "FERNANDO VILLAVICENCIO",
    url: img("imagenes_presidentes/2023/FERNANDO_VILLAVICENCIO_2023.png"),
    logo: img("logos_partidos_politicos/2023/CONSTRUYE_2023.png"),
    color: "#00008B", // Azul oscuro
    nombrePartido: "CONSTRUYE",
    json: "CONSTRUYE",
  },
  {
    partido: 8,
    nombre: "BOLIVAR ARMIJOS",
    url: img("imagenes_presidentes/2023/BOLIVARARMIJOS_2023.png"),
    logo: img("logos_partidos_politicos/2023/AMIGO_2023.png"),
    color: "#00FA9A", // Verde claro
    nombrePartido: "AMIGO",
    json: "AMIGO",
  },
  // Alias para segunda vuelta si el nombre cambia ligeramente en JSON
  {
    partido: 9,
    nombre: "DANIEL NOBOA AZIN",
    url: img("imagenes_presidentes/candidato_002.png"),
    logo: img("logos_partidos_politicos/ADN.png"),
    color: "#8A2BE2",
    nombrePartido: "PID/MOVER", // A veces sale así en datos oficiales
    json: "PID/MOVER",
  },
  {
    partido: 10,
    nombre: "EMPATE",
    url: "",
    logo: "",
    color: "#808080", // Gris para empates
    nombrePartido: "EMPATE",
    json: "EMPATE",
  },
];
