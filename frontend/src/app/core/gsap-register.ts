/**
 * Registro único dos plugins GSAP para o bundler (Vite/esbuild) não criar
 * múltiplas instâncias do core — caso contrário aparecem avisos do tipo
 * "Invalid property scrollTrigger" / "Missing plugin? gsap.registerPlugin()".
 */
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const canUseDom =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (canUseDom) {
  gsap.registerPlugin(CSSPlugin, ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger, ScrollToPlugin, CSSPlugin };
