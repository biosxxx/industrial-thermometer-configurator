import type { PropsWithChildren, ReactNode } from 'react';

type AppShellProps = PropsWithChildren<{
  header: ReactNode;
}>;

export const AppShell = ({ header, children }: AppShellProps) => (
  <div className="min-h-screen px-4 py-4 selection:bg-orange-500/20 md:px-8 md:py-8">
    <div className="mx-auto max-w-[1500px]">
      {header}
      {children}
    </div>
  </div>
);

