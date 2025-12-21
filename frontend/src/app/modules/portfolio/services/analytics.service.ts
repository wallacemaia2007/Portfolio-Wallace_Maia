import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Declaração global para o Google Analytics
declare let gtag: Function;
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private isGoogleAnalyticsLoaded = false;
  
  constructor(private router: Router) {
    this.initializeGoogleAnalytics();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  /**
   * Inicializa Google Analytics
   * 
   * Passos para configurar:
   * 1. Criar conta em analytics.google.com
   * 2. Obter Measurement ID (formato: G-XXXXXXXXXX)
   * 3. Adicionar no index.html OU usar este método
   */
  private initializeGoogleAnalytics(): void {
    const measurementId = 'G-XXXXXXXXXX'; // Substitua pelo seu ID

    // Verifica se já foi carregado
    if (typeof gtag !== 'undefined') {
      this.isGoogleAnalyticsLoaded = true;
      this.trackPageViews();
      return;
    }

    // Carrega script do Google Analytics dinamicamente
    if (this.shouldLoadAnalytics()) {
      this.loadGoogleAnalyticsScript(measurementId);
      this.trackPageViews();
    }
  }

  /**
   * Verifica se deve carregar analytics
   * (não carregar em desenvolvimento, por exemplo)
   */
  private shouldLoadAnalytics(): boolean {
    // Não carregar em localhost/desenvolvimento
    return !window.location.hostname.includes('localhost') &&
           !window.location.hostname.includes('127.0.0.1');
  }

  /**
   * Carrega script do Google Analytics
   */
  private loadGoogleAnalyticsScript(measurementId: string): void {
    // Script principal
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Inicialização
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      gtag('js', new Date());
      gtag('config', measurementId, {
        send_page_view: false, // Controlaremos manualmente
      });
      this.isGoogleAnalyticsLoaded = true;
    };
  }

  /**
   * Rastreia mudanças de página automaticamente
   */
  private trackPageViews(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  // ============================================
  // PAGE TRACKING
  // ============================================

  /**
   * Rastreia visualização de página
   */
  trackPageView(page: string): void {
    if (!this.isGoogleAnalyticsLoaded) {
      console.log('📊 Page view (not tracked - GA not loaded):', page);
      return;
    }

    try {
      gtag('event', 'page_view', {
        page_path: page,
        page_title: document.title,
        page_location: window.location.href,
      });
      console.log('📊 Page view tracked:', page);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  // ============================================
  // EVENT TRACKING
  // ============================================

  /**
   * Rastreia evento genérico
   */
  trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
  ): void {
    if (!this.isGoogleAnalyticsLoaded) {
      console.log('📊 Event (not tracked):', { category, action, label, value });
      return;
    }

    try {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
      console.log('📊 Event tracked:', { category, action, label, value });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  // ============================================
  // PROJECT INTERACTIONS
  // ============================================

  /**
   * Rastreia clique em projeto
   */
  trackProjectClick(projectId: string, projectTitle: string): void {
    this.trackEvent('Projects', 'project_click', projectTitle);
  }

  /**
   * Rastreia visualização de detalhes do projeto
   */
  trackProjectView(projectId: string, projectTitle: string): void {
    this.trackEvent('Projects', 'project_view', projectTitle);
  }

  /**
   * Rastreia clique em link externo do projeto
   */
  trackProjectExternalLink(
    projectTitle: string,
    linkType: 'github' | 'live' | 'other'
  ): void {
    this.trackEvent('Projects', `project_${linkType}_link`, projectTitle);
  }

  // ============================================
  // CONTACT INTERACTIONS
  // ============================================

  /**
   * Rastreia envio de formulário de contato
   */
  trackContactFormSubmit(success: boolean): void {
    this.trackEvent(
      'Contact',
      success ? 'form_submit_success' : 'form_submit_error',
      'Contact Form'
    );
  }

  /**
   * Rastreia clique em link de email
   */
  trackEmailClick(): void {
    this.trackEvent('Contact', 'email_click', 'Email Link');
  }

  /**
   * Rastreia clique em WhatsApp
   */
  trackWhatsAppClick(): void {
    this.trackEvent('Contact', 'whatsapp_click', 'WhatsApp Link');
  }

  /**
   * Rastreia abertura de rede social
   */
  trackSocialMediaClick(platform: string): void {
    this.trackEvent('Social', 'social_click', platform);
  }

  // ============================================
  // CV & DOWNLOADS
  // ============================================

  /**
   * Rastreia download de CV
   */
  trackDownloadCV(): void {
    this.trackEvent('Downloads', 'cv_download', 'Resume/CV');
  }

  /**
   * Rastreia download de arquivo
   */
  trackFileDownload(fileName: string): void {
    this.trackEvent('Downloads', 'file_download', fileName);
  }

  // ============================================
  // NAVIGATION
  // ============================================

  /**
   * Rastreia clique em navegação
   */
  trackNavigation(destination: string): void {
    this.trackEvent('Navigation', 'nav_click', destination);
  }

  /**
   * Rastreia uso de filtros
   */
  trackFilterUse(filterType: string, filterValue: string): void {
    this.trackEvent('Filters', 'filter_use', `${filterType}: ${filterValue}`);
  }

  /**
   * Rastreia busca
   */
  trackSearch(searchTerm: string): void {
    this.trackEvent('Search', 'search_query', searchTerm);
  }

  // ============================================
  // THEME & PREFERENCES
  // ============================================

  /**
   * Rastreia mudança de tema
   */
  trackThemeChange(theme: 'light' | 'dark'): void {
    this.trackEvent('Preferences', 'theme_change', theme);
  }

  /**
   * Rastreia mudança de idioma (se implementado)
   */
  trackLanguageChange(language: string): void {
    this.trackEvent('Preferences', 'language_change', language);
  }

  // ============================================
  // ENGAGEMENT
  // ============================================

  /**
   * Rastreia tempo na página
   */
  trackTimeOnPage(page: string, timeInSeconds: number): void {
    this.trackEvent('Engagement', 'time_on_page', page, timeInSeconds);
  }

  /**
   * Rastreia scroll depth
   */
  trackScrollDepth(depth: number): void {
    this.trackEvent('Engagement', 'scroll_depth', `${depth}%`, depth);
  }

  /**
   * Rastreia clique em "voltar ao topo"
   */
  trackScrollToTop(): void {
    this.trackEvent('Navigation', 'scroll_to_top', 'Back to Top Button');
  }

  // ============================================
  // ERROR TRACKING
  // ============================================

  /**
   * Rastreia erro
   */
  trackError(errorMessage: string, errorLocation?: string): void {
    this.trackEvent('Errors', 'error_occurred', `${errorLocation}: ${errorMessage}`);
  }

  /**
   * Rastreia erro 404
   */
  track404(attemptedUrl: string): void {
    this.trackEvent('Errors', '404_error', attemptedUrl);
  }

  // ============================================
  // USER PROPERTIES
  // ============================================

  /**
   * Define propriedade do usuário
   */
  setUserProperty(propertyName: string, value: any): void {
    if (!this.isGoogleAnalyticsLoaded) return;

    try {
      gtag('set', 'user_properties', {
        [propertyName]: value,
      });
    } catch (error) {
      console.error('Error setting user property:', error);
    }
  }

  /**
   * Define ID do usuário (se houver autenticação)
   */
  setUserId(userId: string): void {
    if (!this.isGoogleAnalyticsLoaded) return;

    try {
      gtag('set', { user_id: userId });
    } catch (error) {
      console.error('Error setting user ID:', error);
    }
  }

  // ============================================
  // UTILITIES
  // ============================================

  /**
   * Verifica se analytics está carregado
   */
  isLoaded(): boolean {
    return this.isGoogleAnalyticsLoaded;
  }

  /**
   * Habilita/desabilita analytics
   */
  setAnalyticsEnabled(enabled: boolean): void {
    if (!this.isGoogleAnalyticsLoaded) return;

    try {
      gtag('consent', 'update', {
        analytics_storage: enabled ? 'granted' : 'denied',
      });
    } catch (error) {
      console.error('Error updating consent:', error);
    }
  }
}

// ============================================
// DECORATOR HELPER (OPCIONAL)
// ============================================

/**
 * Decorator para rastrear chamadas de método automaticamente
 * 
 * Uso:
 * @TrackEvent('Category', 'Action')
 * myMethod() { ... }
 */
export function TrackEvent(category: string, action: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Injeta o AnalyticsService se disponível
      const analyticsService = (this as any).analyticsService;
      if (analyticsService && typeof analyticsService.trackEvent === 'function') {
        analyticsService.trackEvent(category, action, propertyKey);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}