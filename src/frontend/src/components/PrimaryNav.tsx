import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Video, Users, Mic, CreditCard } from 'lucide-react';
import { SiFacebook, SiYoutube } from 'react-icons/si';

export default function PrimaryNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { path: '/youtube', label: 'YouTube Live', icon: SiYoutube },
    { path: '/facebook', label: 'Facebook Live', icon: SiFacebook },
    { path: '/audio', label: 'Audio Input', icon: Mic },
    { path: '/member', label: 'Member Area', icon: Users },
    { path: '/clover', label: 'Giving', icon: CreditCard },
  ];

  return (
    <nav className="flex gap-1 overflow-x-auto pb-2 -mx-2 px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path || (currentPath === '/' && item.path === '/youtube');
        
        return (
          <button
            key={item.path}
            onClick={() => navigate({ to: item.path })}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap
              transition-colors font-medium text-sm
              ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
