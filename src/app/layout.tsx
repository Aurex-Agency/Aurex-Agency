import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { business } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const title = "Aurex | Growth systems for Southern service businesses";
const description =
  "Aurex builds the system that turns attention into revenue. Get found, answer every lead in seconds, and turn customers into more customers. Month to month, cancel anytime.";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: title, template: "%s | Aurex" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: business.legalName,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  authors: [{ name: business.legalName }],
};

export const viewport: Viewport = {
  themeColor: "#06080b",
  colorScheme: "dark",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${business.url}/#business`,
  name: business.name,
  alternateName: business.legalName,
  url: business.url,
  email: business.email,
  slogan: business.slogan,
  description,
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressRegion: "MS", addressCountry: "US" },
  knowsAbout: [
    "growth systems",
    "lead generation",
    "speed to lead automation",
    "missed call text back",
    "customer reactivation",
    "review generation",
    "local SEO",
  ],
  areaServed: business.cities.map((name) => ({ "@type": "City", name })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable} antialiased`}>
      <body className="grain bg-void text-linen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:font-semibold focus:text-void"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
