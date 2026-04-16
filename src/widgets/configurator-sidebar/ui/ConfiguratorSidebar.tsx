import { AccessoriesForm } from '@/features/accessories-form/ui/AccessoriesForm';
import { ConnectionMountingForm } from '@/features/connection-mounting-form/ui/ConnectionMountingForm';
import { GeometryRangeForm } from '@/features/geometry-range-form/ui/GeometryRangeForm';
import { OptionsForm } from '@/features/options-form/ui/OptionsForm';
import { ProjectDataForm } from '@/features/project-data-form/ui/ProjectDataForm';
import { TechnicalParamsForm } from '@/features/technical-params-form/ui/TechnicalParamsForm';

export const ConfiguratorSidebar = () => (
  <div className="app-scrollbar space-y-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-2">
    <ProjectDataForm />
    <GeometryRangeForm />
    <ConnectionMountingForm />
    <AccessoriesForm />
    <TechnicalParamsForm />
    <OptionsForm />
  </div>
);

