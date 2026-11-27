type P = { size?: number; className?: string };
const svg = (size: number, className: string | undefined, children: React.ReactNode, fill = 'none') => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill === 'none' ? 'currentColor' : 'none'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>
);

export const IconSearch = ({ size = 20, className }: P) => svg(size, className, <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const IconPin = ({ size = 16, className }: P) => svg(size, className, <><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const IconMenu = ({ size = 24, className }: P) => svg(size, className, <path d="M4 7h16M4 12h16M4 17h16" />);
export const IconClose = ({ size = 24, className }: P) => svg(size, className, <path d="M6 6l12 12M18 6 6 18" />);
export const IconArrow = ({ size = 18, className }: P) => svg(size, className, <path d="M5 12h14m-6-6 6 6-6 6" />);
export const IconClock = ({ size = 16, className }: P) => svg(size, className, <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconEye = ({ size = 18, className }: P) => svg(size, className, <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const IconChat = ({ size = 18, className }: P) => svg(size, className, <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z" />);
export const IconShield = ({ size = 22, className }: P) => svg(size, className, <><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>);
export const IconTag = ({ size = 22, className }: P) => svg(size, className, <><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><circle cx="7.5" cy="7.5" r="1.5" /></>);
export const IconLock = ({ size = 22, className }: P) => svg(size, className, <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>);
export const IconTrend = ({ size = 22, className }: P) => svg(size, className, <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>);
export const IconUser = ({ size = 22, className }: P) => svg(size, className, <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>);
export const IconPlus = ({ size = 22, className }: P) => svg(size, className, <path d="M12 5v14M5 12h14" />);

export const IconStar = ({ size = 16, className }: P) =>
  svg(size, className, <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z" fill="currentColor" />, 'currentColor');

export const IconVerified = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 1.5 14.6 3.4l3.2-.2 1 3.1 2.7 1.8-1 3.1 1 3.1-2.7 1.8-1 3.1-3.2-.2L12 22.5 9.4 20.6l-3.2.2-1-3.1-2.7-1.8 1-3.1-1-3.1 2.7-1.8 1-3.1 3.2.2Z" />
    <path d="m8 12.2 2.7 2.6L16.2 9.3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconWhatsapp = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z" />
  </svg>
);
