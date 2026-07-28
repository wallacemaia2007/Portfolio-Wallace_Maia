export interface PortfolioNavItem {
  route: string;
  icon: string;
  translateKey: string;
}

export interface PortfolioActionLink {
  route: string;
  icon: string;
  translateKey: string;
}

export const portfolioNavItems: PortfolioNavItem[] = [
  { route: '/home', icon: 'home', translateKey: 'home' },
  { route: '/about', icon: 'person', translateKey: 'about' },
  { route: '/projects', icon: 'work', translateKey: 'projects' },
  { route: '/skills', icon: 'code', translateKey: 'skills' },
  {
    route: '/experience',
    icon: 'business_center',
    translateKey: 'experience',
  },
  { route: '/contact', icon: 'email', translateKey: 'contact' },
];

export const portfolioPrimaryAction: PortfolioActionLink = {
  route: '/dev',
  icon: 'rocket_launch',
  translateKey: 'hireMe',
};

export const portfolioSecondaryAction: PortfolioActionLink = {
  route: '/assets/cv.pdf',
  icon: 'download',
  translateKey: 'downloadCv',
};
