export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to Skills Share',
    description: 'Explore our new features and start sharing your AI skills.',
    time: '2 mins ago',
    read: false,
    type: 'info',
    link: '/guide'
  },
  {
    id: '2',
    title: 'New Skill Added',
    description: 'Code Format skill is now available for download.',
    time: '1 hour ago',
    read: false,
    type: 'success',
    link: '/skill/code-format'
  },
  {
    id: '3',
    title: 'System Update',
    description: 'We will be performing maintenance tonight at 00:00 UTC.',
    time: '5 hours ago',
    read: true,
    type: 'warning'
  },
  {
    id: '4',
    title: 'Profile Completed',
    description: 'Your profile is now 100% complete.',
    time: '1 day ago',
    read: true,
    type: 'success',
    link: '/profile'
  }
];
