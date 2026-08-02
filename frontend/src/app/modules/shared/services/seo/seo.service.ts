import { Injectable, PLATFORM_ID, inject, effect } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateService } from '../../../../core/services/translate.service';

export interface PageSeoData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const BASE_URL = 'https://www.maiawall.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/og-image.jpg`;
const SEO_MAP_PT: Record<string, PageSeoData> = {
  '/home': {
    title: 'Wallace Maia | Desenvolvedor Full Stack Angular & Java',
    description:
      'Portfólio de Wallace Candido Maia Sousa — Desenvolvedor Full Stack em Angular, Java e Spring Boot. Projetos reais, experiência na CroSoften e freelance. Uberlândia/MG.',
    keywords:
      'Wallace Maia, Wallace Candido Maia Sousa, desenvolvedor full stack, Angular, Java, Spring Boot, portfólio desenvolvedor, programador MG',
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
};

const SEO_MAP_EN: Record<string, PageSeoData> = {
  '/home': {
    title: 'Wallace Maia | Full Stack Developer Angular & Java',
    description:
      'Portfolio of Wallace Candido Maia Sousa — Full Stack Developer in Angular, Java, and Spring Boot. Real projects, experience at CroSoften and freelance. Uberlândia/MG.',
    keywords:
      'Wallace Maia, Wallace Candido Maia Sousa, full stack developer, Angular, Java, Spring Boot, developer portfolio, programmer MG',
    ogType: 'website',
  },
  '/about': {
    title: 'About — Wallace Maia | Full Stack Developer',
    description:
      'Learn the story of Wallace Maia: from student in Passos/MG to Full Stack Developer at CroSoften and UFU. Education, journey, values and hobbies.',
    keywords:
      'Wallace Maia about, developer trajectory, CroSoften Angular developer, UFU information systems, developer Uberlândia',
    ogType: 'profile',
  },
  '/projects': {
    title: 'Projects — Wallace Maia | Angular, Java, Spring Boot',
    description:
      'Project portfolio of Wallace Maia: Digital Bank API, Instituto Motirõ, Banda Aurah, Customer Register and more. Angular, Java, Vite, Node.js.',
    keywords:
      'Angular projects, Java Spring Boot projects, Digital Bank API, Instituto Motiro, web project portfolio, freelance developer projects',
    ogType: 'website',
  },
  '/skills': {
    title: 'Skills — Wallace Maia | Angular, Java, Spring Boot, Docker',
    description:
      'Technical skills of Wallace Maia: Angular 19, TypeScript, Java, Spring Boot, Spring Security, RxJS, MySQL, PostgreSQL, MongoDB, Docker, AWS and more.',
    keywords:
      'developer skills, Angular expert, Java developer, Spring Boot, TypeScript, RxJS, Docker, AWS, MySQL, full stack developer skills',
    ogType: 'website',
  },
  '/experience': {
    title: 'Experience — Wallace Maia | CroSoften, Freelance, City Hall',
    description:
      'Professional trajectory of Wallace Maia: Frontend Developer at CroSoften, Full Stack freelancer and IT intern at Passos City Hall.',
    keywords:
      'Wallace Maia CroSoften, Angular frontend developer job, professional developer experience, freelance web developer MG',
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact — Wallace Maia | Full Stack Developer',
    description:
      'Get in touch with Wallace Maia: wallacemaia2007@gmail.com, WhatsApp (35) 91003-6806. Available for freelance projects and full-time opportunities.',
    keywords:
      'hire developer, Wallace Maia contact, angular java freelancer, web developer uberlândia contact',
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
  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);

  constructor() {
    effect(() => {
      this.translate.currentLang();
      const path = this.normalizePath(this.router.url);
      const seoMap = this.getSeoMap();
      const seo = seoMap[path] ?? seoMap['/home'];
      if (seo) this.apply(seo, path);
    });
  }

  private getSeoMap(): Record<string, PageSeoData> {
    return this.translate.currentLang() === 'en' ? SEO_MAP_EN : SEO_MAP_PT;
  }

  private getLocale(): string {
    return this.translate.currentLang() === 'en' ? 'en_US' : 'pt_BR';
  }

  init(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        const path = this.normalizePath(event.urlAfterRedirects);
        const seoMap = this.getSeoMap();
        const seo = seoMap[path] ?? seoMap['/home'];
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
    this.setTag('author', 'Wallace Candido Maia Sousa');
    this.setTag(
      'robots',
      'index, follow, max-snippet:-1, max-image-preview:large',
    );

    // Canonical
    this.setLinkCanonical(canonical);

    // Open Graph
    this.setOgTag('og:title', data.title);
    this.setOgTag('og:description', data.description);
    this.setOgTag('og:type', ogType);
    this.setOgTag('og:url', canonical);
    this.setOgTag('og:image', ogImage);
    this.setOgTag('og:image:width', '1200');
    this.setOgTag('og:image:height', '674');
    this.setOgTag('og:image:alt', this.translate.translate('seo.ogImageAlt'));
    this.setOgTag('og:site_name', this.translate.translate('seo.siteName'));
    this.setOgTag('og:locale', this.getLocale());

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
    if (!isPlatformBrowser(this.platformId)) return;
    let link: HTMLLinkElement | null = document.querySelector(
      "link[rel='canonical']",
    );
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private normalizePath(url: string): string {
    return (url.split('?')[0].split('#')[0] || '/home') === '/'
      ? '/home'
      : url.split('?')[0].split('#')[0] || '/home';
  }
}
