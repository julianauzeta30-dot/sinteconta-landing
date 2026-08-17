/**
 * Identidad oficial Sinteconta: Avenir Next + Helvetica Neue, Azul noche #0B2D5C,
 * Azul principal #1E6BC7, Azul claro #71A9E6, Azul niebla #DCEBFA y blanco.
 * La experiencia prioriza fondo audiovisual, fotografía documental y calma ejecutiva.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CirclePlay,
  FileText,
  Landmark,
  Menu,
  MessageCircle,
  Pause,
  Plus,
  ShieldCheck,
  UsersRound,
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
} from "@/components/ui/carousel";

const heroFrames = [
  {
    label: "Narrativa en movimiento",
    image: "/manus-storage/sinteconta-hero-reference_692b211c.jpg",
    alt: "Escena ejecutiva luminosa de Sinteconta",
  },
  {
    label: "Una conversación con rumbo",
    image: "/manus-storage/sinteconta-servicios-personas_5630ecff.jpg",
    alt: "Asesoría financiera en conversación",
  },
  {
    label: "Orden que se puede ver",
    image: "/manus-storage/sinteconta-proceso_2e4e2fa2.jpg",
    alt: "Documentos y proceso financiero ordenado",
  },
];

const services = [
  {
    number: "01",
    label: "Contabilidad estratégica",
    title: "Convierte cada cierre en un punto de partida.",
    copy: "Información financiera organizada para leer la operación, detectar oportunidades y decidir con visión de negocio.",
    outcomes: ["Cierres con lectura ejecutiva", "Reportes que dan contexto", "Procesos contables trazables"],
    icon: BarChart3,
  },
  {
    number: "02",
    label: "Planeación tributaria",
    title: "Anticipa obligaciones sin perder foco en crecer.",
    copy: "Un calendario y una conversación permanente para transformar la carga tributaria en un frente planificado.",
    outcomes: ["Planeación con criterio", "Declaraciones acompañadas", "Prioridades visibles"],
    icon: Landmark,
  },
  {
    number: "03",
    label: "Nómina y equipo",
    title: "Cuida tu operación desde las personas.",
    copy: "Novedades, liquidaciones y seguridad social bajo un flujo claro que acompaña el ritmo de tu empresa.",
    outcomes: ["Nómina sin fricción", "Soporte oportuno", "Rutinas de control"],
    icon: UsersRound,
  },
];

const faqs = [
  {
    question: "¿Pueden acompañar a una empresa que ya cuenta con contador interno?",
    answer: "Sí. El acompañamiento puede complementar a un equipo interno en revisión, cierres, planeación o frentes específicos. Primero definimos el alcance y la forma de trabajo que más aporte a la operación.",
  },
  {
    question: "¿Cómo identificamos el servicio adecuado para nuestra situación?",
    answer: "La conversación inicial parte del momento real de la empresa: crecimiento, orden, impuestos o equipo. Con ese contexto proponemos una ruta concreta y priorizada.",
  },
  {
    question: "¿Pueden ayudar si la información contable está atrasada o dispersa?",
    answer: "Sí. Se revisa el punto de partida, se identifica lo crítico y se diseña un plan de organización que permita recuperar visibilidad sin detener la operación.",
  },
  {
    question: "¿El acompañamiento puede ser por proyecto o de forma continua?",
    answer: "Ambas modalidades son posibles. La propuesta depende de la urgencia, el alcance y el nivel de soporte que la empresa necesita para sostener el proceso.",
  },
];

const motionProps = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.62 },
};

function scrollToSection(section: string) {
  document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHeroFrame, setActiveHeroFrame] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const service = services[activeService];
  const ServiceIcon = service.icon;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectHeroFrame = (index: number) => {
    setActiveHeroFrame(index);
    if (index === 0) {
      void videoRef.current?.play().catch(() => undefined);
    } else {
      videoRef.current?.pause();
    }
  };

  const navigate = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <div className="sinteconta-site">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="page-shell header-inner">
          <button type="button" className="brand-lockup" onClick={() => navigate("inicio")} aria-label="Ir al inicio">
            <img className="brand-logo brand-logo-light" src="/manus-storage/sinteconta-logo-horizontal-claro_0e71b92e.png" alt="Sinteconta Asesores" />
            <img className="brand-logo brand-logo-dark" src="/manus-storage/sinteconta-logo-horizontal_79cff61d.png" alt="Sinteconta Asesores" />
          </button>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {["Servicios", "Nosotros", "Equipo", "Preguntas"].map((label) => (
              <button key={label} type="button" onClick={() => navigate(label.toLowerCase())}>{label}</button>
            ))}
          </nav>

          <button type="button" className="header-cta" onClick={() => navigate("contacto")}>Agenda una conversación <ArrowRight size={16} /></button>
          <button type="button" className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {["Servicios", "Nosotros", "Equipo", "Preguntas"].map((label) => (
              <button key={label} type="button" onClick={() => navigate(label.toLowerCase())}>{label}<ChevronRight size={16} /></button>
            ))}
            <button type="button" className="mobile-menu-cta" onClick={() => navigate("contacto")}>Agenda una conversación</button>
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <img className="hero-poster" src={heroFrames[activeHeroFrame].image} alt="" aria-hidden="true" />
          <video ref={videoRef} className={`hero-video ${activeHeroFrame === 0 ? "is-playing" : "is-paused"}`} autoPlay muted loop playsInline poster={heroFrames[0].image} aria-label="Video de fondo: acompañamiento financiero en una oficina luminosa">
            <source src="/manus-storage/sinteconta-hero-background_2174b6e9.mp4" type="video/mp4" />
          </video>
          <div className="hero-scrim" />
          <div className="hero-grid" />

          <div className="page-shell hero-content">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.74 }} className="hero-copy">
              <p className="eyebrow eyebrow-light"><span /> Dossier de apertura · Sinteconta Asesores</p>
              <h1>La claridad que tu empresa necesita para <span>avanzar.</span></h1>
              <p className="hero-lead">Contabilidad, planeación tributaria y nómina con una mirada estratégica para empresas que quieren decidir mejor, hoy y después.</p>
              <div className="hero-actions">
                <button type="button" className="button-primary button-white" onClick={() => navigate("contacto")}>Solicita un diagnóstico inicial <ArrowRight size={17} /></button>
                <button type="button" className="text-button text-button-light" onClick={() => navigate("servicios")}>Revisa los frentes de apoyo <ArrowDownRight size={17} /></button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.74, delay: 0.14 }} className="hero-evidence">
              <span className="evidence-line" />
              <p className="evidence-number">EXP. 01 / 03</p>
              <p className="evidence-label">Perspectiva financiera<br />para decisiones reales.</p>
              <p className="evidence-note">ANÁLISIS · RUTA · DECISIÓN</p>
              <span className="evidence-orb"><CirclePlay size={20} /></span>
            </motion.div>
          </div>

          <div className="page-shell hero-filmstrip-wrap">
            <div className="hero-filmstrip" role="tablist" aria-label="Secuencia visual del hero">
              {heroFrames.map((frame, index) => (
                <button key={frame.label} type="button" role="tab" aria-selected={activeHeroFrame === index} className={`film-frame ${activeHeroFrame === index ? "is-active" : ""}`} onClick={() => selectHeroFrame(index)}>
                  <img src={frame.image} alt={frame.alt} />
                  <span>{index === 0 && activeHeroFrame === 0 ? <Pause size={13} /> : <Plus size={13} />}{frame.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="brand-statement">
          <div className="page-shell statement-inner">
            <p>CONTABILIDAD ESTRATÉGICA</p><i />
            <p>PLANEACIÓN TRIBUTARIA</p><i />
            <p>NÓMINA CON PROPÓSITO</p><i />
            <p>DECISIONES CON RESPALDO</p>
          </div>
        </section>

        <section id="servicios" className="section section-white services-section">
          <div className="page-shell">
            <motion.div {...motionProps} className="section-heading split-heading">
              <div><p className="eyebrow">Servicios</p><p className="section-register">REGISTRO 01 · FRENTES DE APOYO</p><h2>Todo lo que necesitas para <span>tomar el control.</span></h2></div>
              <div className="heading-evidence"><b>03</b><p>Frentes articulados para llevar la información financiera a la decisión.</p></div>
            </motion.div>

            <div className="services-layout">
              <div className="service-switcher" role="tablist" aria-label="Servicios de Sinteconta">
                {services.map((item, index) => {
                  const Icon = item.icon;
                  return <button key={item.label} type="button" role="tab" aria-selected={activeService === index} onClick={() => setActiveService(index)} className={`service-tab ${activeService === index ? "is-active" : ""}`}>
                    <span className="service-index">{item.number}</span><Icon size={20} /><span>{item.label}</span><ArrowRight size={16} />
                  </button>;
                })}
              </div>

              <motion.article key={service.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }} className="service-detail">
                <img src="/manus-storage/sinteconta-servicios-personas_5630ecff.jpg" alt="Asesoría contable personalizada con Sinteconta" />
                <div className="service-detail-overlay" />
                <div className="service-detail-content">
                  <div className="service-detail-top"><span>CASO {service.number} · REGISTRO ACTIVO</span><span><ServiceIcon size={17} /></span></div>
                  <div><h3>{service.title}</h3><p>{service.copy}</p></div>
                  <ul>{service.outcomes.map((outcome) => <li key={outcome}><Check size={15} /> {outcome}</li>)}</ul>
                  <button type="button" className="text-button text-button-light" onClick={() => navigate("contacto")}>Definir mi siguiente paso <ArrowRight size={16} /></button>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section id="nosotros" className="section section-mist narrative-section">
          <div className="page-shell narrative-layout">
            <motion.div {...motionProps} className="narrative-media">
              <img src="/manus-storage/sinteconta-proceso_2e4e2fa2.jpg" alt="Proceso contable ordenado sobre una mesa de trabajo" />
              <div className="photo-marker photo-marker-bottom"><span>02</span><p>PROCESOS CLAROS<br />QUE SÍ SE SOSTIENEN.</p></div>
            </motion.div>
            <motion.div {...motionProps} transition={{ duration: 0.62, delay: 0.1 }} className="narrative-copy">
              <p className="eyebrow">Quiénes somos</p><p className="section-register">REGISTRO 02 · FORMA DE TRABAJAR</p>
              <h2>La mejor asesoría financiera empieza por <span>escuchar bien.</span></h2>
              <p>Detrás de cada cierre, obligación o novedad hay una empresa buscando estabilidad para crecer. En Sinteconta trabajamos desde esa realidad: la de quienes necesitan respuestas claras, procesos ordenados y un equipo que acompaña de cerca.</p>
              <div className="principle-list">
                <div><span>01</span><h3>Lectura de negocio</h3><p>Los números no se entregan: se explican en contexto.</p></div>
                <div><span>02</span><h3>Comunicación directa</h3><p>Priorizamos lo importante y lo convertimos en próximos pasos.</p></div>
                <div><span>03</span><h3>Rigor que acompaña</h3><p>Procesos claros, evidencia disponible y seguimiento útil.</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="equipo" className="section section-navy team-section">
          <div className="page-shell team-layout">
            <motion.div {...motionProps} className="team-copy">
              <p className="eyebrow eyebrow-light">Nuestro equipo</p><p className="section-register section-register-light">REGISTRO 03 · RED DE ESPECIALISTAS</p>
              <h2>Expertos que ven el detalle y entienden <span>el conjunto.</span></h2>
              <p>Un equipo articulado para conectar la realidad contable, tributaria y laboral de tu empresa con sus próximas decisiones.</p>
              <div className="team-roles"><div className="team-register"><span>SELLO DE CLARIDAD</span><span>SC / 03</span></div>
                <div><FileText size={19} /><span>Contabilidad y cierres</span></div>
                <div><Landmark size={19} /><span>Planeación tributaria</span></div>
                <div><BriefcaseBusiness size={19} /><span>Nómina y soporte operativo</span></div>
              </div>
            </motion.div>
            <motion.div {...motionProps} transition={{ duration: 0.62, delay: 0.1 }} className="team-media">
              <img src="/manus-storage/sinteconta-equipo_993ca8aa.jpg" alt="Equipo de asesores Sinteconta trabajando de manera colaborativa" />
              <div className="photo-marker photo-marker-top"><span>03</span><p>EL VALOR DE<br />TRABAJAR EN EQUIPO.</p></div>
            </motion.div>
          </div>
        </section>

        <section className="section promotion-section">
          <div className="page-shell">
            <motion.div {...motionProps} className="section-heading promotion-heading"><div><p className="eyebrow">Conversaciones que abren camino</p><p className="section-register">REGISTRO 04 · PUNTO DE PARTIDA</p><h2>Un primer paso claro puede cambiar <span>todo lo que sigue.</span></h2></div></motion.div>
            <Carousel opts={{ loop: true, align: "start" }} className="promotion-carousel">
              <CarouselContent>
                <CarouselItem><article className="promotion-card promotion-image-card"><img src="/manus-storage/sinteconta-contacto_57177531.jpg" alt="Empresario revisando un momento de decisión" /><div /><div className="promotion-content"><p>DIAGNÓSTICO INICIAL · REF. 04</p><h3>Hagamos visible el punto de partida.</h3><span>Una conversación para entender el reto, ordenar prioridades y definir una ruta de acción.</span><button type="button" onClick={() => navigate("contacto")}>Definir mi punto de partida <ArrowRight size={16} /></button></div></article></CarouselItem>
                <CarouselItem><article className="promotion-card promotion-blue-card"><span className="promotion-count">01 / 02</span><div className="promotion-content"><p>CIERRES CON PERSPECTIVA</p><h3>Menos incertidumbre. Más contexto para decidir.</h3><span>Revisa tu operación con una lectura contable que acompaña el siguiente movimiento.</span><button type="button" onClick={() => navigate("contacto")}>Preparar mi cierre <ArrowRight size={16} /></button></div><div className="promotion-stamp">SC</div></article></CarouselItem>
              </CarouselContent>
              <div className="promo-controls"><CarouselPrevious className="promo-control" /><CarouselNext className="promo-control" /></div>
            </Carousel>
          </div>
        </section>

        <section id="preguntas" className="section section-white faq-section">
          <div className="page-shell faq-layout">
            <motion.div {...motionProps} className="faq-intro"><p className="eyebrow">Preguntas frecuentes</p><p className="section-register">REGISTRO 05 · RESPUESTAS CLARAS</p><h2>La claridad también empieza por una <span>buena pregunta.</span></h2><p>Si no ves tu situación aquí, cuéntanosla. La conversación inicial está pensada para entender el contexto antes de proponer una respuesta.</p><button type="button" className="text-button" onClick={() => navigate("contacto")}>Revisar mi situación <MessageCircle size={17} /></button></motion.div>
            <motion.div {...motionProps} transition={{ duration: 0.62, delay: 0.1 }}>
              <Accordion type="single" collapsible className="faq-list">
                {faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger><span><b>0{index + 1}</b>{faq.question}</span></AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <div className="contact-backdrop" />
          <div className="page-shell contact-layout">
            <motion.div {...motionProps} className="contact-copy"><p className="eyebrow eyebrow-light">Contacto</p><p className="section-register section-register-light">REGISTRO 06 · AGENDA DE DIAGNÓSTICO</p><h2>El siguiente paso puede ser una <span>conversación.</span></h2><p>Cuéntanos qué está pasando en tu empresa. Empezaremos por entender lo que quieres ordenar, anticipar o hacer visible.</p><div className="contact-mark"><img src="/manus-storage/sinteconta-isologo-claro_2e64094f.png" alt="Isologo Sinteconta" /><span>Tu ayuda<br />contable y financiera.</span></div></motion.div>
            <motion.form {...motionProps} transition={{ duration: 0.62, delay: 0.1 }} className="contact-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}>
              <div className="form-row"><label>Tu nombre<input required name="name" placeholder="¿Cómo te llamas?" /></label><label>Correo de trabajo<input required type="email" name="email" placeholder="nombre@empresa.com" /></label></div>
              <label>Tu empresa<input required name="company" placeholder="Nombre de tu empresa" /></label>
              <label>¿En qué podemos ayudarte?<select required defaultValue=""><option value="" disabled>Elige el tema más cercano</option><option value="contabilidad">Contabilidad y cierres</option><option value="impuestos">Planeación tributaria</option><option value="nomina">Nómina y equipo</option><option value="orden">Orden y diagnóstico</option></select></label>
              <label>Un poco de contexto<textarea required name="message" rows={4} placeholder="¿Qué situación quieres resolver o qué decisión necesitas preparar?" /></label>
              <div className="form-submit"><button type="submit" className="button-primary">Agendar diagnóstico <ArrowRight size={17} /></button><small>Usaremos tus datos únicamente para dar seguimiento a esta conversación.</small></div>
              {formSent && <p className="form-success">Gracias. Tu solicitud quedó registrada en esta demostración; conecta este formulario a tu canal comercial antes de publicar.</p>}
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-shell footer-inner"><img src="/manus-storage/sinteconta-logo-horizontal-claro_0e71b92e.png" alt="Sinteconta Asesores" /><p>Tu ayuda contable y financiera.</p><p>© {new Date().getFullYear()} Sinteconta SaS</p></div></footer>
    </div>
  );
}
