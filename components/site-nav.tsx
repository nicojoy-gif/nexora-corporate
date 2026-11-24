"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (v: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
        <ul className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-teal-500 after:transition-transform after:duration-300 ${
                    active
                      ? "text-navy-950 after:scale-x-100"
                      : "text-navy-600 after:scale-x-0 hover:text-navy-950 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/contact"
          aria-current={isActive(pathname, "/contact") ? "page" : undefined}
          className="bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
        >
          Contact us
        </Link>
      </nav>

      <button
        type="button"
        className="-mr-2 flex size-11 items-center justify-center text-navy-900 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="px-6 py-8">
            <ul className="divide-y divide-navy-100 border-y border-navy-100">
              {[...NAV_ITEMS, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-5 font-serif text-2xl text-navy-950 aria-[current=page]:text-teal-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export function SiteNavFallback() {
  return (
    <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
      <ul className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="py-2 text-sm font-medium text-navy-600">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
        Contact us
      </Link>
    </nav>
  );
}
