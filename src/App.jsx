import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/react/24/outline';


export default function PortfolioSite() {
  const site = {
    name: "MM Automates",
    owner: "Meredith McCanse",
    tagline: "Accounting automation that ships and sticks.",
    email: "meredith@mmautomates.com",
    phone: "646-281-6533",
    linkedin: "https://www.linkedin.com/in/meredithmccanse",
    resumeUrl: "https://drive.google.com/drive/u/1/folders/1EEj5SLLDrB5tulYxQcFnPJBsS3wgkOpl/preview", // TODO: replace with a hosted PDF link
    calendly: "#", // TODO: optional: replace with your Calendly link
    domain: "mmautomates.com",
  };

 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

 
  /** Convert common Loom share links to embed links. */
  const loomEmbed = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("loom.com")) {
        const id = u.pathname.split("/").filter(Boolean).pop();
        return `https://www.loom.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const projects = [
    {
      title: "AP payment batch prep & JE automation (Alteryx + Apps Script)",
      summary:
        "Automated AP batch preparation and documentation with downstream JE drafting. Reduced manual touchpoints, improved accuracy, and created a clear audit trail.",
      problem:
        "Large volume of AP payments required manual prep each cycle; documentation and JE creation were repetitive and error-prone.",
      approach:
        "Modeled business logic in Alteryx, validated vendor/payment rules, and pushed clean outputs to Google Sheets. Apps Script generated standardized documentation and JE drafts.",
      outcome:
        "Hours shaved off each payment cycle; consistent supporting docs; smoother approvals; easier audits.",
      stack: ["Alteryx", "Google Sheets", "Apps Script"],
      loomProcess: "", // paste Loom link showing the workflow
      loomOutcome: "", // paste Loom link showing the result/outputs
      tags: ["AP", "JE automation", "audit-ready"]
    },
    {
      title: "Open PO accruals pipeline (Alteryx)",
      summary:
        "Built an accruals pipeline that ingests PO data, applies business rules, and outputs JE-ready accruals with reviewer flags.",
      problem:
        "Manual accruals logic across disparate reports created late-cycle crunch and review churn.",
      approach:
        "Translated finance logic into a low-code Alteryx flow; added reviewer-friendly flags and exception filters.",
      outcome:
        "Faster month-end, clearer review notes, and repeatable results.",
      stack: ["Alteryx", "CSV/ERP exports"],
      loomProcess: "",
      loomOutcome: "",
      tags: ["Close", "Accruals", "Repeatable"]
    },
    {
      title: "n8n data sync (ERP → Google Sheets) with alerts",
      summary:
        "Automated nightly ERP → Sheets sync for operational analytics and variance checks; Slack alerts on exceptions.",
      problem:
        "Analysts spent time pulling point-in-time data; no overnight refresh or exception notifications.",
      approach:
        "Used n8n to call ERP/API, normalize payloads, and write to Sheets; scheduled runs; Slack webhook for alerts.",
      outcome:
        "Near-zero manual pulling, fresher dashboards, proactive exception handling.",
      stack: ["n8n", "ERP API", "Google Sheets", "Slack"],
      loomProcess: "",
      loomOutcome: "",
      tags: ["Ops analytics", "APIs", "Notifications"]
    },
  ];

  const pkg = [
    {
      name: "Quick Win Pilot",
      details:
        "1 scoped process, 1–2 weeks. Includes discovery, build, demo, and handoff docs.",
    },
    {
      name: "Automation Audit",
      details:
        "Map current state, identify top-3 opportunities, estimate ROI, and propose a roadmap.",
    },
    {
      name: "Build & Train",
      details:
        "Design + implementation for 1–3 processes. Includes training, SOPs, and change management support.",
    },
  ];

  const features = [
    {
      name: 'Quick Win Pilot',
      description:
        '1 scoped process, 1–2 weeks. Includes discovery, build, demo, and handoff docs.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Automation Audit',
      description:
        'Map current state, identify top-3 opportunities, estimate ROI, and propose a roadmap.',
      icon: LockClosedIcon,
    },
    {
      name: 'Build & Train',
      description:
        'Design + implementation for 1–3 processes. Includes training, SOPs, and change management support.',
      icon: ArrowPathIcon,
    },
    {
      name: 'Measurable Outcomes',
      description:
        'Focus on time saved, error reduction, SOX-friendliness, and change management for sustainable adoption.',
      icon: FingerPrintIcon,
    },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      alert("Email copied to clipboard");
    } catch (e) {
      alert(site.email);
    }
  };

  const Chip = ({ children }) => (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs border border-gray-300/80">
      {children}
    </span>
  );

  const Section = ({ id, title, subtitle, children }) => (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
{/* Header — same style, now responsive */}
<header className="sticky top-0 z-50 bg-softpurple/90 backdrop-blur border-b border-purple-200">
  <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
    {/* Logo / name */}
    <a href="#home" className="text-lg font-bold text-indigo-600">
      {site.name}
    </a>

    {/* Desktop nav */}
    <nav className="hidden sm:flex gap-8 text-sm font-medium">
      <a href="#work" className="text-gray-700 hover:text-indigo-600">Process Demos</a>
      <a href="#services" className="text-gray-700 hover:text-indigo-600">How I work</a>
      <a href="#about" className="text-gray-700 hover:text-indigo-600">About</a>
      <a href="#contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
    </nav>

    {/* Desktop CTAs */}
    <div className="hidden sm:flex items-center gap-3">
      <a
        href={`mailto:${site.email}`}
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
      >
        Contact
      </a>
      <a
        href={site.linkedin}
        className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600"
      >
        LinkedIn
      </a>
    </div>

    {/* Mobile menu button */}
    <button
      type="button"
      onClick={() => setMobileMenuOpen(true)}
      className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      aria-label="Open main menu"
    >
      <Bars3Icon className="w-6 h-6" aria-hidden="true" />
    </button>
  </div>

  {/* Mobile menu (slides in from right) */}
  <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="sm:hidden">
    <div className="fixed inset-0 z-50 bg-black/20" aria-hidden="true" />
    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl ring-1 ring-black/10 focus:outline-none">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <a href="#home" className="text-base font-semibold text-indigo-600">{site.name}</a>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-md p-2 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          aria-label="Close menu"
        >
          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      <nav className="px-4 py-4 grid gap-1">
        <a onClick={() => setMobileMenuOpen(false)} href="#work" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-indigo-50">Process Demos</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#services" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-indigo-50">How I work</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#about" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-indigo-50">About</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-indigo-50">Contact</a>
      </nav>

      <div className="px-4 pb-5 pt-2 border-t grid gap-2">
        <a
          onClick={() => setMobileMenuOpen(false)}
          href={`mailto:${site.email}`}
          className="block text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
          Contact
        </a>
        <a
          onClick={() => setMobileMenuOpen(false)}
          href={site.linkedin}
          className="block text-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
        >
          LinkedIn
        </a>
      </div>
    </DialogPanel>
  </Dialog>
</header>


      {/* Hero */}
<section id="home" className="relative isolate px-6 pt-24 lg:px-8">
  {/* top blurred background shape */}
  <div
    aria-hidden="true"
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
    />
  </div>

  <div className="mx-auto max-w-2xl py-24 sm:py-40 lg:py-48">
    <div className="text-center">
      <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Accounting automations that ship and stick
      </h1>
      <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl">
        I help finance teams turn manual routines into low-code workflows with clear controls,
        clean outputs, and audit-ready documentation.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-4">
        <a
          href={`mailto:${site.email}`}
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Contact
        </a>
        <a
          href={site.linkedin}
          className="text-sm font-semibold text-gray-900"
        >
          LinkedIn <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>

  {/* bottom blurred background shape */}
  <div
    aria-hidden="true"
    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
    />
  </div>
</section>


      {/* Work - Bento Grid */}
      <section id="work" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">Process Demos</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            Simple use cases<br />
            tools and approaches
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-1">
            {/* n8n Job Search Workflow */}
            <div className="relative">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Low-Code AI Job Search with n8n
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Finds job postings, sends to OpenAI to summarize, rate match quality, and write cover letters. Saves docs to gdrive, updates Gsheet list, sends summary email. An example of how low-code workflows can perform tasks independently and automatically. n8n is a low-code automation platform allowing users to build automation integrating apps, APIs, databases, data transformation, and more.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip>n8n</Chip>
                    <Chip>Apps Script</Chip>
                    <Chip>OpenAI</Chip>
                    <Chip>APIs</Chip>
                  </div>
                  <div className="mt-4"></div>
                </div>
                <div className="flex flex-1 items-center justify-center px-6 max-lg:pt-6 max-lg:pb-8 sm:px-8 lg:pb-2">
                  <div className="w-full aspect-video"></div>
                  <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 aspect-video rounded-lg overflow-hidden border-6 border-indigo-600 shadow-lg z-10">
                    <iframe
                      src="https://www.loom.com/embed/8bf6acd9c21e4d248fba62dd8903ec42"
                      className="w-full h-full"
                      allow="autoplay; fullscreen"
                      title="n8n job search demo"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
            </div>

            {/* Streamlit App - Lease Assistant */}
            <div className="relative">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">AI App for Lease Accounting Q&A</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    AI app built with Streamlit, grounded in a vector database with RAG architecture and robust prompting. Use case for T&E policy questions, procurement processes, legal guidelines, and more.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip>Streamlit</Chip>
                    <Chip>Vector DB</Chip>
                    <Chip>RAG</Chip>
                    <Chip>Qdrant</Chip>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://accounting-ai.streamlit.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Try the app →
                    </a>
                  </div>
                  <div className="mt-20"></div>
                </div>
                <div className="flex flex-1 items-center justify-center px-6 max-lg:pt-6 max-lg:pb-8 sm:px-8 lg:pb-2">
                  <div className="w-full aspect-video"></div>
                  <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 aspect-video rounded-lg overflow-hidden border-6 border-indigo-600 shadow-lg z-10">
                    <iframe
                      src="https://www.loom.com/embed/aa56087b568048bea20e5693cdf62a62"
                      className="w-full h-full"
                      allow="autoplay; fullscreen"
                      title="Streamlit Lease Assistant Demo"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
            </div>

            {/* Alteryx Demo Coming Soon */}
            <div className="relative">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Alteryx demo coming soon
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Process demo showing Alteryx methodology, accounting use cases, and how to be SOX friendly while also shaving off hours of effort.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip>Alteryx</Chip>
                    <Chip>Data Workflows</Chip>
                    <Chip>Automation</Chip>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center px-6 max-lg:pt-6 max-lg:pb-8 sm:px-8 lg:pb-2">
                  <div className="w-full aspect-video"></div>
                  <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 aspect-video rounded-lg overflow-hidden border-6 border-indigo-600 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50 z-10">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-4xl mb-3 text-violet-600">📊 🔄 📈 ⚙️</div>
                        <div className="text-violet-600 text-sm font-medium">Under Construction</div>
                        <div className="text-violet-500 text-xs mt-1">Demo coming soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Services / How I work */}
      <section id="services" className="relative isolate bg-white py-24 sm:py-32">
        {/* top blurred background shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
          />
        </div>

        {/* bottom blurred background shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">How I work</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              Simple, outcome‑driven engagements
            </p>
            <p className="mt-6 text-lg/8 text-gray-700">
              Clear documentation and handoff. Focus on measurable results, SOX-friendliness, and sustainable adoption.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative isolate bg-white py-16">
        {/* top blurred background shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
          />
        </div>

        {/* bottom blurred background shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">About</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              CPA<br />
              accounting automation builder
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="relative">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
                  <p className="text-lg/8 text-gray-700 mb-6">
                    Saved over 1,000 hours across 3 publicly traded companies by building scalable solutions using low-code tools like Alteryx, n8n, Apps Script, and Google Data Studio. My background blends deep accounting knowledge with hands-on automation and AI experience, enabling me to build workflows that increase accuracy, reduce risk, and eliminate manual processes—without requiring teams to learn how to code. I partner closely with FP&A, procurement, and IT to align automation strategy with real business needs and lead adoption efforts across cross-functional teams.
                  </p>
                  <p className="text-base/7 text-gray-600">
                    Tools: Alteryx, n8n, Apps Script, NetSuite, FloQast, Blackline, Oracle, Google Data Studio, and more
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative isolate bg-white py-16">
        {/* top blurred background shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
          />
        </div>

        {/* bottom blurred background shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Contact</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              Let's talk about your process
            </p>
            <p className="mt-6 text-lg/8 text-gray-700">
              and where automation can help.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`mailto:${site.email}`}
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Email
              </a>
              <a
                href={site.linkedin}
                className="rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 border border-gray-300 hover:border-indigo-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} {site.owner}. All rights reserved.</div>
          <div className="text-sm text-gray-600">Built through vibe coding with React + Tailwind + Cursor</div>
        </div>
      </footer>
    </div>
  );
}
