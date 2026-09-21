import type { Metadata } from "next";
import localFont from "next/font/local";
   import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, GITHUB_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted via the @fontsource/* packages (installed as regular npm
// dependencies) rather than next/font/google, so the build never depends
// on reaching Google Fonts at build time.
const display = localFont({
  variable: "--font-display",
  src: [
    { path: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2", weight: "600" },
    { path: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
});

const body = localFont({
  variable: "--font-body",
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
});

const mono = localFont({
  variable: "--font-mono",
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Data Scientist Portfolio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Data Scientist Portfolio`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Data Scientist Portfolio`,
    description: SITE_DESCRIPTION,
  },
     verification: {
  google: "fWAcNH-9PYQY7US4iv_71AdoYZICVtxhBl9KajL-h8I",
  other: {
    "msvalidate.01": "F265E1F8E77FC2BDCA9C08C930370D61",
  },
},
};

// Site-wide structured data. Only real, verifiable facts — nothing here
// should ever be a claim the rest of the site doesn't back up.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Data Scientist",
  description: SITE_TAGLINE,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bahir Dar University",
  },
  sameAs: [GITHUB_URL],
};

// Runs before paint to set the theme class, avoiding a light->dark flash
// on load. Also forces any page refresh/reload on a subpage to redirect back home.
const coreInitScript = `
(function () {
  try {
    // 1. Theme Configuration
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    
    // 2. Browser Reload Interception & Home Redirection
    if (window.performance && window.performance.getEntriesByType) {
      var navigation = window.performance.getEntriesByType('navigation')[0];
      if (navigation && navigation.type === 'reload' && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: coreInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

