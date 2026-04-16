import { ClipboardList, Tag } from 'lucide-react';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { en } from '@/shared/i18n';
import { Field } from '@/shared/ui/Field';
import { SectionCard } from '@/shared/ui/SectionCard';
import { TextInput } from '@/shared/ui/TextInput';

export const ProjectDataForm = () => {
  const project = useThermometerConfiguratorStore((state) => state.config.project);
  const setProjectField = useThermometerConfiguratorStore((state) => state.setProjectField);

  return (
    <SectionCard title={en.sections.projectData} icon={ClipboardList} accentClass="text-sky-400">
      <div className="space-y-4">
        <Field label={en.labels.tagNumber} htmlFor="tag-number">
          <div className="flex items-center gap-2 rounded-3xl border border-orange-400/20 bg-panelSoft px-4 py-3">
            <Tag size={16} className="text-orange-400" />
            <TextInput
              id="tag-number"
              value={project.tagNumber}
              onChange={(event) => setProjectField('tagNumber', event.currentTarget.value)}
              className="border-none bg-transparent p-0 font-bold focus:border-none"
              placeholder={en.placeholders.tagNumber}
            />
          </div>
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label={en.labels.orderNumber} htmlFor="order-number">
            <TextInput
              id="order-number"
              value={project.orderNumber}
              onChange={(event) => setProjectField('orderNumber', event.currentTarget.value)}
              placeholder={en.placeholders.orderNumber}
            />
          </Field>

          <Field label={en.labels.customer} htmlFor="customer-name">
            <TextInput
              id="customer-name"
              value={project.operatorName}
              onChange={(event) => setProjectField('operatorName', event.currentTarget.value)}
              placeholder={en.placeholders.customer}
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label={en.labels.medium} htmlFor="project-medium">
            <TextInput
              id="project-medium"
              value={project.medium}
              onChange={(event) => setProjectField('medium', event.currentTarget.value)}
              placeholder={en.placeholders.medium}
            />
          </Field>

          <Field label={en.labels.standard} htmlFor="project-standard">
            <TextInput
              id="project-standard"
              value={project.standard}
              onChange={(event) => setProjectField('standard', event.currentTarget.value)}
              placeholder={en.placeholders.standard}
            />
          </Field>
        </div>

        <Field label={en.labels.certificates} htmlFor="project-certificates">
          <TextInput
            id="project-certificates"
            value={project.certificates}
            onChange={(event) => setProjectField('certificates', event.currentTarget.value)}
            placeholder={en.placeholders.certificates}
          />
        </Field>
      </div>
    </SectionCard>
  );
};
