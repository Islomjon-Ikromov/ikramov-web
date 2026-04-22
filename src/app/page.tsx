import WaitlistForm from "@/components/WaitlistForm";

const problems = [
  {
    icon: "💸",
    title: "No local payment rails for clients",
    body: "Clients want to pay via Click or Payme but you're stuck sending bank details on WhatsApp and chasing confirmation screenshots.",
  },
  {
    icon: "📄",
    title: "Invoices live in random chat messages",
    body: "Your invoice is a Telegram voice message or a photo of a notebook. There's no history, no status, no reminder when it's overdue.",
  },
  {
    icon: "🌐",
    title: "International clients? Manual currency math",
    body: "USD or RUB? You open a browser tab, calculate the UZS rate, type it into a note, and hope the CBU rate didn't change by the time they pay.",
  },
];

const features = [
  {
    label: "Multi-currency invoices",
    desc: "Issue in UZS, USD, or RUB. ProInvoice applies the live CBU rate automatically.",
    svg: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        <rect width="280" height="160" rx="12" fill="#eef2ff" />
        <rect x="20" y="20" width="240" height="32" rx="6" fill="#fff" stroke="#c7d2fe" />
        <text x="36" y="41" fontFamily="sans-serif" fontSize="12" fill="#4f46e5" fontWeight="600">ProInvoice #INV-0012</text>
        <text x="210" y="41" fontFamily="sans-serif" fontSize="11" fill="#6b7280">$120 USD</text>
        <rect x="20" y="64" width="150" height="10" rx="4" fill="#c7d2fe" />
        <rect x="20" y="82" width="100" height="10" rx="4" fill="#e0e7ff" />
        <rect x="20" y="100" width="240" height="2" rx="1" fill="#e0e7ff" />
        <text x="20" y="124" fontFamily="sans-serif" fontSize="10" fill="#6b7280">1 USD = 12 750 UZS (CBU)</text>
        <rect x="160" y="112" width="100" height="28" rx="8" fill="#4f46e5" />
        <text x="210" y="130" fontFamily="sans-serif" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="600">Pay Now</text>
      </svg>
    ),
  },
  {
    label: "Click & Payme checkout",
    desc: "Your client gets a payment link. One tap, paid. You get a Telegram ping.",
    svg: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        <rect width="280" height="160" rx="12" fill="#f0fdf4" />
        <rect x="60" y="20" width="160" height="52" rx="10" fill="#fff" stroke="#bbf7d0" />
        <text x="140" y="50" fontFamily="sans-serif" fontSize="13" fill="#16a34a" textAnchor="middle" fontWeight="700">CLICK</text>
        <text x="140" y="65" fontFamily="sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">1 530 000 UZS</text>
        <rect x="60" y="84" width="160" height="52" rx="10" fill="#fff" stroke="#bfdbfe" />
        <text x="140" y="113" fontFamily="sans-serif" fontSize="13" fill="#2563eb" textAnchor="middle" fontWeight="700">Payme</text>
        <text x="140" y="128" fontFamily="sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">1 530 000 UZS</text>
        <circle cx="248" cy="28" r="14" fill="#16a34a" />
        <text x="248" y="33" fontFamily="sans-serif" fontSize="14" fill="#fff" textAnchor="middle">✓</text>
      </svg>
    ),
  },
  {
    label: "Send invoice link on Telegram",
    desc: "Copy one link, paste it into Telegram. Your client sees a clean invoice page, not a PDF attachment.",
    svg: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        <rect width="280" height="160" rx="12" fill="#eff6ff" />
        <rect x="16" y="48" width="200" height="64" rx="10" fill="#fff" stroke="#bfdbfe" />
        <circle cx="36" cy="60" r="8" fill="#4f46e5" />
        <text x="36" y="64" fontFamily="sans-serif" fontSize="9" fill="#fff" textAnchor="middle">CTO</text>
        <rect x="52" y="54" width="150" height="8" rx="3" fill="#e0e7ff" />
        <rect x="52" y="68" width="120" height="8" rx="3" fill="#e0e7ff" />
        <rect x="28" y="84" width="170" height="20" rx="6" fill="#4f46e5" />
        <text x="113" y="98" fontFamily="sans-serif" fontSize="10" fill="#fff" textAnchor="middle">proinvoice.uz/pay/inv-0012</text>
        <path d="M240 80 L264 60 L248 100 L240 80 Z" fill="#0088cc" />
        <path d="M240 80 L264 60 L252 84 Z" fill="#29a8e0" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "Who is ProInvoice UZ for?",
    a: "Freelancers, small agencies, and indie developers in Uzbekistan who bill local and international clients.",
  },
  {
    q: "Which payment methods will you support?",
    a: "Click and Payme for local UZS payments. Stripe for USD/EUR card payments. More on the roadmap.",
  },
  {
    q: "When does it launch?",
    a: "We're targeting a beta in the coming weeks. Join the waitlist and you'll be the first to know.",
  },
  {
    q: "Is it free?",
    a: "There will be a free tier. Pricing details coming at launch.",
  },
  {
    q: "Will there be a mobile app?",
    a: "The web app is mobile-friendly from day one. A native app may come later based on demand.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold text-indigo-600">ProInvoice UZ</span>
          <a
            href="#waitlist"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Join waitlist
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="mb-4 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
          Now in private beta · Join the waitlist
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Bill clients in{" "}
          <span className="text-indigo-600">UZS, USD, and RUB.</span>
          <br />
          Get paid via Click, Payme, and Stripe.
          <br />
          Send the link on Telegram.
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-gray-500">
          Professional invoicing built for Uzbekistan — no bank details on
          WhatsApp, no manual exchange-rate math, no PDF attachments.
        </p>
        <a
          href="#waitlist"
          className="inline-block rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg"
        >
          Get early access →
        </a>
      </section>

      {/* Problems */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-indigo-500">
            The problem
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            UZ freelancer billing today is…
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-4 text-3xl">{p.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-indigo-500">
            The solution
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            One link. Paid.
          </h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col">
                <div className="mb-5 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                  {f.svg}
                </div>
                <h3 className="mb-1 text-base font-semibold text-gray-900">
                  {f.label}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="bg-indigo-50 px-6 py-20">
        <div className="mx-auto max-w-md">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Early access
          </p>
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Be first in line
          </h2>
          <p className="mb-8 text-center text-gray-500">
            Join the waitlist and we'll notify you when we launch. No spam.
          </p>
          <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            FAQ
          </h2>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 pb-6">
                <dt className="mb-2 text-base font-semibold text-gray-900">
                  {faq.q}
                </dt>
                <dd className="text-sm leading-relaxed text-gray-500">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-gray-400 sm:flex-row">
          <span className="font-semibold text-gray-700">ProInvoice UZ</span>
          <span>
            Questions?{" "}
            <a
              href="mailto:hello@proinvoice.uz"
              className="text-indigo-600 hover:underline"
            >
              hello@proinvoice.uz
            </a>
          </span>
          <span>© {new Date().getFullYear()} ikramov.uz</span>
        </div>
      </footer>
    </div>
  );
}
