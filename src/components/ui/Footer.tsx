import { Frame } from "@/components/ui/Scene";
import { Wordmark } from "@/components/ui/Wordmark";
import { business, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 py-16">
      <Frame>
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-linen/60">
              {business.slogan}
            </p>
            <a
              href={`mailto:${business.email}`}
              className="mt-4 inline-block text-sm text-signal underline underline-offset-4"
            >
              {business.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-2.5">
              {[...nav, { label: "Build mine", href: "#build" }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-linen/65 transition-colors hover:text-bone motion-reduce:transition-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-xs">
            <p className="font-mono text-[10px] tracking-[0.22em] text-ash uppercase">
              Serving
            </p>
            <p className="mt-3 text-sm leading-relaxed text-linen/55">
              {business.cities.join(", ")}, and the rest of the South.
            </p>
          </div>
        </div>

        <p className="mt-14 font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
          © {new Date().getFullYear()} {business.legalName}
        </p>
      </Frame>
    </footer>
  );
}
