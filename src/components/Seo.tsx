import { useEffect } from 'react';
import { getPageSeo, getSeoMeta, getStructuredData, SITE_URL } from '../config/seo';

export function Seo() {
  useEffect(() => {
    const page = getPageSeo(window.location.pathname);
    document.title = page.title;
    for (const [attribute, key, value] of getSeoMeta(page)) {
      let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.content = value;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${page.path}`;
    let structured = document.getElementById('wayo-structured-data');
    if (!structured) {
      structured = document.createElement('script');
      structured.id = 'wayo-structured-data';
      structured.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structured);
    }
    structured.textContent = JSON.stringify(getStructuredData(page));
  }, []);
  return null;
}
