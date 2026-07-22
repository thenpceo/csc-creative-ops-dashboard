import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Database,
  FilmSlate,
  MagnifyingGlass,
  SquaresFour,
  Stack,
} from "@phosphor-icons/react";
import portfolio from "./data/portfolio.generated.json";

const categories = ["All", "Home", "Outdoor", "Cycling", "Kitchen", "Moto"];
const PUBLIC_MCP_ORIGIN = "https://creative-ops-dashboard-psi.vercel.app";

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (next) => {
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { path, navigate };
}

function BrandLogo({ brand, className = "" }) {
  return brand.logo ? (
    <img className={`brand-logo ${className}`} src={brand.logo} alt={`${brand.name} logo`} />
  ) : (
    <span className={`brand-name-logo ${className}`}>{brand.name}</span>
  );
}

function ShellHeader({ onHome, detailBrand }) {
  return (
    <header className="shell-header">
      <button className="wordmark" onClick={onHome} aria-label="Open creative operations dashboard">
        CSC / GENERATION
      </button>
      <div className="header-context">
        <span className="signal-dot" aria-hidden="true" />
        <span>CREATIVE OPS</span>
        {detailBrand && <span className="context-brand">/ {detailBrand.name}</span>}
      </div>
      <div className="header-meta">
        <span>13 BRAND SYSTEMS</span>
        <span className="live-label">LIVE</span>
      </div>
    </header>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function McpInstallPanel() {
  const [copied, setCopied] = useState("");
  const endpoint = `${PUBLIC_MCP_ORIGIN}/api/mcp`;
  const manifestUrl = `${PUBLIC_MCP_ORIGIN}/api/mcp-manifest`;
  const agentLine = `Install the CSC Creative Ops MCP from ${endpoint} and use it for every CSC brand creative request.`;
  const codexLine = `codex mcp add csc-creative-ops --url ${endpoint}`;

  const copy = async (value, label) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  };

  return (
    <section className="mcp-install" aria-labelledby="mcp-install-title">
      <div className="mcp-install-heading">
        <div>
          <span className="mcp-index">00</span>
          <div>
            <span className="mcp-eyebrow">PUBLIC REMOTE MCP</span>
            <h2 id="mcp-install-title">Give your agent one line.</h2>
          </div>
        </div>
        <a href={manifestUrl} target="_blank" rel="noreferrer"><span className="signal-dot" /> 13 systems live</a>
      </div>
      <div className="mcp-agent-line">
        <code>{agentLine}</code>
        <button onClick={() => copy(agentLine, "agent")} aria-label="Copy agent installation instruction">
          {copied === "agent" ? <Check size={18} /> : <Copy size={18} />}
          {copied === "agent" ? "Copied" : "Copy install line"}
        </button>
      </div>
      <div className="mcp-install-meta">
        <p>Then ask: “Make a One Kings Lane announcement video from this product link.” The agent gets the brand rules, prompts, motion recipe, rights checks, and QA gates before it creates.</p>
        <div className="mcp-cli-line">
          <span>CODEX CLI</span>
          <code>{codexLine}</code>
          <button onClick={() => copy(codexLine, "codex")} aria-label="Copy Codex CLI command">{copied === "codex" ? <Check size={16} /> : <Copy size={16} />}</button>
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand, onOpen, index }) {
  const accent = brand.colors[0]?.value ?? "#1d6378";
  const featured = brand.slug === "one-kings-lane";
  return (
    <button
      className={`brand-card ${featured ? "brand-card-featured" : ""}`}
      style={{ "--brand-accent": accent }}
      onClick={() => onOpen(brand.slug)}
      aria-label={`Open ${brand.name} design system`}
    >
      <div className="card-media">
        {brand.hero && <img src={brand.hero} alt="" />}
        <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
        <div className={`card-status ${brand.status === "Active" ? "" : "card-status-inactive"}`}>
          <span /> {brand.status}
        </div>
      </div>
      <div className="card-content">
        <div className="logo-panel">
          <BrandLogo brand={brand} />
        </div>
        <div className="card-description">
          <p>{brand.description}</p>
          <div className="trait-row">
            {brand.traits.slice(0, featured ? 4 : 2).map((trait) => (
              <span key={trait}>{trait}</span>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <span>{brand.counts.rules} rules · {brand.counts.recipes} recipes</span>
          <ArrowRight size={19} weight="bold" />
        </div>
      </div>
    </button>
  );
}

function Dashboard({ navigate }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const brands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return portfolio.brands.filter((brand) => {
      const categoryMatch = category === "All" || brand.category === category;
      const queryMatch = !normalized || `${brand.name} ${brand.description} ${brand.traits.join(" ")}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [query, category]);
  const totals = portfolio.brands.reduce(
    (result, brand) => ({
      rules: result.rules + brand.counts.rules,
      recipes: result.recipes + brand.counts.recipes,
      assets: result.assets + brand.counts.assets,
    }),
    { rules: 0, recipes: 0, assets: 0 },
  );

  return (
    <div className="app-shell dashboard-shell">
      <ShellHeader onHome={() => navigate("/")} />
      <main>
        <section className="dashboard-hero">
          <McpInstallPanel />
          <div className="hero-kicker"><span /> PORTFOLIO INTELLIGENCE / CREATIVE INFRASTRUCTURE</div>
          <div className="hero-grid">
            <div>
              <h1>One creative operating layer.<br />Thirteen distinct brands.</h1>
              <p>
                A visual command center for the systems, source media, prompts, components, and production rules that keep every CSC brand unmistakably itself.
              </p>
            </div>
            <div className="hero-side-note">
              <Database size={22} />
              <span>Portable brand packages are the source of truth. This dashboard is one consumer.</span>
            </div>
          </div>
          <div className="hero-stats">
            <Stat value="13" label="Brand systems" />
            <Stat value={totals.rules} label="Active rules" />
            <Stat value={totals.recipes} label="Production recipes" />
            <Stat value={totals.assets} label="Local references" />
          </div>
        </section>

        <section className="portfolio-section">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">PORTFOLIO INDEX</span>
              <h2>Brands transformed with Genesis</h2>
            </div>
            <span className="result-count">{brands.length.toString().padStart(2, "0")} / 13</span>
          </div>
          <div className="toolbar">
            <label className="search-field">
              <MagnifyingGlass size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search brands or traits" />
            </label>
            <div className="filter-row" aria-label="Filter brands by category">
              {categories.map((item) => (
                <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
          </div>
          {brands.length ? (
            <div className="brand-grid">
              {brands.map((brand, index) => <BrandCard key={brand.slug} brand={brand} index={index} onOpen={(slug) => navigate(`/brands/${slug}`)} />)}
            </div>
          ) : (
            <div className="empty-state"><MagnifyingGlass size={28} /><h3>No brand systems found.</h3><p>Try a different name or category.</p></div>
          )}
        </section>
      </main>
      <footer className="shell-footer"><span>CSC / GENERATION</span><span>CREATIVE OPS SYSTEM · V1</span></footer>
    </div>
  );
}

function SectionTitle({ index, eyebrow, title, copy }) {
  return (
    <div className="detail-section-title">
      <span className="section-index">{index}</span>
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return <button className="copy-button" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy prompt"}</button>;
}

function OneKingsLaneDetail({ brand, navigate }) {
  const [buttonState, setButtonState] = useState("Ready");
  const [productPreview, setProductPreview] = useState(null);
  const [imageVariables, setImageVariables] = useState({
    environment: "formal winter garden",
    timeOfDay: "blue hour",
    weather: "light snowfall",
    camera: "natural 55mm eye-level view",
    materials: "weathered stone, clipped boxwood, aged iron",
    copyRegion: "upper left",
  });
  const [videoVariables, setVideoVariables] = useState({
    subjectAction: "fountain water flows gently",
    atmosphere: "a few fine snowflakes settle through the background",
    cameraMove: "almost imperceptible push-in",
    cameraDistance: "six inches",
    duration: "five seconds",
    finalHold: "one second",
  });
  const assets = brand.detailAssets;
  useEffect(() => () => productPreview && URL.revokeObjectURL(productPreview), [productPreview]);

  const imagePrompt = [
    "Use the supplied product image as the non-negotiable identity source. Preserve its silhouette, proportions, stone material, finish, basin, pedestal, water outlets, seams, and every countable detail exactly; do not redesign, simplify, add, remove, duplicate, or substitute any part.",
    `Place the unchanged product as the primary anchor in a ${imageVariables.environment} at ${imageVariables.timeOfDay} with ${imageVariables.weather}.`,
    `Build a collected, livable One Kings Lane setting with ${imageVariables.materials}, believable architecture, restrained color, and shelter-magazine realism.`,
    `Frame with a ${imageVariables.camera}; match product scale, perspective, contact, shadow, reflection, and light direction to the scene. Keep the ${imageVariables.copyRegion} quiet for a separate copy layer.`,
    "No generated words or logos, generic hotel styling, glossy CGI, floating objects, fashion posing, product mutation, or invented ornament. Reject the result if any product identity detail differs from the reference.",
  ].join(" ");

  const videoPrompt = [
    "Animate the supplied start image as one continuous photorealistic shot. The product and room are locked identity references, not redesign suggestions.",
    `Only ${videoVariables.subjectAction} and ${videoVariables.atmosphere} may move.`,
    `The camera performs one ${videoVariables.cameraMove} over ${videoVariables.cameraDistance} for ${videoVariables.duration} at natural eye level.`,
    `Preserve product silhouette, proportions, finish, materials, hardware, seams, countable details, real scale, contact, garden geometry, object placement, and light direction in every frame. End with ${videoVariables.finalHold} of visually calm footage.`,
    "No transformation, invented variant, duplicated object, texture crawl, melting material, warped architecture, sliding objects, speed ramp, text, logo, or people. Reject the full clip on any identity or geometry drift.",
  ].join(" ");

  const updateImageVariable = (key, value) => setImageVariables((current) => ({ ...current, [key]: value }));
  const updateVideoVariable = (key, value) => setVideoVariables((current) => ({ ...current, [key]: value }));
  const fontRoles = [
    ["Display", "Chronicle Display", "48 / 52", "Georgia"],
    ["Section", "Sofia Pro", "30 / 36", "Avenir"],
    ["Body", "Lato", "16 / 25", "Arial"],
    ["Action", "Sofia Pro", "12 / 14", "Arial"],
  ];

  return (
    <div className="app-shell detail-shell okl-theme">
      <ShellHeader onHome={() => navigate("/")} detailBrand={brand} />
      <main>
        <section className="brand-detail-hero">
          <img className="detail-hero-image" src={assets["design-services-banner"] ?? brand.hero} alt="One Kings Lane material and design-services reference" />
          <div className="detail-hero-overlay">
            <button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={17} /> Portfolio index</button>
            <div className="detail-hero-copy">
              <span className="eyebrow">DESIGN SYSTEM / 08 OF 13</span>
              <BrandLogo brand={brand} className="detail-logo" />
              <h1>Live your style.</h1>
              <p>{brand.description}</p>
            </div>
            <div className="detail-status-panel">
              <span>PACKAGE STATUS</span><strong><span className="signal-dot" /> Demo ready · rights gated</strong>
              <div><b>{brand.counts.rules}</b> rules <b>{brand.counts.recipes}</b> recipes <b>{brand.counts.sources}</b> sources</div>
            </div>
          </div>
        </section>

        <nav className="detail-nav" aria-label="Design system sections">
          {[["01","Foundation"],["02","Components"],["03","Imagery"],["04","Prompt lab"],["05","Motion"]].map(([n,label]) => <a key={n} href={`#section-${n}`}>{n} {label}</a>)}
        </nav>

        <section className="detail-content" id="section-01">
          <SectionTitle index="01" eyebrow="BRAND FOUNDATION" title="Cultivated, personal, livable." copy={brand.voiceSummary} />
          <div className="foundation-bento">
            <article className="bento-panel palette-panel">
              <div className="panel-label"><span>COLOR SYSTEM</span><span>VERIFIED</span></div>
              <div className="palette-stack">
                {brand.colors.map((color, index) => (
                  <div className="color-swatch" style={{ backgroundColor: color.value, color: index === 3 ? "#06312B" : "#fff" }} key={color.value}>
                    <span>{color.name.replace("brand.", "")}</span><code>{color.value}</code>
                  </div>
                ))}
              </div>
              <p className="micro-note">Heritage green anchors trust and expertise. Powder is atmospheric. Sale red remains transactional—not decorative.</p>
            </article>

            <article className="bento-panel type-panel">
              <div className="panel-label"><span>TYPE HIERARCHY</span><span>LICENSE AWARE</span></div>
              <div className="type-specimen">
                <span className="type-eyebrow">THE EDIT / SUMMER 2026</span>
                <h3>Rooms with a point of view.</h3>
                <p>Layered materials, lived-in character, and a little design tension make a home feel collected rather than completed.</p>
              </div>
              <div className="type-table">
                {fontRoles.map(([role,font,size,fallback]) => <div key={role}><b>{role}</b><span>{font}</span><code>{size}</code><small>Fallback: {fallback}</small></div>)}
              </div>
            </article>

            <article className="bento-panel voice-panel">
              <div className="panel-label"><span>VOICE CONTROL</span><span>WARM EXPERTISE</span></div>
              <blockquote>“A tailored room should still invite you to put your feet up.”</blockquote>
              <div className="do-dont-grid">
                <div><span className="good">DO</span><p>Be specific about material, provenance, scale, and use.</p></div>
                <div><span className="bad">AVOID</span><p>Generic luxury language, breathless claims, or aloof design jargon.</p></div>
              </div>
              <div className="trait-row large">{brand.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
            </article>

            <article className="bento-panel spacing-panel">
              <div className="panel-label"><span>SPACING RHYTHM</span><span>4PX BASE</span></div>
              <div className="spacing-bars">
                {[4,8,12,16,24,32,48,64].map((size) => <div key={size}><span style={{ width: `${Math.max(size * 2.3, 10)}px` }} /><code>{size}</code></div>)}
              </div>
              <p className="micro-note">Generous white space gives both editorial storytelling and commerce metadata room to breathe.</p>
            </article>
          </div>
        </section>

        <section className="detail-content" id="section-02">
          <SectionTitle index="02" eyebrow="COMPONENT LANGUAGE" title="See the system, not a description of it." copy="Buttons, elevation, shape, and composition are rendered as working specimens." />
          <div className="component-bento">
            <article className="bento-panel button-lab">
              <div className="panel-label"><span>ACTION LAB</span><span>INTERACTIVE</span></div>
              <div className="button-specimens">
                <button className="okl-primary" onClick={() => setButtonState("Primary selected")}>Shop the collection</button>
                <button className="okl-secondary" onClick={() => setButtonState("Secondary selected")}>Explore the edit <ArrowRight size={15} /></button>
                <button className="okl-tertiary" onClick={() => setButtonState("Text action selected")}>Meet the designers</button>
              </div>
              <div className="interaction-readout"><span className="signal-dot" /> {buttonState}</div>
              <dl className="spec-list"><div><dt>Height</dt><dd>48px</dd></div><div><dt>Radius</dt><dd>0px</dd></div><div><dt>Label</dt><dd>12px / 800 / +14.5%</dd></div><div><dt>Touch</dt><dd>44px minimum</dd></div></dl>
            </article>

            <article className="bento-panel shadow-lab">
              <div className="panel-label"><span>ELEVATION</span><span>USE SPARINGLY</span></div>
              <div className="shadow-specimens">
                <div className="shadow-card shadow-0"><span>00</span><b>Flat editorial</b><code>none</code></div>
                <div className="shadow-card shadow-1"><span>01</span><b>Utility lift</b><code>0 6 18 / 08%</code></div>
                <div className="shadow-card shadow-2"><span>02</span><b>Focused object</b><code>0 18 44 / 14%</code></div>
              </div>
              <p className="micro-note">Most surfaces stay flat and square. Elevation belongs to overlays, focused objects, or moments that need depth—not every card.</p>
            </article>

            <article className="bento-panel composition-demo">
              <img src={assets["environment-room-clean-demo"]} alt="Text-free One Kings Lane living room environment" />
              <div className="composition-copy"><span className="type-eyebrow">NEW ARRIVALS</span><h3>The art of the mix.</h3><p>One immersive image. One restrained copy group. One clear action.</p><button className="okl-primary">Shop new arrivals</button></div>
              <div className="composition-caption">EDITORIAL SPLIT / RESPONSIVE RECIPE</div>
            </article>

            <article className="bento-panel shape-panel">
              <div className="panel-label"><span>SHAPE</span><span>SQUARE BY DEFAULT</span></div>
              <div className="radius-row"><div className="radius-none">R0</div><div className="radius-soft">R2</div><div className="radius-round">50%</div></div>
              <p>R0 structures the interface. R2 is a restrained exception. Fully round shapes are reserved for small indicators and controls.</p>
            </article>
          </div>
        </section>

        <section className="detail-content" id="section-03">
          <SectionTitle index="03" eyebrow="IMAGERY SYSTEM" title="Room first. Material specific. Product true." copy="Reference imagery shows the crop, density, lighting, and role each asset should play." />
          <div className="image-gallery">
            <figure className="gallery-environment"><img src={assets["made-in-usa-room"]} alt="Layered living room reference" /><figcaption><b>01 / ENVIRONMENT</b><span>Wide, layered, intentional—not sterile.</span></figcaption></figure>
            <figure className="gallery-context"><img src={assets["austin-fountain-lifestyle"]} alt="Fountain in a styled environment" /><figcaption><b>02 / PRODUCT IN CONTEXT</b><span>Show scale and material truth.</span></figcaption></figure>
            <figure className="gallery-material"><img src={assets["fabric-texture-macro-demo"]} alt="Cinematic macro photograph of powder-blue woven linen" /><figcaption><b>03 / MATERIAL DETAIL</b><span>Raking light makes weave and hand visible.</span></figcaption></figure>
            <figure className="gallery-people" id="people-reference"><img src={assets["people-secondary-room-demo"]} alt="Generated room scene with a person arranging flowers in the background" /><figcaption><b>04 / PEOPLE</b><span>Actual internal demo: contextual, candid, and secondary.</span></figcaption></figure>
            <figure className="gallery-commerce"><img src={assets["chair-studio-commerce-demo"]} alt="Studio product concept of a blue botanical upholstered chair" /><figcaption><b>05 / COMMERCE</b><span>Studio concept: full silhouette and clean material read.</span></figcaption></figure>
          </div>
          <div className="guardrail-strip"><span>NEGATIVE PROMPT / GUARDRAILS</span><p>sterile minimalism · glossy CGI · invented product geometry · fashion posing · floating décor · unreadable texture · fake provenance</p></div>
        </section>

        <section className="detail-content prompt-section" id="section-04">
          <SectionTitle index="04" eyebrow="REFERENCE PROMPT LAB" title="Change the world. Lock the product." copy="Upload an authorized product image, change only the scene variables, then reject any output that fails the product-truth gate." />
          <div className="reference-pipeline" aria-label="Product reference image generation workflow">
            <article className="pipeline-card source-card">
              <div className="pipeline-step"><span>01</span><b>INPUT / PRODUCT TRUTH</b></div>
              <figure className="clean-image-frame">
                <img src={productPreview || assets["austin-fountain-detail"]} alt="Product reference input" />
                <figcaption>{productPreview ? "USER-SUPPLIED PREVIEW" : "VERIFIED AUSTIN FOUNTAIN IMAGE"}</figcaption>
              </figure>
              <label className="file-input">
                <span>Insert your product image</span>
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  setProductPreview(URL.createObjectURL(file));
                }} />
              </label>
              <p>Use only a reference cleared for the intended model and project. The image is the identity source, not a loose inspiration.</p>
            </article>

            <article className="pipeline-card variable-card">
              <div className="pipeline-step"><span>02</span><b>EDIT / SCENE VARIABLES</b></div>
              <div className="variable-grid">
                {[
                  ["environment", "Environment"],
                  ["timeOfDay", "Time of day"],
                  ["weather", "Weather / atmosphere"],
                  ["camera", "Camera / framing"],
                  ["materials", "Supporting materials"],
                  ["copyRegion", "Copy-safe region"],
                ].map(([key, label]) => (
                  <label key={key}><span>{label}</span><input value={imageVariables[key]} onChange={(event) => updateImageVariable(key, event.target.value)} /></label>
                ))}
              </div>
              <div className="variable-presets">
                <button onClick={() => setImageVariables((current) => ({ ...current, environment: "formal winter garden", timeOfDay: "blue hour", weather: "light snowfall" }))}>Winter garden</button>
                <button onClick={() => setImageVariables((current) => ({ ...current, environment: "sunlit summer courtyard", timeOfDay: "late afternoon", weather: "still warm air" }))}>Summer courtyard</button>
                <button onClick={() => setImageVariables((current) => ({ ...current, environment: "glass conservatory", timeOfDay: "soft morning", weather: "rain on the glass" }))}>Conservatory</button>
              </div>
            </article>

            <article className="pipeline-card output-card">
              <div className="pipeline-step"><span>03</span><b>OUTPUT / INTERNAL DEMO</b></div>
              <figure className="clean-image-frame">
                <img src={assets["austin-fountain-winter-garden-demo"]} alt="Generated Austin fountain in a winter garden" />
                <figcaption>GENERATED EXAMPLE · HUMAN FIDELITY REVIEW REQUIRED</figcaption>
              </figure>
              <p>The image itself stays clean—no generated UI, logo, price, or claim. Those are composited later from verified layers.</p>
            </article>
          </div>

          <div className="fidelity-contract">
            <div><span>LOCKED</span><b>Silhouette · proportions · finish · basin · pedestal · outlets · countable details</b></div>
            <div><span>EDITABLE</span><b>Room · time · weather · camera · materials · copy region</b></div>
            <div><span>VERIFY</span><b>Side-by-side review. Any mismatch means reject + regenerate.</b></div>
          </div>

          <div className="prompt-workbench assembled-prompt">
            <article className="prompt-copy-panel">
              <div className="prompt-meta"><span>ASSEMBLED IMAGE PROMPT</span><span>GPT IMAGE DEFAULT</span></div>
              <pre>{imagePrompt}</pre>
              <div className="prompt-actions"><CopyButton text={imagePrompt} /><span>{imagePrompt.split(" ").length} words</span></div>
            </article>
            <article className="prompt-anatomy">
              <div className="panel-label"><span>PROMPT ANATOMY</span><span>AGENT READABLE</span></div>
              <ol>
                <li><b>Reference</b><span>Authorized input image and exact identity role.</span></li>
                <li><b>Variables</b><span>User changes scene, time, weather, camera, and copy space.</span></li>
                <li><b>Brand lock</b><span>Collected rooms, tactile materials, natural light, restrained grade.</span></li>
                <li><b>Product lock</b><span>Geometry and every countable feature remain unchanged.</span></li>
                <li><b>Gate</b><span>Evaluate against input; reject instead of rationalizing drift.</span></li>
              </ol>
            </article>
          </div>
        </section>

        <section className="detail-content" id="section-05">
          <SectionTitle index="05" eyebrow="MOTION + VIDEO" title="Two production modes. One visual identity." copy="Designed motion keeps typography and layout deterministic. Generative video handles cinematic world-building before a controlled brand end frame." />
          <div className="motion-grid">
            <article className="bento-panel motion-preview-panel">
              <div className="panel-label"><span>DESIGNED MOTION / HYPERFRAMES</span><span>ACTUAL 1080P RENDER</span></div>
              <video className="motion-demo-video" controls autoPlay muted loop playsInline poster={assets["austin-fountain-winter-garden-demo"]}>
                <source src="/examples/one-kings-lane/product-feature-motion-demo.mp4?v=b7b92725" type="video/mp4" />
              </video>
              <div className="motion-proof"><span>5.0 SEC</span><span>1920 × 1080</span><span>30 FPS</span><span>CHECK PASSED</span></div>
              <ul className="production-points"><li><Stack size={18} /><b>Layered</b>Logo, type, action, and image stay editable.</li><li><SquaresFour size={18} /><b>Full bleed</b>Image or video fills the frame behind controlled copy.</li><li><FilmSlate size={18} /><b>Deterministic</b>Same inputs produce the same timeline and end frame.</li></ul>
            </article>
            <article className="bento-panel video-reference-panel">
              <div className="panel-label"><span>GENERATIVE VIDEO / FAL.AI</span><span>ADAPTER READY</span></div>
              {assets["generative-video-demo"] ? (
                <video className="generative-demo-video" controls muted loop playsInline><source src={assets["generative-video-demo"]} type="video/mp4" /></video>
              ) : (
                <div className="video-pending">
                  <img src={assets["austin-fountain-winter-garden-demo"]} alt="Start frame for image-to-video generation" />
                  <div><span>START FRAME READY</span><strong>Generation awaits a local FAL_KEY.</strong><p>The adapter is implemented; this panel will use the real output file when the credentialed run completes.</p></div>
                </div>
              )}
              <div className="video-variable-grid">
                {[
                  ["subjectAction", "Subject action"],
                  ["atmosphere", "Environmental motion"],
                  ["cameraMove", "Camera move"],
                  ["cameraDistance", "Camera distance"],
                  ["duration", "Duration"],
                  ["finalHold", "Final hold"],
                ].map(([key, label]) => <label key={key}><span>{label}</span><input value={videoVariables[key]} onChange={(event) => updateVideoVariable(key, event.target.value)} /></label>)}
              </div>
              <details className="video-prompt-details"><summary>View assembled image-to-video prompt</summary><p>{videoPrompt}</p><CopyButton text={videoPrompt} /></details>
            </article>
          </div>

          <div className="motion-guidance-grid">
            {[
              ["01", "ENTRANCES", "Fade or slide 8–48px. Use from-to states so the first frame is deterministic."],
              ["02", "STAGGER", "Reveal eyebrow, title, support, action, and identity 100–180ms apart."],
              ["03", "EASING", "Strong ease-out for titles; softer ease-out for support; sine in-out for background drift."],
              ["04", "TRANSITIONS", "Cut, editorial crossfade, square mask, or measured directional slide. No gimmicks."],
              ["05", "FULL BLEED", "Default to full-frame image or video. Add a heritage field when copy needs contrast."],
              ["06", "REDUCED MOTION", "Remove drift and travel; keep ordered fades, content hierarchy, and readable holds."],
            ].map(([number, title, copy]) => <article key={number}><span>{number}</span><b>{title}</b><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="system-footer-panel">
          <div><span className="eyebrow">PORTABLE BY DESIGN</span><h2>The dashboard is a view.<br />The package is the system.</h2></div>
          <div className="package-map">
            {[["brand.json","Identity"],["tokens.json","Visual primitives"],["rules.json","Constraints"],["recipes.json","Compositions"],["media.json","Sources + rights"],["modules/","Capability guidance"]].map(([file,label]) => <div key={file}><code>{file}</code><span>{label}</span></div>)}
          </div>
          <button className="return-button" onClick={() => navigate("/")}>Return to all 13 brands <ArrowRight size={18} /></button>
        </section>
      </main>
      <footer className="shell-footer"><span>ONE KINGS LANE / DESIGN SYSTEM 1.2</span><span>CSC CREATIVE OPS</span></footer>
    </div>
  );
}

function BrandSummary({ brand, navigate }) {
  const accent = brand.colors[0]?.value ?? "#1e6276";
  return (
    <div className="app-shell detail-shell summary-shell" style={{ "--summary-accent": accent }}>
      <ShellHeader onHome={() => navigate("/")} detailBrand={brand} />
      <main className="summary-main">
        <button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={17} /> Portfolio index</button>
        <div className="summary-grid">
          <section className="summary-copy">
            <span className="eyebrow">DESIGN SYSTEM / PACKAGE OVERVIEW</span>
            <BrandLogo brand={brand} className="summary-logo" />
            <h1>{brand.signature || brand.name}</h1>
            <p>{brand.description}</p>
            <div className="trait-row large">{brand.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
            <div className="summary-stats"><Stat value={brand.counts.rules} label="Rules" /><Stat value={brand.counts.recipes} label="Recipes" /><Stat value={brand.counts.sources} label="Sources" /></div>
          </section>
          <figure className="summary-visual">{brand.homepage && <img src={brand.homepage} alt={`${brand.name} homepage reference`} />}<figcaption>FULL VISUAL DEEP DIVE / NEXT BUILD PASS</figcaption></figure>
        </div>
        <div className="summary-palette">{brand.colors.map((color) => <div key={color.value} style={{ backgroundColor: color.value }}><span>{color.name.replace("brand.", "")}</span><code>{color.value}</code></div>)}</div>
      </main>
      <footer className="shell-footer"><span>{brand.name.toUpperCase()} / PACKAGE OVERVIEW</span><span>CSC CREATIVE OPS</span></footer>
    </div>
  );
}

export function App() {
  const { path, navigate } = useRoute();
  const match = path.match(/^\/brands\/([^/]+)\/?$/);
  if (!match) return <Dashboard navigate={navigate} />;
  const brand = portfolio.brands.find((item) => item.slug === match[1]);
  if (!brand) return <Dashboard navigate={navigate} />;
  if (brand.slug === "one-kings-lane") return <OneKingsLaneDetail brand={brand} navigate={navigate} />;
  return <BrandSummary brand={brand} navigate={navigate} />;
}
