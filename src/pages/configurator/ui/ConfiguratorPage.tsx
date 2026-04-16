import { useRef } from 'react';
import { AppShell } from '@/widgets/app-shell/ui/AppShell';
import { ConfiguratorLayout } from '@/widgets/configurator-layout/ui/ConfiguratorLayout';
import { ConfiguratorSidebar } from '@/widgets/configurator-sidebar/ui/ConfiguratorSidebar';
import { ExportToolbar } from '@/widgets/export-toolbar/ui/ExportToolbar';
import { ThermometerPreviewStage } from '@/widgets/thermometer-preview-stage/ui/ThermometerPreviewStage';

export const ConfiguratorPage = () => {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <AppShell header={<ExportToolbar previewRef={previewRef} />}>
      <ConfiguratorLayout
        sidebar={<ConfiguratorSidebar />}
        preview={<ThermometerPreviewStage previewRef={previewRef} />}
      />
    </AppShell>
  );
};

