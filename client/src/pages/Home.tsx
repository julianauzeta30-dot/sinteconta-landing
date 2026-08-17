/**
 * Estilo Bóveda de Claridad: editorial financiero contemporáneo; asimetría,
 * blanco cálido, Azul Bóveda y movimiento medido que comunica transparencia.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  Landmark,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const navItems = [
  { label: "Servicios", target: "servicios" },
  { label: "Nosotros", target: "nosotros" },
  { label: "Equipo", target: "equipo" },
  { label: "Preguntas", target: "preguntas" },
];

const useCases = [
  {
    id: "crecer",
    label: "Estoy creciendo",
    title: "Escala con números que sostienen tu siguiente decisión.",
    summary:
      "Ordenamos la base contable y diseñamos una rutina de información para que crecer no implique perder visibilidad.",
    services: ["Contabilidad estratégica", "Reportes para dirección", "Formalización empresarial"],
    icon: Building2,
    marker: "01",
  },
  {
    id: "orden",
    label: "Necesito orden",
    title: "Convierte la operación diaria en una contabilidad que respira.",
    summary:
      "Revisamos el punto de partida, priorizamos lo crítico y dejamos procesos que tu equipo puede sostener.",
    services: ["Diagnóstico contable", "Cierres mensuales", "Depuración de información"],
    icon: FileCheck2,
    marker: "02",
  },
  {
    id: "impuestos",
    label: "Quiero anticiparme",
    title: "Impuestos sin sorpresas: planeación antes que reacción.",
    summary:
      "Traducimos obligaciones en un calendario y en decisiones de planeación tributaria con contexto de negocio.",
    services: ["Planeación tributaria", "Declaraciones", "Acompañamiento ante requerimientos"],
    icon: Landmark,
    marker: "03",
  },
  {
    id: "nomina",
    label: "Tengo equipo",
    title: "Haz de tu nómina un proceso tranquilo, preciso y humano.",
    summary:
      "Alineamos liquidaciones, novedades y obligaciones para que la operación de personas no se detenga.",
    services: ["Nómina y seguridad social", "Contratación", "Soporte operativo"],
    icon: BriefcaseBusiness,
    marker: "04",
  },
];

const promotions = [
  {
    eyebrow: "Punto de partida",
    title: "Diagnóstico que despeja el panorama.",
    description:
      "Una conversación inicial para identificar prioridades contables, tributarias u operativas y definir el siguiente paso con criterio.",
    cta: "Solicitar diagnóstico",
    tone: "light",
  },
  {
    eyebrow: "Temporada de cierres",
    title: "Cierra con evidencia. Empieza con perspectiva.",
    description:
      "Ordena la información del período y entra al siguiente ciclo con los pendientes visibles y bajo control.",
    cta: "Preparar mi cierre",
    tone: "blue",
  },
  {
    eyebrow: "Para equipos en movimiento",
    title: "La nómina no debería frenar tu operación.",
    description:
      "Construye un flujo claro para novedades, liquidaciones y obligaciones, sin perseguir información al final del mes.",
    cta: "Conversar sobre nómina",
    tone: "ink",
  },
];

const faqs = [
  {
    question: "¿Sinteconta trabaja con empresas que ya tienen contador interno?",
    answer:
      "Sí. El acompañamiento puede complementar a un equipo interno con revisión, planeación, cierres o frentes puntuales. El primer diagnóstico permite delimitar responsabilidades y entregar una ruta clara.",
  },
  {
    question: "¿Cómo sé qué servicio necesito?",
    answer:
      "No tienes que llegar con la respuesta resuelta. Empezamos entendiendo el momento de la empresa —crecimiento, orden, impuestos o equipo— y priorizamos el servicio que responde a ese reto.",
  },
  {
    question: "¿Pueden apoyar una contabilidad atrasada o con información dispersa?",
    answer:
      "Sí. Primero se revisa el estado de la información, se identifican los temas críticos y se establece un plan de organización que no comprometa la operación cotidiana.",
  },
  {
    question: "¿El acompañamiento puede ser periódico o por proyecto?",
    answer:
      "Las necesidades pueden abordarse como un acompañamiento continuo o como un frente puntual. La propuesta se define según el alcance, la urgencia y el nivel de soporte que necesita la empresa.",
  },
  {
    question: "¿Qué necesito tener listo para una primera conversación?",
    answer:
      "Solo una visión honesta de tu situación actual y de la decisión que quieres tomar. Si ya cuentas con reportes o información de períodos anteriores, los revisaremos después de establecer el alcance.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.7 },
};

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [heroShift, setHeroShift] = useState(0);
  const selected = useCases[selectedCase];
  const SelectedIcon = selected.icon;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setHeroShift(Math.min(window.scrollY * 0.045, 54));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const handleSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    handleSelect();
    carouselApi.on("select", handleSelect);
    const timer = window.setInterval(() => carouselApi.scrollNext(), 6400);
    return () => {
      window.clearInterval(timer);
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  const chooseNav = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="relative overflow-x-clip bg-[#fbfcff] text-[#14233a]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] grain" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#d8e3f5]/80 bg-white/90 py-3 shadow-[0_8px_30px_rgba(13,54,110,0.07)] backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <button
            type="button"
            aria-label="Ir al inicio"
            className="group flex items-center gap-3 text-left"
            onClick={() => scrollToSection("inicio")}
          >
            <span className="grid size-12 place-items-center overflow-hidden rounded-[15px] border-2 border-[#b8d3f5] bg-white shadow-[0_8px_22px_rgba(3,47,100,0.12)] transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
              <img src="/manus-storage/sinteconta-logo_57ae1857.png" alt="Símbolo Sinteconta" className="size-9 object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[1.5rem] tracking-[-0.065em] text-[#083b78]">Sinteconta</span>
              <span className="mt-1 block text-[9px] font-extrabold tracking-[0.22em] text-[#7090b9]">SAS · ASESORÍA</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => chooseNav(item.target)}
                className="text-[13px] font-bold text-[#496685] transition-colors hover:text-[#083b78]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => chooseNav("contacto")}
            className="hidden items-center gap-2 rounded-full bg-[#083b78] px-5 py-3 text-[12px] font-extrabold text-white shadow-[0_12px_24px_rgba(8,59,120,0.18)] transition duration-200 hover:bg-[#0c73e8] active:scale-[0.97] lg:flex"
          >
            Hablemos <ArrowRight className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid size-11 place-items-center rounded-full border border-[#cbdcf3] bg-white text-[#083b78] transition active:scale-[0.97] lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mx-5 mt-3 rounded-[22px] border border-[#d9e6f6] bg-white p-3 shadow-[0_20px_48px_rgba(8,59,120,0.14)] lg:hidden"
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item.target}
                onClick={() => chooseNav(item.target)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-[#244664] hover:bg-[#eff6ff]"
              >
                {item.label}<ChevronRight className="size-4" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => chooseNav("contacto")}
              className="mt-1 w-full rounded-xl bg-[#083b78] px-4 py-3 text-sm font-extrabold text-white"
            >
              Agendar conversación
            </button>
          </motion.div>
        )}
      </header>

      <main className="relative z-10">
        <section id="inicio" className="relative isolate min-h-[810px] overflow-hidden pt-28 lg:min-h-[850px] lg:pt-36">
          <div className="absolute inset-0 bg-[#eaf4ff]" />
          <div className="absolute inset-y-0 right-0 w-[72%] bg-[linear-gradient(90deg,rgba(234,244,255,1)_0%,rgba(234,244,255,.84)_25%,rgba(234,244,255,.05)_67%)] lg:w-[68%]" />
          <img
            src="/manus-storage/sinteconta-hero_6b15b503.jpg"
            alt="Asesora financiera revisando información en un espacio ejecutivo"
            className="absolute inset-y-0 right-0 -z-10 h-full w-[71%] object-cover object-[72%_center] lg:w-[61%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#eaf4ff_0%,rgba(234,244,255,.98)_28%,rgba(234,244,255,.48)_54%,rgba(234,244,255,.08)_100%)]" />
          <div className="absolute -bottom-20 -left-20 size-[360px] rounded-full bg-[#78b7ff]/20 blur-3xl" />
          <div className="absolute right-[8%] top-[21%] size-28 rounded-full border border-white/60 bg-white/15 backdrop-blur-[2px]" style={{ transform: `translateY(${heroShift}px)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(to_top,#fbfcff,transparent)]" />

          <div className="relative mx-auto grid min-h-[650px] max-w-[1440px] items-center px-5 pb-14 lg:grid-cols-[minmax(0,1fr)_470px] lg:px-10 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82 }}
              className="max-w-[730px] pt-12 lg:pt-0"
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#bcd9f8] bg-white/80 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1664bd] backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-[#0c73e8] shadow-[0_0_0_4px_rgba(12,115,232,.12)]" />
                Reg. 001 · Contabilidad que impulsa decisiones
              </div>
              <h1 className="max-w-[700px] font-serif text-[clamp(3.3rem,7.2vw,7.35rem)] leading-[0.88] tracking-[-0.073em] text-[#08295a]">
                Tus números ya hablan.<br />
                <em className="font-normal text-[#0c73e8]">Hagamos que decidan.</em>
              </h1>
              <p className="mt-8 max-w-[550px] text-[16px] leading-7 text-[#486985] lg:text-[17px]">
                Contabilidad, impuestos y nómina con criterio estratégico para empresas que necesitan crecer con visibilidad, orden y respaldo.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => scrollToSection("contacto")}
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#083b78] px-6 py-4 text-[13px] font-extrabold text-white shadow-[0_16px_26px_rgba(8,59,120,0.22)] transition duration-200 hover:bg-[#0c73e8] active:scale-[0.97]"
                >
                  Agenda una conversación <span className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-1"><ArrowRight className="size-4" /></span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("servicios")}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-4 text-[13px] font-extrabold text-[#17508f] transition hover:text-[#0c73e8]"
                >
                  Explora por necesidad <ArrowDownRight className="size-4" />
                </button>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.16 }}
              className="relative mt-12 self-end justify-self-end rounded-[26px] border border-white/70 bg-white/80 p-5 shadow-[0_24px_55px_rgba(8,59,120,0.16)] backdrop-blur-xl lg:mt-0 lg:w-[385px] lg:p-6"
              style={{ transform: `translateY(${-heroShift * 0.32}px)` }}
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#dbe8f6] pb-3 text-[9px] font-extrabold tracking-[.15em] text-[#6687ad]">
                <span>SELLO SINTECONTA</span><span>REF · 001</span>
              </div>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6e90b9]">Una primera conversación</p>
                  <p className="mt-2 max-w-[240px] font-serif text-[25px] leading-[1.04] tracking-[-0.045em] text-[#083b78]">Un punto de partida claro para avanzar.</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e8f3ff] text-[#0c73e8]"><MessageCircle className="size-5" /></span>
              </div>
              <div className="my-5 h-px bg-[#dbe8f6]" />
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full border border-[#bfdaf6] bg-white text-[#083b78]"><Check className="size-4" /></span>
                <p className="text-[12px] font-semibold leading-5 text-[#54718d]">Entendemos tu momento y priorizamos el próximo paso.</p>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="relative z-10 -mt-1 overflow-hidden border-y border-[#dce8f7] bg-white py-4">
          <div className="ticker-track flex min-w-max items-center gap-9 whitespace-nowrap">
            {["CONTABILIDAD CON CRITERIO", "VISIBILIDAD PARA DECIDIR", "PROCESOS QUE RESPIRAN", "CUMPLIMIENTO SIN RUIDO", "CONTABILIDAD CON CRITERIO", "VISIBILIDAD PARA DECIDIR", "PROCESOS QUE RESPIRAN", "CUMPLIMIENTO SIN RUIDO"].map((word, index) => (
              <span key={`${word}-${index}`} className="flex items-center gap-9 text-[11px] font-extrabold tracking-[0.14em] text-[#4e82b8]">
                {word} <span className="size-1.5 rounded-full bg-[#0c73e8]" />
              </span>
            ))}
          </div>
        </section>

        <section id="servicios" className="relative overflow-hidden bg-[#fbfcff] py-24 lg:py-36">
          <div className="absolute left-[8%] top-24 h-72 w-px bg-[linear-gradient(#c7dcf8_0%,transparent_100%)]" />
          <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
            <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="section-eye">Servicios por situación</p>
                <div className="audit-caption mt-5"><span className="audit-dot" /> DOSSIER DE NECESIDADES · 04 FRENTES</div>
                <h2 className="mt-5 max-w-[540px] font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[.92] tracking-[-0.065em] text-[#083b78]">
                  No empiezas por el servicio. <em className="font-normal text-[#0c73e8]">Empiezas por tu reto.</em>
                </h2>
              </div>
              <p className="max-w-[545px] pb-1 text-[15px] leading-7 text-[#55718d] lg:ml-auto">
                La contabilidad gana valor cuando responde al momento real de tu empresa. Elige la situación que más se parece a la tuya y descubre por dónde avanzar.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[0.83fr_1.17fr]">
              <div className="space-y-2" role="tablist" aria-label="Casos de uso">
                {useCases.map((useCase, index) => {
                  const CaseIcon = useCase.icon;
                  const isSelected = selectedCase === index;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      key={useCase.id}
                      onClick={() => setSelectedCase(index)}
                      className={`group flex w-full items-center gap-4 rounded-[18px] border px-5 py-4 text-left transition duration-200 ${
                        isSelected
                          ? "border-[#0c73e8] bg-[#083b78] text-white shadow-[0_16px_28px_rgba(8,59,120,0.16)]"
                          : "border-transparent bg-transparent text-[#55718d] hover:border-[#d4e4f6] hover:bg-white"
                      }`}
                    >
                      <span className={`text-[11px] font-extrabold tracking-[0.12em] ${isSelected ? "text-[#78b9ff]" : "text-[#9ab2cc]"}`}>{useCase.marker}</span>
                      <span className={`grid size-9 place-items-center rounded-full ${isSelected ? "bg-white/15 text-white" : "bg-[#eaf4ff] text-[#3f76b6]"}`}><CaseIcon className="size-[18px]" /></span>
                      <span className="font-serif text-[21px] tracking-[-0.035em]">{useCase.label}</span>
                      <ArrowRight className={`ml-auto size-4 transition-transform duration-200 ${isSelected ? "translate-x-0 text-white" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36 }}
                className="relative overflow-hidden rounded-[30px] border border-[#d9e7f8] bg-white p-7 shadow-[0_18px_45px_rgba(23,69,124,0.08)] sm:p-10"
              >
                <img src="/manus-storage/sinteconta-servicios_124d985a.jpg" alt="Composición abstracta azul que representa orden y visibilidad" className="absolute bottom-0 right-0 h-full w-[52%] object-cover object-center opacity-[0.13] mix-blend-multiply" />
                <div className="relative max-w-[545px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf4ff] text-[#0c73e8]"><SelectedIcon className="size-6" /></span>
                    <span className="audit-caption"><span className="audit-dot" /> EVIDENCIA · CASO {selected.marker}</span>
                  </div>
                  <h3 className="mt-9 font-serif text-[clamp(2rem,4vw,3.55rem)] leading-[.96] tracking-[-0.06em] text-[#083b78]">{selected.title}</h3>
                  <p className="mt-6 max-w-[490px] text-[15px] leading-7 text-[#55718d]">{selected.summary}</p>
                  <div className="mt-9 grid gap-3 sm:grid-cols-3">
                    {selected.services.map((service) => (
                      <div key={service} className="rounded-2xl border border-[#dce8f7] bg-white/80 px-4 py-4 text-[12px] font-bold leading-5 text-[#28557f] shadow-[0_7px_15px_rgba(8,59,120,0.04)]">
                        <span className="mb-2 block size-1.5 rounded-full bg-[#0c73e8]" />
                        {service}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => scrollToSection("contacto")} className="mt-9 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0c73e8] transition hover:gap-3">
                    Quiero revisar este frente <ArrowRight className="size-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="nosotros" className="relative overflow-hidden bg-[#083b78] py-24 text-white lg:py-36">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px)", backgroundSize: "92px 92px" }} />
          <div className="absolute -right-28 top-20 size-[420px] rounded-full border border-white/15" />
          <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-10">
            <motion.div {...reveal}>
              <p className="section-eye text-[#8fc8ff]">Quiénes somos</p>
              <h2 className="mt-5 max-w-[680px] font-serif text-[clamp(3rem,5.3vw,5.4rem)] leading-[.9] tracking-[-0.07em] text-white">
                La transparencia no es un discurso. <em className="font-normal text-[#8fc8ff]">Es una forma de trabajar.</em>
              </h2>
              <p className="mt-8 max-w-[595px] text-[16px] leading-8 text-[#d1e6ff]">
                En Sinteconta convertimos la información contable en conversaciones útiles: qué está pasando, qué requiere atención y qué decisión conviene preparar. Sin capas innecesarias. Sin respuestas enredadas.
              </p>
              <div className="mt-11 grid max-w-[690px] gap-px overflow-hidden rounded-[22px] border border-white/15 bg-white/15 sm:grid-cols-3">
                {[
                  ["Criterio", "Leer más allá del comprobante."],
                  ["Cercanía", "Acompañar sin complicar."],
                  ["Rigor", "Sustentar cada siguiente paso."],
                ].map(([title, copy]) => (
                  <div key={title} className="bg-[#083b78]/80 p-5 backdrop-blur-sm">
                    <span className="mb-7 block size-2 rounded-full bg-[#5faffc]" />
                    <h3 className="font-serif text-[24px] tracking-[-.04em] text-white">{title}</h3>
                    <p className="mt-2 text-[12px] leading-5 text-[#b9d7f7]">{copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...reveal} transition={{ duration: 0.75, delay: 0.1 }} className="relative justify-self-end">
              <div className="relative max-w-[545px] overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.18)] audit-frame">
                <img src="/manus-storage/sinteconta-nosotros_66730cd9.jpg" alt="Profesionales conversando sobre una revisión de información" className="aspect-[4/3] w-full rounded-[19px] object-cover object-center" />
                <div className="absolute right-7 top-7 border-l border-white/50 pl-3 text-[9px] font-extrabold tracking-[.16em] text-white/90">REGISTRO VISUAL<br /><span className="text-[#8fc8ff]">REV. 02 · CLARO</span></div>
                <div className="absolute bottom-8 left-7 rounded-[18px] border border-white/20 bg-[#072f62]/85 px-5 py-4 shadow-xl backdrop-blur-md">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#93caff]">Nuestro estándar</p>
                  <p className="mt-1 font-serif text-[22px] leading-5 tracking-[-.045em] text-white">Claridad que se puede seguir.</p>
                </div>
              </div>
              <div className="absolute -right-5 -top-5 grid size-16 place-items-center rounded-full bg-[#0c73e8] shadow-[0_14px_28px_rgba(0,0,0,.2)]"><Sparkles className="size-6 text-white" /></div>
            </motion.div>
          </div>
        </section>

        <section id="equipo" className="relative bg-[#f3f8fe] py-24 lg:py-36">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
            <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="section-eye">Equipo que se articula</p>
                <h2 className="mt-5 max-w-[640px] font-serif text-[clamp(2.8rem,5vw,5.1rem)] leading-[.92] tracking-[-.068em] text-[#083b78]">
                  Personas expertas. <em className="font-normal text-[#0c73e8]">Una misma lectura del negocio.</em>
                </h2>
              </div>
              <p className="max-w-[390px] text-[15px] leading-7 text-[#55718d]">Cada necesidad se conecta con el conocimiento adecuado para que la conversación avance y la información no se pierda entre áreas.</p>
            </motion.div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-[#cfdef0] bg-[#cfdef0] lg:grid-cols-3">
              {[
                { number: "01", title: "Dirección y lectura", copy: "Una mirada que conecta información financiera, prioridades y decisiones.", icon: Scale, accent: "bg-[#083b78] text-white" },
                { number: "02", title: "Especialistas de proceso", copy: "Contabilidad, impuestos y nómina coordinados con detalle y trazabilidad.", icon: ShieldCheck, accent: "bg-white text-[#083b78]" },
                { number: "03", title: "Acompañamiento cercano", copy: "Una conversación que aterriza hallazgos y mantiene el siguiente paso visible.", icon: Clock3, accent: "bg-[#0c73e8] text-white" },
              ].map((member, index) => {
                const Icon = member.icon;
                return (
                  <motion.article
                    key={member.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className={`group relative min-h-[310px] p-7 shadow-[0_14px_34px_rgba(8,59,120,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(8,59,120,0.1)] ${member.accent}`}
                  >
                    <span className={`absolute left-7 right-7 top-[92px] h-px ${index === 0 || index === 2 ? "bg-white/20" : "bg-[#d8e8f8]"}`} />
                    <div className="flex items-start justify-between">
                        <span className={`text-[11px] font-extrabold tracking-[.14em] ${index === 0 || index === 2 ? "text-white/60" : "text-[#89a8ca]"}`}>NODO · {member.number}</span>
                      <span className={`grid size-12 place-items-center rounded-2xl ${index === 0 ? "bg-white/12" : index === 2 ? "bg-white/15" : "bg-[#eaf4ff]"}`}><Icon className="size-6" /></span>
                    </div>
                    <div className="mt-20">
                      <h3 className="font-serif text-[33px] leading-[.95] tracking-[-.055em]">{member.title}</h3>
                      <p className={`mt-5 max-w-[280px] text-[14px] leading-6 ${index === 0 || index === 2 ? "text-white/76" : "text-[#54718d]"}`}>{member.copy}</p>
                      <p className={`mt-6 text-[9px] font-extrabold tracking-[.14em] ${index === 0 || index === 2 ? "text-white/55" : "text-[#8ca9c5]"}`}>RUTA DE SOPORTE / ACTIVA</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
          <div className="absolute inset-y-0 right-0 w-[46%] bg-[#eaf4ff]" />
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
            <motion.div {...reveal} className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="section-eye">Conversaciones que abren camino</p>
                <div className="audit-caption mt-4"><span className="audit-dot" /> AGENDA DE PRIORIDADES · 03 PUNTOS DE ENTRADA</div>
                <h2 className="mt-4 font-serif text-[clamp(2.6rem,4.5vw,4.6rem)] leading-[.92] tracking-[-.065em] text-[#083b78]">El siguiente paso no tiene por qué ser complejo.</h2>
              </div>
              <p className="max-w-[318px] text-[14px] leading-6 text-[#55718d]">Una serie de puntos de entrada para abordar lo que hoy requiere mayor atención.</p>
            </motion.div>

            <Carousel setApi={setCarouselApi} opts={{ loop: true, align: "start" }} className="relative">
              <CarouselContent className="-ml-0">
                {promotions.map((promotion, index) => (
                  <CarouselItem key={promotion.title} className="pl-0">
                    <div className={`relative min-h-[390px] overflow-hidden rounded-[30px] border p-7 sm:p-10 lg:min-h-[410px] lg:p-12 ${promotion.tone === "light" ? "border-[#d6e5f7] bg-[#f1f7ff] text-[#083b78]" : promotion.tone === "blue" ? "border-[#0c73e8] bg-[#0c73e8] text-white" : "border-[#083b78] bg-[#083b78] text-white"}`}>
                      {index === 0 && <img src="/manus-storage/sinteconta-promo_b601f496.jpg" alt="Folder azul sobre superficie clara" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply" />}
                      {index !== 0 && <div className="absolute -right-20 -top-24 size-[390px] rounded-full border border-white/15" />}
                      {index === 2 && <div className="absolute bottom-0 right-0 h-full w-1/3 bg-[linear-gradient(135deg,transparent_0%,rgba(12,115,232,.7)_100%)]" />}
                      <div className="relative grid min-h-[300px] max-w-[780px] content-between">
                        <div className="flex items-center gap-3">
                          <span className={`size-2 rounded-full ${promotion.tone === "light" ? "bg-[#0c73e8]" : "bg-[#8dc9ff]"}`} />
                          <p className={`text-[11px] font-extrabold uppercase tracking-[.16em] ${promotion.tone === "light" ? "text-[#3473b8]" : "text-white/70"}`}>REF {String(index + 1).padStart(2, "0")} · {promotion.eyebrow}</p>
                        </div>
                        <div className="mt-12">
                          <h3 className="max-w-[700px] font-serif text-[clamp(2.6rem,5.5vw,5.7rem)] leading-[.88] tracking-[-.07em]">{promotion.title}</h3>
                          <p className={`mt-7 max-w-[520px] text-[15px] leading-7 ${promotion.tone === "light" ? "text-[#50708f]" : "text-white/75"}`}>{promotion.description}</p>
                          <button type="button" onClick={() => scrollToSection("contacto")} className={`mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 text-[12px] font-extrabold transition active:scale-[.97] ${promotion.tone === "light" ? "bg-[#083b78] text-white hover:bg-[#0c73e8]" : "bg-white text-[#083b78] hover:bg-[#dceeff]"}`}>
                            {promotion.cta} <ArrowRight className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {promotions.map((promotion, index) => (
                    <button
                      key={promotion.title}
                      type="button"
                      onClick={() => carouselApi?.scrollTo(index)}
                      aria-label={`Ir al banner ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${currentSlide === index ? "w-9 bg-[#083b78]" : "w-3 bg-[#c4d9ef] hover:bg-[#88b8e8]"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious className="static size-10 translate-y-0 rounded-full border-[#c8dbef] bg-white text-[#083b78] hover:bg-[#eff7ff] disabled:opacity-35" />
                  <CarouselNext className="static size-10 translate-y-0 rounded-full border-[#c8dbef] bg-white text-[#083b78] hover:bg-[#eff7ff] disabled:opacity-35" />
                </div>
              </div>
            </Carousel>
          </div>
        </section>

        <section id="preguntas" className="relative bg-[#f3f8fe] py-24 lg:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-10">
            <motion.div {...reveal}>
              <p className="section-eye">Preguntas frecuentes</p>
              <h2 className="mt-5 max-w-[470px] font-serif text-[clamp(2.8rem,4.7vw,4.8rem)] leading-[.91] tracking-[-.07em] text-[#083b78]">Resolver dudas también es parte del trabajo.</h2>
              <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#55718d]">Si no encuentras tu situación aquí, conversemos. La primera conversación está pensada justamente para dar contexto y despejar el camino.</p>
              <button type="button" onClick={() => scrollToSection("contacto")} className="mt-9 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0c73e8] transition hover:gap-3">Hacer una pregunta <CircleHelp className="size-4" /></button>
            </motion.div>
            <motion.div {...reveal} transition={{ duration: 0.75, delay: 0.08 }}>
              <div className="mb-0 flex items-center justify-between rounded-t-[25px] border border-b-0 border-[#d7e6f7] bg-[#eaf4ff] px-6 py-4 text-[10px] font-extrabold tracking-[.14em] text-[#3b72aa] sm:px-8"><span>REGISTRO DE CONSULTAS</span><span>05 RESPUESTAS</span></div>
              <Accordion type="single" collapsible className="rounded-b-[25px] border border-[#d7e6f7] bg-white px-6 shadow-[0_15px_35px_rgba(8,59,120,0.06)] sm:px-8">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="border-[#dce8f5]">
                    <AccordionTrigger className="py-6 text-[15px] leading-6 font-extrabold text-[#173f6d] hover:no-underline sm:text-[16px]"><span className="flex gap-4"><span className="shrink-0 text-[10px] tracking-[.12em] text-[#77a5d5]">0{index + 1}</span>{faq.question}</span></AccordionTrigger>
                    <AccordionContent className="max-w-[670px] pb-6 text-[14px] leading-7 text-[#5b7691]">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <section id="contacto" className="relative overflow-hidden bg-[#083b78] py-24 text-white lg:py-36">
          <div className="absolute -left-40 top-0 size-[500px] rounded-full border border-white/10" />
          <div className="absolute bottom-0 right-[12%] h-[72%] w-px bg-[linear-gradient(transparent,#5caaff,transparent)]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 lg:grid-cols-[.88fr_1.12fr] lg:px-10">
            <motion.div {...reveal}>
              <p className="section-eye text-[#8fc8ff]">Contacto</p>
              <div className="audit-caption mt-5 text-[#9ecfff]"><span className="audit-dot bg-[#8fc8ff]" /> CANAL DE ENTRADA · REF. 2026</div>
              <h2 className="mt-5 max-w-[570px] font-serif text-[clamp(3rem,5.4vw,5.7rem)] leading-[.89] tracking-[-.073em]">Tu siguiente decisión merece <em className="font-normal text-[#8fc8ff]">claridad.</em></h2>
              <p className="mt-8 max-w-[490px] text-[16px] leading-8 text-[#c4dcf8]">Cuéntanos en qué momento está tu empresa. Empezaremos por entender lo que necesitas ver, ordenar o anticipar.</p>
              <div className="mt-12 max-w-[420px] border-t border-white/15 pt-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-[#8fc8ff]"><MessageCircle className="size-5" /></span>
                  <div>
                    <p className="text-[12px] font-extrabold text-white">Una conversación con contexto</p>
                    <p className="mt-1 text-[12px] leading-5 text-[#b5d3f5]">Sin formularios eternos ni respuestas genéricas. El primer paso es mirar bien el punto de partida.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.form {...reveal} transition={{ duration: 0.75, delay: 0.1 }} onSubmit={handleForm} className="rounded-[30px] border border-white/15 bg-white/10 p-6 shadow-[0_28px_60px_rgba(0,0,0,.16)] backdrop-blur-md sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#a7c8ee]">Tu nombre</span>
                  <input required name="name" placeholder="¿Cómo te llamas?" className="contact-input" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#a7c8ee]">Correo de trabajo</span>
                  <input required type="email" name="email" placeholder="nombre@empresa.com" className="contact-input" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#a7c8ee]">¿Qué necesitas mirar?</span>
                <select required defaultValue="" name="need" className="contact-input appearance-none">
                  <option value="" disabled>Selecciona el tema más cercano</option>
                  <option value="crecimiento">Ordenar para crecer</option>
                  <option value="contabilidad">Contabilidad y cierres</option>
                  <option value="tributario">Planeación tributaria</option>
                  <option value="nomina">Nómina y equipo</option>
                  <option value="otro">Otro desafío</option>
                </select>
              </label>
              <label className="mt-5 block">
                <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#a7c8ee]">Un poco de contexto</span>
                <textarea required name="message" rows={4} placeholder="¿Qué situación quieres resolver o qué decisión necesitas preparar?" className="contact-input resize-none" />
              </label>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-[13px] font-extrabold text-[#083b78] transition hover:bg-[#dceeff] active:scale-[.97]">Solicitar conversación <ArrowRight className="size-4" /></button>
                <p className="max-w-[220px] text-[11px] leading-5 text-[#a7c8ee]">Tu información se usa solo para dar seguimiento a esta conversación.</p>
              </div>
              {formSent && <p role="status" className="mt-5 rounded-xl border border-[#7ebeff]/40 bg-[#0c73e8]/30 px-4 py-3 text-[12px] font-semibold leading-5 text-[#e9f5ff]">Gracias. La solicitud quedó registrada en esta demostración; conecta el formulario a tu canal comercial antes de publicar.</p>}
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-[#062f61] py-8 text-[#afcae8]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/sinteconta-logo_57ae1857.png" alt="Símbolo Sinteconta" className="size-11 rounded-[13px] border border-white/40 bg-white p-1.5" />
            <span><span className="block font-serif text-[25px] leading-5 tracking-[-.06em] text-white">Sinteconta</span><span className="mt-2 block text-[8px] font-extrabold tracking-[.18em] text-[#91b9e5]">SELLO DE CLARIDAD · SAS</span></span>
          </div>
          <p className="text-[11px] font-semibold">Contabilidad, impuestos y nómina con claridad estratégica.</p>
          <p className="text-[11px]">© {new Date().getFullYear()} Sinteconta SaS</p>
        </div>
      </footer>
    </div>
  );
}
