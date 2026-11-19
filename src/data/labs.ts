// Laboratorio — personal experiments (brands, interfaces, prototypes).
// Each experiment is rendered by pages/LabExperiment.tsx:
//   Portada → Manual de marca → UI Kit → Animaciones → Pantallas
// Sections without content are skipped (e.g. an experiment with no brand manual).
// Content comes from the experiment's own material (manual + live site); nothing invented.

import terreneSymbol from "../assets/terrene/symbol.webp";
import terreneHeroPhoto from "../assets/terrene/hero-photo.webp";

import manualEsencia from "../assets/terrene/manual/esencia.webp";
import manualLogo from "../assets/terrene/manual/logo.webp";
import manualColor from "../assets/terrene/manual/color.webp";
import manualTipografia from "../assets/terrene/manual/tipografia.webp";
import manualImagen from "../assets/terrene/manual/imagen.webp";
import manualLayout from "../assets/terrene/manual/layout-movimiento.webp";

import uiBoton from "../assets/terrene/ui/boton.webp";
import uiMenu from "../assets/terrene/ui/menu.webp";
import uiTag from "../assets/terrene/ui/tag.webp";
import uiStats from "../assets/terrene/ui/stats.webp";
import uiDestacado from "../assets/terrene/ui/destacado.webp";
import uiCaption from "../assets/terrene/ui/caption.webp";
import uiTestimonio from "../assets/terrene/ui/testimonio.webp";
import uiFooter from "../assets/terrene/ui/footer.webp";

import vLoader from "../assets/terrene/video/loader.mp4";
import vLoaderWebm from "../assets/terrene/video/loader.webm";
import vLoaderPoster from "../assets/terrene/video/loader-poster.webp";
import vBoton from "../assets/terrene/video/boton.mp4";
import vBotonWebm from "../assets/terrene/video/boton.webm";
import vBotonPoster from "../assets/terrene/video/boton-poster.webp";
import vMenu from "../assets/terrene/video/menu.mp4";
import vMenuWebm from "../assets/terrene/video/menu.webm";
import vMenuPoster from "../assets/terrene/video/menu-poster.webp";
import vScroll from "../assets/terrene/video/scroll.mp4";
import vScrollWebm from "../assets/terrene/video/scroll.webm";
import vScrollPoster from "../assets/terrene/video/scroll-poster.webp";
import vDestacados from "../assets/terrene/video/destacados.mp4";
import vDestacadosWebm from "../assets/terrene/video/destacados.webm";
import vDestacadosPoster from "../assets/terrene/video/destacados-poster.webp";
import vMobile from "../assets/terrene/video/mobile.mp4";
import vMobileWebm from "../assets/terrene/video/mobile.webm";
import vMobilePoster from "../assets/terrene/video/mobile-poster.webp";
import vBeneath from "../assets/terrene/video/beneath.mp4";
import vBeneathWebm from "../assets/terrene/video/beneath.webm";
import vBeneathPoster from "../assets/terrene/video/beneath-poster.webp";
import vCirculo from "../assets/terrene/video/circulo.mp4";
import vCirculoWebm from "../assets/terrene/video/circulo.webm";
import vCirculoPoster from "../assets/terrene/video/circulo-poster.webp";
import vGrilla from "../assets/terrene/video/grilla.mp4";
import vGrillaWebm from "../assets/terrene/video/grilla.webm";
import vGrillaPoster from "../assets/terrene/video/grilla-poster.webp";

import webHero from "../assets/terrene/web-hero.webp";
import webStats from "../assets/terrene/web-stats.webp";
import webFeatured from "../assets/terrene/web-featured.webp";
import webSpaces from "../assets/terrene/web-spaces.webp";
import webStudio from "../assets/terrene/web-studio.webp";
import mobileHero from "../assets/terrene/m-hero.webp";
import mobileStats from "../assets/terrene/m-stats.webp";

import bcSymbol from "../assets/basecamp/symbol.svg";
import bcUiBoton from "../assets/basecamp/ui/boton.webp";
import bcUiStudio from "../assets/basecamp/ui/studio.webp";
import bcUiCaso from "../assets/basecamp/ui/caso.webp";
import bcUiCifra from "../assets/basecamp/ui/cifra.webp";
import bcUiServicio from "../assets/basecamp/ui/servicio.webp";
import bcUiPlan from "../assets/basecamp/ui/plan.webp";
import bcUiFaq from "../assets/basecamp/ui/faq.webp";
import bcUiForm from "../assets/basecamp/ui/form.webp";
import bcUiBlog from "../assets/basecamp/ui/blog.webp";
import bcVLoader from "../assets/basecamp/video/loader.mp4";
import bcVLoaderWebm from "../assets/basecamp/video/loader.webm";
import bcVLoaderPoster from "../assets/basecamp/video/loader-poster.webp";
import bcVMenu from "../assets/basecamp/video/menu.mp4";
import bcVMenuWebm from "../assets/basecamp/video/menu.webm";
import bcVMenuPoster from "../assets/basecamp/video/menu-poster.webp";
import bcVEnfoque from "../assets/basecamp/video/enfoque.mp4";
import bcVEnfoqueWebm from "../assets/basecamp/video/enfoque.webm";
import bcVEnfoquePoster from "../assets/basecamp/video/enfoque-poster.webp";
import bcVCasos from "../assets/basecamp/video/casos.mp4";
import bcVCasosWebm from "../assets/basecamp/video/casos.webm";
import bcVCasosPoster from "../assets/basecamp/video/casos-poster.webp";
import bcVCifras from "../assets/basecamp/video/cifras.mp4";
import bcVCifrasWebm from "../assets/basecamp/video/cifras.webm";
import bcVCifrasPoster from "../assets/basecamp/video/cifras-poster.webp";
import bcVServicios from "../assets/basecamp/video/servicios.mp4";
import bcVServiciosWebm from "../assets/basecamp/video/servicios.webm";
import bcVServiciosPoster from "../assets/basecamp/video/servicios-poster.webp";
import bcVPrecios from "../assets/basecamp/video/precios.mp4";
import bcVPreciosWebm from "../assets/basecamp/video/precios.webm";
import bcVPreciosPoster from "../assets/basecamp/video/precios-poster.webp";
import bcVMobile from "../assets/basecamp/video/mobile.mp4";
import bcVMobileWebm from "../assets/basecamp/video/mobile.webm";
import bcVMobilePoster from "../assets/basecamp/video/mobile-poster.webp";
import bcWebHero from "../assets/basecamp/web-hero.webp";
import bcWebEnfoque from "../assets/basecamp/web-enfoque.webp";
import bcWebCasos from "../assets/basecamp/web-casos.webp";
import bcWebServicios from "../assets/basecamp/web-servicios.webp";
import bcWebPrecios from "../assets/basecamp/web-precios.webp";
import bcWebPeople from "../assets/basecamp/web-people.webp";
import bcWebBlog from "../assets/basecamp/web-blog.webp";
import bcWebContact from "../assets/basecamp/web-contact.webp";
import bcWebFooter from "../assets/basecamp/web-footer.webp";
import bcMHero from "../assets/basecamp/m-hero.webp";
import bcMCasos from "../assets/basecamp/m-casos.webp";

/** How a screenshot or clip is framed: browser window, phone, or a plain rounded image. */
export type ShotFrame = "browser" | "phone" | "plain";

export interface LabShot {
  src: string;
  alt: string;
  frame: ShotFrame;
}

/** A recorded animation, shown as a looping GIF-like video. */
export interface LabClip {
  title: string;
  mp4: string;
  webm: string;
  poster: string;
  frame: ShotFrame;
}

export interface LabExperiment {
  /** URL slug: /laboratorio/:id */
  id: string;
  title: string;
  kind: string;
  year: string;
  /** Card / hero cover: the experiment's logo on its own brand colors */
  cover: {
    logo: string;
    bg: string;
    fg: string;
    /** Optional photo shown faintly behind the logo in the detail hero */
    photo?: string;
  };
  liveUrl?: string;
  tagline: string;

  /** Brand manual, chapter by chapter (optional) */
  manual?: { title: string; text: string; src: string }[];
  /** UI kit components, one by one. `maxWidth` (px) keeps small components at their real size. */
  components: { name: string; src: string; maxWidth?: number }[];
  /** Animations recorded from the live site */
  clips: LabClip[];
  /** Screens of the live site */
  screens: LabShot[];
}

export const labs: LabExperiment[] = [
  {
    id: "terrene",
    title: "Terrene",
    kind: "Manual de marca + Web",
    year: "2026",
    cover: {
      logo: terreneSymbol,
      bg: "#141313",
      fg: "#F2EDE6",
      photo: terreneHeroPhoto,
    },
    liveUrl: "https://terrene-self.vercel.app/",
    tagline: "Espacios arraigados, humanos y silenciosamente audaces.",

    manual: [
      {
        title: "Esencia",
        text: "Diseñamos con propósito y claridad: espacios que hablan a través de la luz, la escala y la confianza tranquila de la forma duradera.",
        src: manualEsencia,
      },
      {
        title: "Logo",
        text: "Dos piezas: el símbolo para la navegación, el logotipo para el cierre.",
        src: manualLogo,
      },
      {
        title: "Color",
        text: "Una sola escala cálida, de hueso a carbón. El color lo pone la fotografía.",
        src: manualColor,
      },
      {
        title: "Tipografía",
        text: "Manrope para display y texto. DM Mono para etiquetas, siempre en mayúsculas.",
        src: manualTipografia,
      },
      {
        title: "Imagen",
        text: "Arquitectura cálida, luz natural rasante, sin personas en primer plano.",
        src: manualImagen,
      },
      {
        title: "Layout y movimiento",
        text: "Generoso, centrado, con aire. Lento al salir, suave al llegar.",
        src: manualLayout,
      },
    ],

    components: [
      { name: "Botón", src: uiBoton },
      { name: "Menu toggle", src: uiMenu },
      { name: "Tag", src: uiTag },
      { name: "Stats", src: uiStats },
      { name: "Proyecto destacado", src: uiDestacado },
      { name: "Caption sobre imagen", src: uiCaption },
      { name: "Testimonio", src: uiTestimonio },
      { name: "Footer", src: uiFooter },
    ],

    clips: [
      { title: "Loader", mp4: vLoader, webm: vLoaderWebm, poster: vLoaderPoster, frame: "browser" },
      { title: "Menú", mp4: vMenu, webm: vMenuWebm, poster: vMenuPoster, frame: "browser" },
      { title: "Scroll", mp4: vScroll, webm: vScrollWebm, poster: vScrollPoster, frame: "browser" },
      { title: "Proyectos destacados", mp4: vDestacados, webm: vDestacadosWebm, poster: vDestacadosPoster, frame: "browser" },
      { title: "Botón · hover", mp4: vBoton, webm: vBotonWebm, poster: vBotonPoster, frame: "plain" },
      { title: "Studio · Beneath / Beyond", mp4: vBeneath, webm: vBeneathWebm, poster: vBeneathPoster, frame: "browser" },
      { title: "Studio · Galería en círculo", mp4: vCirculo, webm: vCirculoWebm, poster: vCirculoPoster, frame: "browser" },
      { title: "Blueprints · Grilla de imágenes", mp4: vGrilla, webm: vGrillaWebm, poster: vGrillaPoster, frame: "browser" },
      { title: "Mobile", mp4: vMobile, webm: vMobileWebm, poster: vMobilePoster, frame: "phone" },
    ],

    screens: [
      { src: webHero, alt: "Sitio Terrene — hero", frame: "browser" },
      { src: webStats, alt: "Sitio Terrene — cifras", frame: "browser" },
      { src: webFeatured, alt: "Sitio Terrene — proyecto destacado", frame: "browser" },
      { src: webSpaces, alt: "Sitio Terrene — Our Spaces", frame: "browser" },
      { src: webStudio, alt: "Sitio Terrene — Studio", frame: "browser" },
      { src: mobileHero, alt: "Sitio Terrene en mobile — hero", frame: "phone" },
      { src: mobileStats, alt: "Sitio Terrene en mobile — cifras", frame: "phone" },
    ],
  },
  {
    id: "basecamp",
    title: "Basecamp",
    kind: "Web",
    year: "2026",
    cover: {
      logo: bcSymbol,
      bg: "#000000",
      fg: "#F2F2F2",
    },
    liveUrl: "https://bscamp-2026.vercel.app/",
    tagline: "A design studio, built different.",

    components: [
      { name: "Botón", src: bcUiBoton, maxWidth: 240 },
      { name: "Studio Lead", src: bcUiStudio, maxWidth: 380 },
      { name: "Caso de estudio", src: bcUiCaso, maxWidth: 460 },
      { name: "Cifra", src: bcUiCifra, maxWidth: 460 },
      { name: "Servicio", src: bcUiServicio, maxWidth: 860 },
      { name: "Plan", src: bcUiPlan, maxWidth: 460 },
      { name: "FAQ", src: bcUiFaq, maxWidth: 860 },
      { name: "Formulario de contacto", src: bcUiForm, maxWidth: 960 },
      { name: "Post del blog", src: bcUiBlog, maxWidth: 860 },
    ],

    clips: [
      { title: "Loader", mp4: bcVLoader, webm: bcVLoaderWebm, poster: bcVLoaderPoster, frame: "browser" },
      { title: "Menú", mp4: bcVMenu, webm: bcVMenuWebm, poster: bcVMenuPoster, frame: "browser" },
      { title: "Scroll · Our approach", mp4: bcVEnfoque, webm: bcVEnfoqueWebm, poster: bcVEnfoquePoster, frame: "browser" },
      { title: "Case studies", mp4: bcVCasos, webm: bcVCasosWebm, poster: bcVCasosPoster, frame: "browser" },
      { title: "Cifras", mp4: bcVCifras, webm: bcVCifrasWebm, poster: bcVCifrasPoster, frame: "browser" },
      { title: "Services", mp4: bcVServicios, webm: bcVServiciosWebm, poster: bcVServiciosPoster, frame: "browser" },
      { title: "Pricing · Monthly / Quarterly", mp4: bcVPrecios, webm: bcVPreciosWebm, poster: bcVPreciosPoster, frame: "browser" },
      { title: "Mobile", mp4: bcVMobile, webm: bcVMobileWebm, poster: bcVMobilePoster, frame: "phone" },
    ],

    screens: [
      { src: bcWebHero, alt: "Sitio Basecamp — hero", frame: "browser" },
      { src: bcWebEnfoque, alt: "Sitio Basecamp — Our approach", frame: "browser" },
      { src: bcWebCasos, alt: "Sitio Basecamp — Case studies", frame: "browser" },
      { src: bcWebServicios, alt: "Sitio Basecamp — Services", frame: "browser" },
      { src: bcWebPrecios, alt: "Sitio Basecamp — Pricing", frame: "browser" },
      { src: bcWebPeople, alt: "Sitio Basecamp — People", frame: "browser" },
      { src: bcWebBlog, alt: "Sitio Basecamp — Blog", frame: "browser" },
      { src: bcWebContact, alt: "Sitio Basecamp — Contact", frame: "browser" },
      { src: bcWebFooter, alt: "Sitio Basecamp — footer", frame: "browser" },
      { src: bcMHero, alt: "Sitio Basecamp en mobile — hero", frame: "phone" },
      { src: bcMCasos, alt: "Sitio Basecamp en mobile — Case studies", frame: "phone" },
    ],
  },
];

export const getLabById = (id: string): LabExperiment | undefined => labs.find((l) => l.id === id);

export const getNextLab = (id: string): LabExperiment | undefined => {
  const i = labs.findIndex((l) => l.id === id);
  return labs.length > 1 ? labs[(i + 1) % labs.length] : undefined;
};
