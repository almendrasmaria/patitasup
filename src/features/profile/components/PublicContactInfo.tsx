"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiX } from "react-icons/fi";

type PublicContactInfoProps = {
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
  facebook?: string | null;
};

type ContactLink = {
  key: string;
  label: string;
  value: string;
  href: string;
  Icon: typeof FiMail;
};

const transition = { duration: 0.18, ease: "easeOut" } as const;

function instagramHref(value: string) {
  if (/^https?:\/\//.test(value)) return value;
  return `https://instagram.com/${value.replace(/^@/, "")}`;
}

function facebookHref(value: string) {
  if (/^https?:\/\//.test(value)) return value;
  return `https://facebook.com/${value.replace(/^@/, "")}`;
}

function buildLinks({ email, phone, instagram, facebook }: PublicContactInfoProps): ContactLink[] {
  const links: ContactLink[] = [];

  if (email) {
    links.push({ key: "email", label: "Email", value: email, href: `mailto:${email}`, Icon: FiMail });
  }
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    links.push({
      key: "phone",
      label: "Teléfono / WhatsApp",
      value: phone,
      href: digits ? `https://wa.me/${digits}` : `tel:${phone}`,
      Icon: FaWhatsapp,
    });
  }
  if (instagram) {
    links.push({ key: "instagram", label: "Instagram", value: instagram, href: instagramHref(instagram), Icon: FaInstagram });
  }
  if (facebook) {
    links.push({ key: "facebook", label: "Facebook", value: facebook, href: facebookHref(facebook), Icon: FaFacebookF });
  }

  return links;
}

export default function PublicContactInfo(props: PublicContactInfoProps) {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [open, setOpen] = useState(false);
  const links = buildLinks(props);

  useEffect(() => {
    if (!open) {
      return;
    }

    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-semibold text-[var(--brand-teal)] underline-offset-2 transition hover:underline"
      >
        Información de contacto
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <motion.div
                    key="backdrop"
                    className="fixed inset-0 z-[100] bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                    onClick={() => setOpen(false)}
                    aria-hidden
                  />

                  <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                    <motion.div
                      role="dialog"
                      aria-modal="true"
                      aria-label="Información de contacto"
                      className="w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/10"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 8 }}
                      transition={transition}
                    >
                      <header className="flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] px-6 py-4">
                        <h2 className="text-lg font-semibold text-[var(--foreground-table)]">Información de contacto</h2>
                        <button
                          type="button"
                          aria-label="Cerrar"
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center justify-center rounded-full p-1.5 text-[var(--neutral-500)] transition hover:bg-[var(--surface-profile-tint)] hover:text-[var(--foreground-table)]"
                        >
                          <FiX className="h-5 w-5" aria-hidden />
                        </button>
                      </header>

                      <div className="space-y-2 px-6 py-5">
                        {links.length > 0 ? (
                          links.map(({ key, label, value, href, Icon }) => (
                            <a
                              key={key}
                              href={href}
                              target={key === "email" ? undefined : "_blank"}
                              rel={key === "email" ? undefined : "noreferrer"}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-[var(--surface-profile-tint)]"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-overlay-10)] text-[var(--warm-orange)]">
                                <Icon className="h-4 w-4" aria-hidden />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--neutral-500)]">
                                  {label}
                                </span>
                                <span className="block truncate text-sm text-[var(--foreground-table)]">{value}</span>
                              </span>
                            </a>
                          ))
                        ) : (
                          <p className="px-3 py-2 text-sm text-[var(--neutral-500)]">
                            Este refugio todavía no cargó datos de contacto.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
