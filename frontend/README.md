# 📚 GUIA COMPLETO: Função de Cada Componente do Portfolio

## 🎯 ÍNDICE
1. [Componente Principal](#componente-principal)
2. [Páginas Principais](#páginas-principais)
3. [Componentes de Projetos](#componentes-de-projetos)
4. [Componentes de Skills](#componentes-de-skills)
5. [Componentes de Experiência](#componentes-de-experiência)
6. [Componentes Compartilhados](#componentes-compartilhados)
7. [Services](#services)
8. [Models](#models)
9. [Fluxo de Dados](#fluxo-de-dados)

---

## 🏠 COMPONENTE PRINCIPAL

### `portfolio.component.ts`
**Função**: Container principal de todo o portfolio

**O que faz:**
- É o "esqueleto" do portfolio
- Carrega o Navbar (menu)
- Renderiza as páginas filhas através do `<router-outlet>`
- Carrega o Footer
- Gerencia o layout geral

**Exemplo de uso:**
```typescript
// Estrutura básica
<app-navbar></app-navbar>
<main>
  <router-outlet></router-outlet>  // Aqui entram as páginas
</main>
<app-footer></app-footer>
```

**Analogia**: É como a estrutura de uma casa - teto (navbar), paredes (main), piso (footer)

---

## 📄 PÁGINAS PRINCIPAIS

### 1. `home.component.ts`
**Função**: Página inicial do portfolio (primeira impressão)

**O que contém:**
- Hero section (seção de apresentação principal)
- Seu nome e título profissional
- Call-to-action (botões para contato/download CV)
- Breve introdução
- Links para outras seções
- Últimos projetos em destaque (opcional)

**Exemplo visual:**
```
═══════════════════════════════════════════
        👋 Olá, eu sou João Silva
        Desenvolvedor Full Stack
        
        [Ver Projetos]  [Contato]
═══════════════════════════════════════════
```

### 2. `about.component.ts`
**Função**: Página "Sobre Mim" (quem você é)

**O que contém:**
- Biografia detalhada
- Sua foto profissional
- Seus valores e filosofia de trabalho
- Hobbies e interesses
- Educação
- Certificações
- Download de currículo

**Exemplo de conteúdo:**
```
Sobre Mim
─────────
[Foto]   Sou desenvolvedor com 5 anos de experiência...
         Apaixonado por criar soluções inovadoras...
         
         Educação: Ciência da Computação - UFMG
         Certificações: AWS, Angular, etc.
```

### 3. `projects.component.ts`
**Função**: Lista de todos os seus projetos

**O que contém:**
- Grid de cards de projetos
- Filtros por categoria (web, mobile, etc)
- Busca por nome/tecnologia
- Ordenação (mais recente, mais popular)
- Paginação (se muitos projetos)

**Exemplo visual:**
```
Meus Projetos
─────────────
[Todos] [Web] [Mobile] [Desktop]  [🔍 Buscar...]

┌─────────┐ ┌─────────┐ ┌─────────┐
│ Projeto1│ │ Projeto2│ │ Projeto3│
│  [...]  │ │  [...]  │ │  [...]  │
└─────────┘ └─────────┘ └─────────┘
```

**Usa os componentes:**
- `project-grid` (organiza os cards)
- `project-filter` (filtros)
- `project-card` (cada projeto)

### 4. `project-detail.component.ts`
**Função**: Detalhes completos de um projeto específico

**O que contém:**
- Imagens/screenshots do projeto
- Descrição completa
- Tecnologias usadas
- Desafios e soluções
- Link demo + código (GitHub)
- Sua função no projeto
- Data de início/fim

**Rota**: `/projects/meu-projeto-id`

**Exemplo visual:**
```
E-commerce Dashboard
────────────────────
[Imagem Grande do Projeto]

Descrição: Sistema completo de gerenciamento...

🛠 Tecnologias: Angular, Node.js, MongoDB

[Ver Demo] [Ver Código]
```

### 5. `skills.component.ts`
**Função**: Mostra suas habilidades técnicas

**O que contém:**
- Skills organizadas por categoria
- Nível de proficiência (estrelas/barras)
- Ícones das tecnologias
- Tempo de experiência

**Exemplo visual:**
```
Minhas Habilidades
──────────────────

Frontend
├─ Angular     ★★★★★ (5 anos)
├─ React       ★★★☆☆ (2 anos)
└─ TypeScript  ★★★★☆ (4 anos)

Backend
├─ Node.js     ★★★★☆
└─ Python      ★★★☆☆
```

**Usa os componentes:**
- `skill-category` (agrupa por categoria)
- `skill-card` (cada skill individual)

### 6. `experience.component.ts`
**Função**: Timeline da sua experiência profissional

**O que contém:**
- Histórico de empregos/freelances
- Linha do tempo visual
- Cargo e empresa
- Período de trabalho
- Responsabilidades
- Conquistas/resultados

**Exemplo visual:**
```
Experiência Profissional
────────────────────────

2023 - Presente
● Senior Developer - Empresa X
  - Liderou time de 5 devs
  - Aumentou performance em 40%

2020 - 2023
● Full Stack Developer - Empresa Y
  - Desenvolveu 10+ projetos
  - Implementou CI/CD
```

**Usa os componentes:**
- `experience-timeline` (linha do tempo)
- `experience-card` (cada experiência)

### 7. `contact.component.ts`
**Função**: Formulário de contato

**O que contém:**
- Formulário (nome, email, mensagem)
- Suas informações de contato
- Links para redes sociais
- Mapa de localização (opcional)
- Email direto / WhatsApp

**Exemplo visual:**
```
Entre em Contato
────────────────

Nome:     [____________]
Email:    [____________]
Mensagem: [____________]
          [____________]
          
[Enviar Mensagem]

📧 joao@email.com
📱 (11) 99999-9999
📍 São Paulo, SP
```

---

## 🎨 COMPONENTES DE PROJETOS

### 1. `project-card.component.ts`
**Função**: Card individual de cada projeto (versão resumida)

**Props que recebe:**
```typescript
@Input() project: Project = {
  id: '1',
  title: 'E-commerce',
  thumbnail: 'image.jpg',
  shortDescription: 'Sistema de vendas...',
  technologies: ['Angular', 'Node'],
  featured: true
}
```

**O que exibe:**
```
┌──────────────────┐
│  [Imagem]        │
│  E-commerce      │
│  Sistema de...   │
│  Angular | Node  │
│  [Ver Mais]      │
└──────────────────┘
```

**Onde é usado**: Na página `projects` para listar todos os projetos

### 2. `project-filter.component.ts`
**Função**: Filtros para pesquisar/filtrar projetos

**O que faz:**
- Filtro por categoria (web, mobile, desktop)
- Filtro por tecnologia (Angular, React, etc)
- Campo de busca por nome
- Ordenação (mais recente, A-Z, etc)

**Output que emite:**
```typescript
@Output() filterChange = new EventEmitter<{
  category: string;
  technology: string;
  search: string;
  sort: 'date' | 'name';
}>();
```

**Exemplo:**
```
Filtrar por:
┌──────────────────────────────────────┐
│ Categoria: [Todos ▼]                 │
│ Tecnologia: [Angular ▼]              │
│ Buscar: [_____________]              │
│ Ordenar: [Mais recente ▼]            │
└──────────────────────────────────────┘
```

### 3. `project-grid.component.ts`
**Função**: Organiza os project-cards em um grid responsivo

**O que faz:**
- Recebe array de projetos
- Renderiza múltiplos `project-card`
- Layout responsivo (3 colunas desktop, 1 mobile)
- Mensagem quando não há projetos

**Template:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  @for (project of projects; track project.id) {
    <app-project-card [project]="project"></app-project-card>
  }
</div>
```

---

## 💡 COMPONENTES DE SKILLS

### 1. `skill-card.component.ts`
**Função**: Card individual de cada habilidade

**Props que recebe:**
```typescript
@Input() skill: Skill = {
  name: 'Angular',
  category: 'frontend',
  level: 5,
  icon: 'assets/icons/angular.svg',
  yearsOfExperience: 4
}
```

**O que exibe:**
```
┌─────────────────┐
│ [🅰️]  Angular  │
│ ★★★★★           │
│ 4 anos          │
└─────────────────┘
```

### 2. `skill-category.component.ts`
**Função**: Agrupa skills por categoria

**Props que recebe:**
```typescript
@Input() category: SkillCategory = {
  name: 'Frontend',
  skills: [
    { name: 'Angular', level: 5 },
    { name: 'React', level: 3 }
  ]
}
```

**O que exibe:**
```
Frontend
────────────────────
[Angular Card] [React Card] [Vue Card]

Backend
────────────────────
[Node Card] [Python Card]
```

---

## 💼 COMPONENTES DE EXPERIÊNCIA

### 1. `experience-card.component.ts`
**Função**: Card de cada experiência profissional

**Props que recebe:**
```typescript
@Input() experience: Experience = {
  company: 'Google',
  position: 'Senior Developer',
  startDate: new Date('2020-01-01'),
  endDate: new Date('2023-12-31'),
  description: 'Desenvolveu aplicações...',
  technologies: ['Angular', 'GCP'],
  achievements: [
    'Aumentou performance em 40%',
    'Liderou equipe de 5 pessoas'
  ]
}
```

**O que exibe:**
```
┌────────────────────────────────────┐
│ Google                             │
│ Senior Developer                   │
│ Jan 2020 - Dez 2023 (4 anos)      │
│                                    │
│ Desenvolveu aplicações...          │
│                                    │
│ ✓ Aumentou performance em 40%      │
│ ✓ Liderou equipe de 5 pessoas      │
│                                    │
│ Tech: Angular, GCP                 │
└────────────────────────────────────┘
```

### 2. `experience-timeline.component.ts`
**Função**: Linha do tempo visual das experiências

**Props que recebe:**
```typescript
@Input() experiences: Experience[] = [...];
```

**O que exibe:**
```
2024 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━● Presente
     │ Empresa X - Senior Dev
     │
2020 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━● 2023
     │ Empresa Y - Full Stack
     │
2018 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━● 2020
       Empresa Z - Junior Dev
```

**Renderiza**: Múltiplos `experience-card` organizados em timeline

---

## 🧩 COMPONENTES COMPARTILHADOS

### 1. `navbar.component.ts`
**Função**: Menu de navegação principal

**O que contém:**
- Logo/Nome
- Links para seções (Home, About, Projects, Skills, etc)
- Botão de tema (dark/light)
- Menu hamburguer (mobile)
- Link para Download CV

**Exemplo desktop:**
```
┌─────────────────────────────────────────────┐
│ [Logo] Home About Projects Skills Contact   │
│                           [☀️/🌙] [📄 CV]    │
└─────────────────────────────────────────────┘
```

**Exemplo mobile:**
```
┌──────────────────┐
│ [Logo]     [☰]   │
└──────────────────┘
```

**Funcionalidades:**
- Destaca a página atual (active route)
- Smooth scroll para seções
- Sticky/Fixed no scroll
- Transição de cor no scroll

### 2. `footer.component.ts`
**Função**: Rodapé do site

**O que contém:**
- Copyright
- Links rápidos (navegação)
- Redes sociais
- Email de contato
- Botão "voltar ao topo"

**Exemplo:**
```
═══════════════════════════════════════════════
Links Rápidos          Redes Sociais
─────────────          ─────────────
• Home                 [GitHub] [LinkedIn]
• Projects             [Twitter] [Email]
• Contact              

© 2024 João Silva - Todos os direitos reservados
═══════════════════════════════════════════════
```

### 3. `section-header.component.ts`
**Função**: Cabeçalho reutilizável para cada seção

**Props que recebe:**
```typescript
@Input() title: string = 'Meus Projetos';
@Input() subtitle?: string = 'Alguns trabalhos que desenvolvi';
@Input() icon?: string = 'code';
```

**O que exibe:**
```
════════════════════════════════════
        💻 Meus Projetos
    Alguns trabalhos que desenvolvi
════════════════════════════════════
```

**Onde usar**: No topo de cada seção (Projects, Skills, etc)

### 4. `social-links.component.ts`
**Função**: Ícones de redes sociais clicáveis

**Props que recebe:**
```typescript
@Input() links: SocialLink[] = [
  { name: 'GitHub', url: 'https://...', icon: 'github' },
  { name: 'LinkedIn', url: 'https://...', icon: 'linkedin' }
];
@Input() size: 'small' | 'medium' | 'large' = 'medium';
```

**O que exibe:**
```
[GitHub] [LinkedIn] [Twitter] [Email]
```

**Onde usar**: Footer, Contact page, About page

### 5. `hero-section.component.ts`
**Função**: Seção principal/destaque (geralmente na home)

**O que contém:**
- Título grande (seu nome)
- Subtítulo (sua profissão)
- Descrição breve
- Call-to-action buttons
- Imagem/avatar
- Animações de entrada

**Exemplo:**
```
═══════════════════════════════════════════════
                                    [Sua Foto]
  👋 Olá, eu sou
  João Silva
  
  Desenvolvedor Full Stack especializado
  em criar experiências web incríveis
  
  [Ver Meus Projetos]  [Entre em Contato]
═══════════════════════════════════════════════
```

---

## ⚙️ SERVICES

### 1. `portfolio.service.ts`
**Função**: Gerencia todos os dados do portfolio

**Métodos principais:**
```typescript
export class PortfolioService {
  // Projetos
  getProjects(): Observable<Project[]>
  getFeaturedProjects(): Observable<Project[]>
  getProjectById(id: string): Observable<Project>
  filterProjects(filter: FilterOptions): Observable<Project[]>
  
  // Skills
  getSkills(): Observable<SkillCategory[]>
  getSkillsByCategory(category: string): Observable<Skill[]>
  
  // Experiência
  getExperience(): Observable<Experience[]>
  
  // Dados pessoais
  getPersonalInfo(): Observable<PersonalInfo>
}
```

**Onde é injetado**: Em todas as páginas que precisam de dados

**Exemplo de uso:**
```typescript
// No component projects
constructor(private portfolioService: PortfolioService) {}

ngOnInit() {
  this.portfolioService.getProjects().subscribe(projects => {
    this.projects = projects;
  });
}
```

### 2. `theme.service.ts`
**Função**: Gerencia tema claro/escuro

**Métodos principais:**
```typescript
export class ThemeService {
  currentTheme = signal<'light' | 'dark'>('light');
  
  toggleTheme(): void
  setTheme(theme: 'light' | 'dark'): void
  getTheme(): 'light' | 'dark'
  isDarkMode(): boolean
}
```

**Onde é usado**: No navbar (botão de tema)

**Exemplo de uso:**
```typescript
// No navbar
toggleTheme() {
  this.themeService.toggleTheme();
}
```

### 3. `analytics.service.ts`
**Função**: Rastreia ações do usuário (opcional)

**Métodos principais:**
```typescript
export class AnalyticsService {
  trackPageView(page: string): void
  trackEvent(category: string, action: string): void
  trackProjectClick(projectId: string): void
  trackDownloadCV(): void
}
```

**Onde é usado**: Em componentes para rastrear interações

**Exemplo:**
```typescript
// Quando usuário clica em um projeto
onProjectClick(project: Project) {
  this.analyticsService.trackProjectClick(project.id);
  this.router.navigate(['/projects', project.id]);
}
```

### 4. `contact.service.ts`
**Função**: Envia mensagens do formulário de contato

**Métodos principais:**
```typescript
export class ContactService {
  sendMessage(contactData: ContactForm): Observable<any>
  validateEmail(email: string): boolean
  sendToEmail(to: string, subject: string, message: string): Observable<any>
}
```

**Onde é usado**: Na página Contact

**Exemplo:**
```typescript
// No component contact
onSubmit() {
  this.contactService.sendMessage(this.form.value).subscribe({
    next: () => this.toastr.success('Mensagem enviada!'),
    error: () => this.toastr.error('Erro ao enviar')
  });
}
```

---

## 📊 MODELS (Interfaces)

### 1. `project.model.ts`
**Define**: Estrutura de um projeto

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
  featured: boolean;
  startDate: Date;
  endDate?: Date;
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
}

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'other';
```

### 2. `skill.model.ts`
**Define**: Estrutura de uma habilidade

```typescript
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 1 | 2 | 3 | 4 | 5;
  icon?: string;
  yearsOfExperience?: number;
  color?: string;
}

export interface SkillCategory {
  name: string;
  icon?: string;
  skills: Skill[];
}

export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'tools' 
  | 'soft-skills';
```

### 3. `experience.model.ts`
**Define**: Estrutura de experiência profissional

```typescript
export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  location: string;
  type: 'full-time' | 'part-time' | 'freelance' | 'internship';
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
  companyUrl?: string;
}
```

### 4. `contact.model.ts`
**Define**: Estrutura do formulário de contato

```typescript
export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability: string;
}
```

### 5. `social-link.model.ts`
**Define**: Estrutura de links sociais

```typescript
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
  username?: string;
}
```

---

## 🔄 FLUXO DE DADOS (Como tudo se conecta)

### Exemplo: Listar Projetos

```
1. User acessa /projects
   ↓
2. projects.component.ts é carregado
   ↓
3. ngOnInit() chama portfolioService.getProjects()
   ↓
4. portfolioService busca dados (pode ser API ou arquivo local)
   ↓
5. Retorna Observable<Project[]>
   ↓
6. projects.component recebe os dados
   ↓
7. Passa os dados para project-grid
   ↓
8. project-grid renderiza múltiplos project-card
   ↓
9. User vê a lista de projetos
   ↓
10. User clica em um card
    ↓
11. Navega para /projects/:id
    ↓
12. project-detail carrega detalhes do projeto específico
```

### Exemplo: Filtrar Projetos

```
1. User seleciona filtro "Angular" em project-filter
   ↓
2. project-filter emite evento filterChange
   ↓
3. projects.component recebe o evento
   ↓
4. Chama portfolioService.filterProjects({ technology: 'Angular' })
   ↓
5. Service retorna projetos filtrados
   ↓
6. projects.component atualiza lista
   ↓
7. project-grid re-renderiza com novos dados
   ↓
8. User vê apenas projetos com Angular
```

### Exemplo: Trocar Tema

```
1. User clica no botão ☀️/🌙 no navbar
   ↓
2. navbar chama themeService.toggleTheme()
   ↓
3. themeService muda o valor do signal
   ↓
4. Adiciona/remove classe 'dark' no <body>
   ↓
5. CSS do Tailwind aplica estilos dark: automaticamente
   ↓
6. Salva preferência no localStorage
   ↓
7. Toda a aplicação muda de tema
```

---

## 🎯 RESUMO: Quando usar cada componente

### Use nas PÁGINAS:
- **home**: Primeira impressão, call-to-action
- **about**: Sua história, educação, valores
- **projects**: Lista todos os projetos com filtros
- **project-detail**: Detalhes de um projeto específico
- **skills**: Suas habilidades técnicas organizadas
- **experience**: Histórico profissional em timeline
- **contact**: Formulário e informações de contato

### Use os COMPONENTES em:
- **navbar**: Em todas as páginas (layout principal)
- **footer**: Em todas as páginas (layout principal)
- **section-header**: No início de cada seção
- **hero-section**: Na página home
- **social-links**: Footer, contact, about
- **project-card**: Para listar projetos
- **project-grid**: Para organizar project-cards
- **project-filter**: Para filtrar projetos
- **skill-card**: Para mostrar cada skill
- **skill-category**: Para agrupar skills
- **experience-card**: Para cada experiência
- **experience-timeline**: Para visualizar timeline

### Use os SERVICES para:
- **portfolio.service**: Buscar qualquer dado (projects, skills, etc)
- **theme.service**: Trocar entre light/dark mode
- **analytics.service**: Rastrear ações do usuário
- **contact.service**: Enviar mensagens de contato

---

## 💡 DICA FINAL

**Ordem recomendada de desenvolvimento:**

1. ✅ Criar estrutura (já feito!)
2. 📝 Implementar Models (interfaces)
3. 💾 Criar dados mock (data/)
4. ⚙️ Implementar Services (lógica)
5. 🎨 Criar componentes básicos (navbar, footer)
6. 📄 Criar páginas uma por vez (começar pela Home)
7. 🎨 Estilizar com Tailwind CSS
8. 🔗 Conectar rotas
9. ✨ Adicionar animações
10. 🚀 Deploy!

---

**Agora você entende a função de cada componente!** 🎉

Cada um tem uma responsabilidade específica e trabalha em conjunto para criar um portfolio profissional e completo.