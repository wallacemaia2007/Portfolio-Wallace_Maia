import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PageSeoData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const BASE_URL = 'https://maiawall.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/og-image.png`;
const SITE_NAME = 'Wallace Maia | Portfólio Full Stack';

const SEO_MAP: Record<string, PageSeoData> = {
  '/home': {
    title: 'Wallace Maia | Desenvolvedor Full Stack Angular & Java',
    description:
      'Portfólio de Wallace Cândido Maia Sousa — Desenvolvedor Full Stack em Angular, Java e Spring Boot. Projetos reais, experiência na CroSoften e freelance. Uberlândia/MG.',
    keywords:
      'Wallace Maia, Wallace Cândido Maia Sousa, desenvolvedor full stack, Angular, Java, Spring Boot, portfólio desenvolvedor, programador MG',
    ogType: 'website',
  },
  '/about': {
    title: 'Sobre — Wallace Maia | Desenvolvedor Full Stack',
    description:
      'Conheça a história de Wallace Maia: de estudante em Passos/MG a desenvolvedor Full Stack na CroSoften e UFU. Formação, jornada, valores e hobbies.',
    keywords:
      'Wallace Maia sobre, trajetória desenvolvedor, CroSoften desenvolvedor Angular, UFU sistemas de informação, desenvolvedor Uberlândia',
    ogType: 'profile',
  },
  '/projects': {
    title: 'Projetos — Wallace Maia | Angular, Java, Spring Boot',
    description:
      'Portfólio de projetos de Wallace Maia: Digital Bank API, Instituto Motirõ, Banda Aurah, Customer Register e mais. Angular, Java, Vite, Node.js.',
    keywords:
      'projetos Angular, projetos Java Spring Boot, Digital Bank API, Instituto Motiro, portfólio projetos web, desenvolvedor freelance projetos',
    ogType: 'website',
  },
  '/skills': {
    title: 'Skills — Wallace Maia | Angular, Java, Spring Boot, Docker',
    description:
      'Habilidades técnicas de Wallace Maia: Angular 19, TypeScript, Java, Spring Boot, Spring Security, RxJS, MySQL, PostgreSQL, MongoDB, Docker, AWS e mais.',
    keywords:
      'skills desenvolvedor, Angular expert, Java developer, Spring Boot, TypeScript, RxJS, Docker, AWS, MySQL, desenvolvedor full stack habilidades',
    ogType: 'website',
  },
  '/experience': {
    title: 'Experiência — Wallace Maia | CroSoften, Freelance, Prefeitura',
    description:
      'Trajetória profissional de Wallace Maia: Desenvolvedor Frontend na CroSoften, freelancer Full Stack e estagiário de TI na Prefeitura de Passos.',
    keywords:
      'Wallace Maia CroSoften, desenvolvedor frontend Angular emprego, experiência profissional desenvolvedor, freelance web developer MG',
    ogType: 'website',
  },
  '/contact': {
    title: 'Contato — Wallace Maia | Desenvolvedor Full Stack',
    description:
      'Entre em contato com Wallace Maia: wallacemaia2007@gmail.com, WhatsApp (35) 91003-6806. Disponível para projetos freelance e oportunidades full-time.',
    keywords:
      'contratar desenvolvedor, Wallace Maia contato, freelancer angular java, desenvolvedor web uberlândia contato',
    ogType: 'website',
  },
  '/dev': {
    title: 'Serviços — Wallace Maia | Desenvolvimento Web & Sistemas',
    description:
      'Serviços de desenvolvimento web de Wallace Maia: sites, sistemas SaaS, e-commerces, APIs, landing pages e manutenção. Angular + Java + Spring Boot.',
    keywords:
      'serviços desenvolvimento web, criar site, sistema web, SaaS desenvolvimento, API Rest desenvolvimento, landing page profissional',
    ogType: 'website',
  },
};

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private router = inject(Router);

  init(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        const path = this.normalizePath(event.urlAfterRedirects);
        const seo = SEO_MAP[path] ?? SEO_MAP['/home'];
        this.apply(seo, path);
      });
  }

  apply(data: PageSeoData, path?: string): void {
    const fullPath = path ?? this.normalizePath(this.router.url);
    const canonical = data.canonical ?? `${BASE_URL}${fullPath}`;
    const ogImage = data.ogImage ?? DEFAULT_OG_IMAGE;
    const ogType = data.ogType ?? 'website';

    // Title
    this.titleService.setTitle(data.title);

    // Basic meta
    this.setTag('description', data.description);
    if (data.keywords) this.setTag('keywords', data.keywords);
    this.setTag('author', 'Wallace Cândido Maia Sousa');
    this.setTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large');

    // Canonical
    this.setLinkCanonical(canonical);

    // Open Graph
    this.setOgTag('og:title', data.title);
    this.setOgTag('og:description', data.description);
    this.setOgTag('og:type', ogType);
    this.setOgTag('og:url', canonical);
    this.setOgTag('og:image', ogImage);
    this.setOgTag('og:image:width', '1200');
    this.setOgTag('og:image:height', '630');
    this.setOgTag('og:image:alt', 'Wallace Maia — Desenvolvedor Full Stack');
    this.setOgTag('og:site_name', SITE_NAME);
    this.setOgTag('og:locale', 'pt_BR');

    // Twitter
    this.setTag('twitter:card', 'summary_large_image');
    this.setTag('twitter:title', data.title);
    this.setTag('twitter:description', data.description);
    this.setTag('twitter:image', ogImage);
    this.setTag('twitter:site', '@wallacemaia2007');
  }

  private setTag(name: string, content: string): void {
    if (this.meta.getTag(`name='${name}'`)) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  private setOgTag(property: string, content: string): void {
    if (this.meta.getTag(`property='${property}'`)) {
      this.meta.updateTag({ property, content });
    } else {
      this.meta.addTag({ property, content });
    }
  }

  private setLinkCanonical(url: string): void {
    let link: HTMLLinkElement | null =
      document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private normalizePath(url: string): string {
    return url.split('?')[0].split('#')[0] || '/home';
  }
}
