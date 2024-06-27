import { SidebarItems } from '@/types/sidebar-types/sidebarItems';
import { Activity, Home, Info, LogOut, Ruler, User, Users } from 'lucide-react';

export const sidebarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Activities', href: '/activities', icon: Activity },
        { label: 'Measures', href: '/measures', icon: Ruler },
        { label: 'Users', href: '/users', icon: Users },
        { label: 'About', href: '/about', icon: Info },
    ]
};

export const sidebarUserItems: SidebarItems = {
    links: [
        { label: 'Профил', href: '/profile', icon: User },
        { label: 'Изход', href: '/sign-out', icon: LogOut },
    ]
};