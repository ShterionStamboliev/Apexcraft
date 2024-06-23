import { SidebarItems } from '@/types/sidebar-types/sidebarItems';
import { Home, Info, LogOut, Table, User, Users } from 'lucide-react';

export const sidebarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Tables', href: '/tables', icon: Table },
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