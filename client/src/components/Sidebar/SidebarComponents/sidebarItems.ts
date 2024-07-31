import { SidebarItems } from '@/types/sidebar-types/sidebarItems';
import { Activity, BrickWall, Building2, ContactRound, Home, Info, LogOut, Ruler, Users } from 'lucide-react';

export const sidebarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Activities', href: '/activities', icon: Activity },
        { label: 'Measures', href: '/measures', icon: Ruler },
        { label: 'Users', href: '/users', icon: Users },
        { label: 'Artisans', href: '/artisans', icon: ContactRound },
        { label: 'Companies', href: '/companies', icon: Building2 },
        { label: 'Projects', href: '/projects', icon: BrickWall },
        { label: 'About', href: '/about', icon: Info },
    ]
};

export const sidebarUserItems: SidebarItems = {
    links: [
        { label: 'Sign out', href: '/sign-out', icon: LogOut },
    ]
};