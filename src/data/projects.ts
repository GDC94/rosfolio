import hrImage from "../assets/hr.png";
import xconsCard from "../assets/xcons.png";
import xconsCover from "../assets/xcons/portada-xcons.png";

// Jodify Project assets
import jodifyCard from "../assets/jodify/portada-project.png";
import jodifyHomeCard from "../assets/jodify/portada.png";
import jodifyUiKit from "../assets/jodify/UI-kit.svg";
import jodifyPersona from "../assets/jodify/retrato.png";
import jodifyLogoTicketek from "../assets/jodify/Logo Ticketek.png";
import jodifyLogoPassline from "../assets/jodify/Logo Passline.png";

// Export Jodify images for use in Project.tsx
export const jodifyImages = {
  uiKit: jodifyUiKit,
  persona: jodifyPersona,
  logoTicketek: jodifyLogoTicketek,
  logoPassline: jodifyLogoPassline,
};

// XCONS Project assets
import xconsDetail3 from "../assets/xcons/detail-3.png";
import xconsDetail322 from "../assets/xcons/detail-3-2.2.png";
import xconsDetail333 from "../assets/xcons/detail-3-3.3.png";
import xconsDetail342 from "../assets/xcons/detail-3-4.2.png";
import xconsPedidos from "../assets/xcons/table de pedidos.png";
import xconsFlujoCompra from "../assets/xcons/flujo-de-compra.png";

// Export XCONS images for use in Project.tsx
export const xconsImages = {
  flujoCompra: xconsFlujoCompra,
  detail3: xconsDetail3,
  detail322: xconsDetail322,
  detail333: xconsDetail333,
  detail342: xconsDetail342,
  pedidos: xconsPedidos,
};

import hrCover from "../assets/hr/cover.png";
import hrScreen1 from "../assets/hr/screen-1.png";
import hrScreen2 from "../assets/hr/screen-2.png";
import hrScreen3 from "../assets/hr/screen-3.png";
import hrScreen4 from "../assets/hr/screen-4.png";
import hrScreen5 from "../assets/hr/screen-5.png";
import hrWireframe from "../assets/hr/low-frame.png";
import hrUiKit from "../assets/hr/UI KIT.png";
import hrBenchmark from "../assets/hr/benchmark.svg";
import hrPersona from "../assets/hr/user-persona-1.png";
import hrMvp from "../assets/hr/mvp.png";

export interface Challenge {
  number: string;
  question: string;
}

export interface Competitor {
  name: string;
  insight: string;
}

export interface ProcessStep {
  name: string;
  description: string;
}

export interface Screen {
  url: string;
  title: string;
}

export interface ProjectImages {
  cover?: string;
  personas?: string;
  benchmark?: string;
  wireframes?: string;
  uiKit?: string;
  mvp?: string;
  screens?: Screen[];
}

export interface ProjectData {
  id: string;
  title: string;
  category: "Professional" | "Academic" | "Personal";
  company: string;
  year: string;
  description: string;
  image: string;
  homeImage?: string;

  // Case study fields
  projectName?: string;
  projectType?: string;
  timeline?: string;
  contribution?: string[];
  conceptSummary?: string;
  challenges?: Challenge[];
  keyFindings?: {
    competitors?: Competitor[];
    userNeed?: string;
    trend?: string;
  };
  solution?: {
    approach?: string;
    mvpFeatures?: string[];
    designSystem?: string;
  };
  process?: {
    steps: ProcessStep[];
  };
  results?: {
    validationPlan?: string[];
    metrics?: string[];
    nextSteps?: string;
  };
  images?: ProjectImages;
}

export const projects: ProjectData[] = [
  {
    id: "1",
    title: "HacheR: HR Tech Evolution",
    category: "Professional",
    company: "Plataforma de Gestión de Empleados",
    year: "2024",
    description: "Plataforma de Gestión de Empleados / SaaS B2B",
    image: hrImage,
    projectName: "HacheR: HR Tech Evolution",
    projectType: "Plataforma de Gestión de Empleados / SaaS B2B",
    timeline: "2024",
    contribution: [
      "UX Research",
      "Diseño de Interfaz (UI)",
      "Diseño de Interacción",
      "Prototipado",
    ],
    conceptSummary:
      "HacheR es una solución digital diseñada para el área de Recursos Humanos. El objetivo es crear una herramienta de gestión que equilibre la potencia de funciones avanzadas con la simplicidad de uso, permitiendo que profesionales con diferentes niveles de experiencia tecnológica puedan gestionar empleados, permisos y reportes de manera eficiente y sin frustraciones.",

    challenges: [
      {
        number: "01",
        question: "¿Cómo democratizar la tecnología en RR.HH.?",
      },
      {
        number: "02",
        question: "¿Cómo equilibrar potencia y simplicidad?",
      },
      {
        number: "03",
        question: "¿Cómo migrar del papel a lo digital sin dolor?",
      },
    ],

    keyFindings: {
      competitors: [
        {
          name: "Factorial",
          insight: "Buena organización, pero difícil de aprender para novatos.",
        },
        {
          name: "PeopleForce",
          insight: "Muy potente, pero visualmente densa.",
        },
        {
          name: "HiBob",
          insight:
            "Muy intuitiva y limpia, pero carece de profundidad en jerarquías complejas.",
        },
      ],
      userNeed:
        "Los administradores valoran la personalización de flujos y la claridad visual por encima de la cantidad de funciones.",
      trend:
        "La IA y la digitalización son el futuro, pero la accesibilidad es el presente necesario.",
    },

    solution: {
      approach:
        "Interfaz que prioriza la claridad con jerarquías visuales claras, espacios en blanco y un lenguaje sencillo.",
      mvpFeatures: [
        "Carga de datos",
        "Búsqueda y Visualización",
        "Gestión de Permisos",
        "Reportes",
      ],
      designSystem:
        "Tipografía Lato para legibilidad óptima. Jerarquías visuales claras, espacios en blanco para no saturar.",
    },

    process: {
      steps: [
        {
          name: "Empatizar",
          description:
            "Investigación de usuarios y creación de User Personas (Clara y Santiago) para entender sus frustraciones y motivaciones.",
        },
        {
          name: "Definir",
          description:
            "Identificación de los puntos de dolor y establecimiento del objetivo: \"Equilibrar potencia y simplicidad\".",
        },
        {
          name: "Idear & Prototipar",
          description: "Desarrollo de wireframes y sistema de diseño visual.",
        },
        {
          name: "Testear",
          description: "Planificación de la validación con usuarios reales.",
        },
      ],
    },

    results: {
      validationPlan: [
        "Testing con usuarios reales: Reclutamiento de administradores de RR.HH. con distinta experiencia tecnológica.",
      ],
      metrics: [
        "Tiempo para completar tareas (Eficiencia)",
        "Tasa de errores (Usabilidad)",
        "Satisfacción del usuario (Feedback cualitativo)",
      ],
      nextSteps:
        "Realizar iteraciones basadas en los resultados para asegurar que HacheR no solo sea una herramienta más, sino una solución que los usuarios realmente quieran usar.",
    },

    images: {
      cover: hrCover,
      personas: hrPersona,
      benchmark: hrBenchmark,
      wireframes: hrWireframe,
      uiKit: hrUiKit,
      mvp: hrMvp,
      screens: [
        { url: hrScreen1, title: "Dashboard Principal" },
        { url: hrScreen2, title: "Gestión de Empleados" },
        { url: hrScreen3, title: "Perfil de Empleado" },
        { url: hrScreen4, title: "Gestión de Permisos" },
        { url: hrScreen5, title: "Reportes y Análisis" },
      ],
    },
  },
  {
    id: "2",
    title: "XCONS Ecosystem",
    category: "Professional",
    company: "Plataforma de Comercio Consultivo",
    year: "2024 - Actualidad",
    description: "Plataforma de Comercio Consultivo para la industria de la construcción",
    image: xconsCard,
    projectName: "XCONS Ecosystem",
    projectType: "Plataforma B2B / Comercio Consultivo",
    timeline: "2024",
    contribution: [
      "Product Design",
      "UX Research",
      "UI Systems",
      "Information Architecture",
    ],
    conceptSummary:
      "Diseñar una plataforma de \"Comercio Consultivo\" para la industria de la construcción. El objetivo fue transformar la experiencia de compra de materiales —que tradicionalmente es lenta, asistida y compleja— en un flujo digital unificado, sin perder la flexibilidad que requieren las obras reales (negociación, acopio y múltiples entregas).",

    challenges: [
      {
        number: "01",
        question: "\"The Cart is Broken\" - En la construcción, el paradigma tradicional de e-commerce falla. ¿Cómo diseñamos un flujo que priorice la negociación y el asesoramiento sobre la transacción inmediata?",
      },
      {
        number: "02",
        question: "Logistics vs. Billing - Un usuario puede pagar todo hoy, pero necesitar los materiales en 3 meses. ¿Cómo diseñar una interfaz donde el estado del pago y el de la entrega no coinciden?",
      },
      {
        number: "03",
        question: "Multi-Persona Permissions - En una obra interactúan el Dueño (paga), el Arquitecto (elige) y el Constructor (recibe). ¿Cómo evitamos crear múltiples cuentas y contraseñas?",
      },
    ],

    keyFindings: {
      competitors: [
        {
          name: "Quote-First Interface",
          insight: "Diseñamos un sistema donde el Presupuesto es el rey. Vista Kanban para gestión visual de oportunidades y colaboración en tiempo real entre cliente y vendedor.",
        },
        {
          name: "Order Management (OMS)",
          insight: "Dashboard dividido en bloques lógicos: Bloque Financiero (¿cuánto se pagó?) y Bloque Logístico (¿qué está en acopio?). Barras de progreso para entender el estado de un vistazo.",
        },
        {
          name: "Unified User Profile (CRM)",
          insight: "Single Source of Truth: Perfil que unifica la actividad del usuario a través de múltiples tiendas y roles, con historial visual de todas las interacciones.",
        },
      ],
      userNeed:
        "Los usuarios necesitan un sistema que entienda que en construcción el presupuesto precede a la compra, y que el mismo usuario puede tener diferentes roles según el contexto.",
      trend:
        "La digitalización del sector construcción requiere adaptarse a flujos de trabajo existentes, no imponer paradigmas de e-commerce tradicional.",
    },

    solution: {
      approach:
        "Reemplazar el \"Carrito\" por un sistema de Presupuestos Colaborativos. Diseñar una UI de Estados Independientes (Transacciones vs. Entregas). Implementar Roles Dinámicos donde un mismo usuario cambia de permisos según el contexto.",
      mvpFeatures: [
        "Sistema de Presupuestos",
        "Tablero Kanban",
        "Dashboard de Pedidos",
        "Perfil Unificado",
        "Roles Dinámicos",
        "Acopio y Entregas",
      ],
      designSystem:
        "Arquitectura de precios dinámica: el precio no es estático, cambia según Reglas del Seller, Contexto del Store y Perfil del Cliente.",
    },

    results: {
      validationPlan: [
        "Validación del modelo mental de presupuestos con vendedores y clientes del sector.",
        "Testing del sistema de roles con diferentes perfiles de usuario (Dueño, Arquitecto, Constructor).",
        "Evaluación de la claridad del dashboard de pedidos con estados desacoplados.",
      ],
      metrics: [
        "Tiempo de creación de presupuesto (Eficiencia)",
        "Comprensión del estado del pedido (Usabilidad)",
        "Adopción del sistema de roles (Adopción)",
      ],
      nextSteps:
        "Este proyecto demuestra que no solo diseñé pantallas, sino que entendí el modelo mental de la construcción (Presupuesto > Carrito), arquitecturé sistemas complejos (Roles y Permisos), y diseñé UI para simplificar datos densos.",
    },

    images: {
      cover: xconsCover,
      screens: [],
    },
  },
  {
    id: "3",
    title: "Jodify",
    category: "Professional",
    company: "Plataforma de Eventos",
    year: "2023",
    description: "Agregador de eventos de música electrónica",
    image: jodifyCard,
    homeImage: jodifyHomeCard,
    projectName: "Jodify",
    projectType: "Plataforma de Eventos / Agregador B2C",
    timeline: "2023",
    contribution: [
      "UX Research",
      "Diseño de Interfaz (UI)",
      "Diseño de Interacción",
      "Prototipado",
    ],
    conceptSummary:
      "Jodify, la plataforma líder en música electrónica, se presenta como la guía definitiva para los amantes de los beats. Concentrándose en listar de manera detallada todas las fiestas tanto en Argentina como en países vecinos, Jodify se erige como el referente para quienes buscan enriquecer su vivencia musical. Pensada especialmente para los apasionados de la música electrónica, esta plataforma no solo brinda información, sino que se convierte en el aliado perfecto para elevar la experiencia artística a otro nivel.",

    challenges: [
      {
        number: "01",
        question: "¿Cómo facilitar el descubrimiento de eventos de música electrónica que se ajusten a las preferencias específicas de cada usuario?",
      },
      {
        number: "02",
        question: "¿Cómo garantizar transparencia en el proceso de compra, eliminando costos ocultos y generando confianza?",
      },
      {
        number: "03",
        question: "¿Cómo ofrecer recomendaciones personalizadas que reflejen los gustos musicales y experiencias anteriores del usuario?",
      },
    ],

    keyFindings: {
      competitors: [
        {
          name: "Ticketek",
          insight: "Enfoque visual con ocupación de espacio moderada. Buena cohesión y consistencia visual, pero personalización limitada y accesibilidad mejorable. Etiquetas claras pero instrucciones que podrían ser más claras.",
        },
        {
          name: "Passline",
          insight: "Diseño limpio y minimalista con eficiente ocupación de espacio. Ofrece opciones de personalización visual, navegación directa, instrucciones claras y feedback efectivo. Fuerte consistencia en vocabulario.",
        },
      ],
      userNeed:
        "Los usuarios buscan una plataforma con amplia oferta de eventos de música electrónica, desde festivales masivos hasta fiestas underground, con recomendaciones personalizadas basadas en sus preferencias.",
      trend:
        "La escena de música electrónica demanda plataformas especializadas que entiendan el contexto cultural y ofrezcan experiencias de descubrimiento únicas.",
    },

    solution: {
      approach:
        "Diseñar una plataforma que no solo venda entradas, sino que forme parte de la experiencia musical del usuario, conectándolo con una comunidad que comparte su pasión.",
      mvpFeatures: [
        "Listado de eventos",
        "Filtros por género",
        "Recomendaciones personalizadas",
        "Compra de entradas",
        "Comunidad",
      ],
      designSystem:
        "Tipografía Roboto para legibilidad óptima. Paleta de colores con Primary verde (#006100) y Secondary magenta (#FA00FF) que reflejan la energía de la escena electrónica.",
    },

    results: {
      validationPlan: [
        "Testing con usuarios amantes de la música electrónica para validar el flujo de descubrimiento.",
        "Evaluación de la claridad en el proceso de compra y transparencia de precios.",
      ],
      metrics: [
        "Tiempo de descubrimiento de eventos (Eficiencia)",
        "Tasa de conversión en compra (Efectividad)",
        "Satisfacción con recomendaciones (Personalización)",
      ],
      nextSteps:
        "Iterar basándose en feedback de usuarios para mejorar el algoritmo de recomendaciones y expandir la cobertura de eventos.",
    },

    images: {
      cover: jodifyCard,
      personas: jodifyPersona,
      uiKit: jodifyUiKit,
    },
  },
  {
    id: "4",
    title: "Examine iPhone in 3D",
    category: "Professional",
    company: "Apple.com",
    year: "Professional 2021-2023",
    description: "Apple MARCOM project",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
  },
  {
    id: "5",
    title: "Home of Virtual Avatars",
    category: "Professional",
    company: "Hyper.online",
    year: "Professional 2022-2023",
    description: "Hyper project",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop",
  },
  {
    id: "6",
    title: "Next Generation Currency Concept",
    category: "Academic",
    company: "Sponsored by KBA Nota Sys",
    year: "2019",
    description: "Academic Case Study",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=800&fit=crop",
  },
  {
    id: "7",
    title: "Designing Virtual Reality for Productivity",
    category: "Academic",
    company: "Strat Concept Design",
    year: "2019",
    description: "Academic Case Study",
    image:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=800&fit=crop",
  },
  {
    id: "8",
    title: "Storytelling Tool for Future Creators",
    category: "Academic",
    company: "Sponsored by Google Daydream",
    year: "2019",
    description: "Academic Case Study",
    image:
      "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=800&h=800&fit=crop",
  },
  {
    id: "9",
    title: "xrfordesigner.com",
    category: "Personal",
    company: "Spatial computing for designers",
    year: "",
    description: "AR VR Education site - Personal Project",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=800&fit=crop",
  },
];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find((project) => project.id === id);
};

export const getFeaturedProjects = (count: number = 4): ProjectData[] => {
  return projects.slice(0, count);
};

export const TOTAL_PROJECTS = projects.length;
