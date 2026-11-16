"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Hit = { path: string; title?: string; referrer?: string; event?: boolean };
declare global {
  interface Window {
    goatcounter?: { count: (hit: Hit) => void; get_data: (hit: Hit) => Record<string, string | number | boolean> };
  }
}

const pagePath = () => location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
const send = (hit: Hit) => {
  try { window.goatcounter?.count(hit); } catch { return; }
};

export function trackAnalyticsEvent(name: string, area = "main") {
  send({ path: `click-${area}-${name}@${pagePath()}`, title: `${area}: ${name}`, event: true });
}

export default function Analytics() {
  const pathname = usePathname();
  const [endpoint, setEndpoint] = useState("");
  const [ready, setReady] = useState(false);
  const lastPath = useRef("");

  useEffect(() => {
    if (["www.devsh.eu", "test.www.devsh.eu"].includes(location.hostname)) setEndpoint("/stats/count");
  }, []);

  useEffect(() => {
    if (!ready || lastPath.current === pathname) return;
    let referrer = "";
    if (!lastPath.current && document.referrer) {
      try { referrer = new URL(document.referrer).origin; } catch { referrer = ""; }
    }
    lastPath.current = pathname;
    send({ path: pagePath(), referrer });
  }, [pathname, ready]);

  useEffect(() => {
    if (!ready) return;
    const onClick = (event: MouseEvent) => {
      if (event.button !== (event.type === "auxclick" ? 1 : 0) || !(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("a[href], [data-analytics-event]");
      if (!element) return;
      const area = element.closest("footer") ? "footer" : element.closest("nav") ? "nav" : "main";
      let name = element.dataset.analyticsEvent;
      if (!name && element instanceof HTMLAnchorElement) {
        const url = new URL(element.href);
        if (/^\/blog(?:\/|$)/.test(url.pathname) || url.hostname.endsWith("blog.devsh.eu")) return;
        if (url.protocol === "mailto:") name = "contact-email";
        else if (url.protocol === "tel:") name = "contact-phone";
        else if (/^https?:$/.test(url.protocol)) {
          if (url.origin !== location.origin) name = `outbound-${url.hostname.replace(/[^a-z0-9-]/g, "-")}`;
          else if (url.pathname === "/pricing.pdf") name = "pricing-pdf";
          else if (url.hash) name = "section-link";
          else name = `navigate-${url.pathname.slice(1).replace(/[^a-z0-9-]/gi, "-") || "home"}`;
        }
      }
      if (name) trackAnalyticsEvent(name, area);
    };
    const events = ["click", "auxclick"] as const;
    events.forEach(type => document.addEventListener(type, onClick, true));
    return () => events.forEach(type => document.removeEventListener(type, onClick, true));
  }, [ready]);

  if (!endpoint) return null;
  return <Script id="goatcounter" src="/stats/count.js"
    data-goatcounter={endpoint} data-goatcounter-settings='{"no_onload":true,"no_events":true}'
    onReady={() => {
      if (!window.goatcounter) return;
      window.goatcounter.get_data = (hit) => ({
        p: hit.path, t: hit.title || hit.path, r: hit.referrer || "",
        e: !!hit.event, b: navigator.webdriver ? 153 : 0,
        s: window.screen.width,
      });
      setReady(true);
    }} />;
}
