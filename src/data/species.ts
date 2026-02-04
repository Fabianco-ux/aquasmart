export const speciesData = {
  tilapiaRoja: {
    name: "Tilapia roja",
    scientific: "Oreochromis mossambicus",
    temperature: "26–30°C",
    density: "1–4 peces/m² (según sistema)",
    cycle: "5–7 meses",
    oxygen: ">5 mg/L",
    pH: "7.0–9.0",
    feeding: "2–6% del peso vivo según etapa",
    notes: "Más sensible al frío; mayor valor comercial."
  },
  tilapiaPlateada: {
    name: "Tilapia plateada",
    scientific: "Oreochromis niloticus",
    temperature: "26–30°C",
    density: "1–5 peces/m²",
    cycle: "4–6 meses",
    oxygen: ">5 mg/L",
    pH: "7.0–9.0",
    feeding: "2–6% del peso vivo",
    notes: "Muy rústica y de rápido crecimiento."
  },
  trucha: {
    name: "Trucha arcoíris",
    scientific: "Oncorhynchus mykiss",
    temperature: "12–18°C",
    density: "10–40 kg/m³",
    cycle: "8–12 meses",
    oxygen: ">7 mg/L",
    pH: "6.5–8.0",
    feeding: "1–6% según etapa",
    notes: "Requiere agua fría y muy oxigenada."
  },
  cachama: {
    name: "Cachama",
    scientific: "Colossoma macropomum",
    temperature: "26–30°C",
    density: "0.5–2 peces/m²",
    cycle: "8–10 meses",
    oxygen: ">4 mg/L",
    pH: "6.5–8.0",
    feeding: "2–4% del peso vivo",
    notes: "Excelente para policultivo."
  },
  bocachico: {
    name: "Bocachico",
    scientific: "Prochilodus magdalenae",
    temperature: "24–30°C",
    density: "1–2 peces/m²",
    cycle: "8–12 meses",
    oxygen: ">4 mg/L",
    pH: "6.5–8.0",
    feeding: "2–3% del peso vivo",
    notes: "Detritívoro; ideal para policultivo."
  },
  bagrePintado: {
    name: "Bagre pintado",
    scientific: "Pseudoplatystoma corruscans",
    temperature: "26–30°C",
    density: "1–3 peces/m²",
    cycle: "8–12 meses",
    oxygen: ">5 mg/L",
    pH: "6.5–8.0",
    feeding: "2–3% del peso vivo",
    notes: "Carnívoro; requiere buen oxígeno."
  },
  bagreRayado: {
    name: "Bagre rayado",
    scientific: "Pseudoplatystoma fasciatum",
    temperature: "26–30°C",
    density: "1–2 peces/m²",
    cycle: "10–12 meses",
    oxygen: ">5 mg/L",
    pH: "6.5–8.0",
    feeding: "2–3%",
    notes: "Más agresivo que el pintado."
  },
  bagreCapitan: {
    name: "Bagre capitán",
    scientific: "Pimelodus grosskopfii",
    temperature: "24–28°C",
    density: "1–2 peces/m²",
    cycle: "8–10 meses",
    oxygen: ">5 mg/L",
    pH: "6.5–8.0",
    feeding: "2–3%",
    notes: "Omnívoro y resistente."
  },
  bagreCapaz: {
    name: "Bagre capaz",
    scientific: "Pimelodus blochii",
    temperature: "24–28°C",
    density: "1–2 peces/m²",
    cycle: "8–10 meses",
    oxygen: ">5 mg/L",
    pH: "6.5–8.0",
    feeding: "2–3%",
    notes: "Similar al capitán."
  },
  camaron: {
    name: "Camarón blanco",
    scientific: "Litopenaeus vannamei",
    temperature: "28–32°C",
    density: "5–150/m² según sistema",
    cycle: "90–120 días",
    oxygen: ">4 mg/L",
    pH: "7.5–8.5",
    feeding: "2–6%",
    notes: "Requiere manejo estricto de calidad de agua."
  }
} as const;

export type SpeciesId = keyof typeof speciesData;
export type SpeciesInfo = typeof speciesData[SpeciesId];
