import type { ReactNode } from 'react';

type ConfiguratorLayoutProps = {
  sidebar: ReactNode;
  preview: ReactNode;
};

export const ConfiguratorLayout = ({ sidebar, preview }: ConfiguratorLayoutProps) => (
  <div className="grid gap-8 xl:grid-cols-[minmax(360px,500px)_minmax(0,1fr)]">
    <div className="min-w-0">{sidebar}</div>
    <div className="min-w-0">{preview}</div>
  </div>
);

