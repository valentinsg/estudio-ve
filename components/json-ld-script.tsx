'use client';

import { useEffect } from 'react';

export default function JsonLdScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Estudio Ve",
      url: "https://estudiove.com",
      logo: "https://estudiove.com/images/estudio-ve-logo.png",
      description: "Estudio creativo y educativo fundado por Valentín Sánchez Guevara",
      founder: {
        "@type": "Person",
        name: "Valentín Sánchez Guevara",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mar del Plata",
        addressCountry: "AR",
      },
      sameAs: ["https://youtube.com/@estudiove"]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
