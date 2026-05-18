import { isPlatformBrowser } from '@angular/common';
import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { pt } from '../i18n/pt';
import { en } from '../i18n/en';

export type SupportedLang = 'pt' | 'en';
type DeepNested = { [key: string]: string | DeepNested };

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dictionaries: Record<SupportedLang, DeepNested> = { pt, en };

  private readonly storageKey = 'lang';

  readonly currentLang = signal<SupportedLang>(this.loadSavedLang());
  readonly translations = computed(() => this.dictionaries[this.currentLang()]);

  readonly isEn = computed(() => this.currentLang() === 'en');

  toggleLang(): void {
    const next: SupportedLang = this.currentLang() === 'pt' ? 'en' : 'pt';
    this.saveLang(next);
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }

  setLang(lang: SupportedLang): void {
    this.saveLang(lang);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: string | DeepNested = this.translations();
    for (const k of keys) {
      if (typeof value === 'object' && k in value) {
        value = (value as DeepNested)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }

  text(ptValue: string | undefined | null, enValue: string | undefined | null): string {
    if (!ptValue && !enValue) return '';
    return this.currentLang() === 'en' ? (enValue || ptValue || '') : (ptValue || enValue || '');
  }

  private loadSavedLang(): SupportedLang {
    if (!isPlatformBrowser(this.platformId)) return 'pt';
    return (localStorage.getItem(this.storageKey) as SupportedLang) || 'pt';
  }

  private saveLang(lang: SupportedLang): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.currentLang.set(lang);
    localStorage.setItem(this.storageKey, lang);
  }
}
