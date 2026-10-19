import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[90dvh] place-items-center bg-teal px-4 pt-24 text-center">
      <div>
        <p className="pill-label text-xl">404</p>
        <h1 className="mt-4 font-display text-[clamp(4.5rem,12vw,10rem)] leading-[0.85] text-ink">
          Too hot to find
        </h1>
        <p className="mx-auto mt-4 max-w-[36ch] text-lg font-medium">This page doesn’t exist. The menu does.</p>
        <Link href="/menu" className="btn btn-ink mt-8">
          Order now
        </Link>
      </div>
    </section>
  );
}
