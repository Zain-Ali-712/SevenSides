import Link from "next/link";
import { EnvelopeSimpleIcon, FacebookLogoIcon, InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "@/components/brand/Wordmark";
import { BRANCHES, telHref } from "@/lib/branches";
import { FULL_NAV } from "./nav";

const SOCIAL = [
  { href: "https://www.instagram.com/sevensides.pk/", label: "Instagram", Icon: InstagramLogoIcon },
  { href: "https://www.facebook.com/SevenSides.pk/", label: "Facebook", Icon: FacebookLogoIcon },
  { href: "https://wa.me/c/923196481040", label: "WhatsApp catalogue", Icon: WhatsappLogoIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-14 md:grid-cols-[1.2fr_2fr] md:px-6">
        <div className="grid content-start gap-5">
          <Link href="/" aria-label="Seven Sides home" className="w-fit text-[64px]">
            <Wordmark tone="mustard" />
          </Link>
          <p className="font-display text-3xl leading-none text-teal">Home of Red Tenders</p>
          <ul className="flex gap-2">
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="grid size-12 place-items-center rounded-full border-2 border-paper/80 transition-colors hover:bg-mustard hover:text-ink"
                >
                  <Icon weight="bold" className="size-6" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <a href="mailto:sevensides.pk@gmail.com" className="flex w-fit items-center gap-2 font-tag text-sm hover:text-mustard">
            <EnvelopeSimpleIcon weight="bold" className="size-5" aria-hidden />
            sevensides.pk@gmail.com
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl text-mustard">Branches</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {BRANCHES.map((b) => (
                <li key={b.id} className="font-tag text-sm leading-relaxed">
                  <p className="font-bold uppercase tracking-wide">{b.name}</p>
                  <p className="text-paper/75">{b.address}</p>
                  <a href={telHref(b.phone)} className="text-teal hover:text-mustard">
                    {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <h2 className="font-display text-3xl text-mustard">Explore</h2>
            <ul className="mt-4 grid gap-2 font-display text-2xl">
              {FULL_NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-mustard">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-[1240px] px-4 py-5 font-tag text-xs text-paper/70 md:px-6">
          Menu prices are exclusive of taxes and may change at the branch. Online ordering on this site is a demo.
        </p>
      </div>
    </footer>
  );
}
