import { SidebarItems } from '@/types/sidebar-types/sidebarItems';
import { Activity, BrickWall, Building2, Home, Info, LogOut, Ruler, User, Users } from 'lucide-react';

export const sidebarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Activities', href: '/activities', icon: Activity },
        { label: 'Measures', href: '/measures', icon: Ruler },
        { label: 'Users', href: '/users', icon: Users },
        { label: 'Companies', href: '/companies', icon: Building2 },
        { label: 'Projects', href: '/projects', icon: BrickWall },
        { label: 'About', href: '/about', icon: Info },
    ]
};

export const sidebarUserItems: SidebarItems = {
    links: [
        // { label: 'Профил', href: '/profile', icon: User },
        { label: 'Sign out', href: '/sign-out', icon: LogOut },
    ]
};