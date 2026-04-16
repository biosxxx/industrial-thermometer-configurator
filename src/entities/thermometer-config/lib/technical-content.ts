import { z } from 'zod';
import type {
  TechnicalContentBlock,
  TechnicalContentBlockType,
  TechnicalImageBlock,
  TechnicalTableBlock,
  TechnicalTextBlock,
} from '@/entities/thermometer-config/model/types';

const technicalTextBlockSchema = z.object({
  id: z.string(),
  type: z.literal('text'),
  title: z.string(),
  text: z.string(),
});

const technicalTableBlockSchema = z.object({
  id: z.string(),
  type: z.literal('table'),
  title: z.string(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

const technicalImageBlockSchema = z.object({
  id: z.string(),
  type: z.literal('image'),
  title: z.string(),
  caption: z.string(),
  src: z.string(),
});

export const technicalContentBlockSchema = z.discriminatedUnion('type', [
  technicalTextBlockSchema,
  technicalTableBlockSchema,
  technicalImageBlockSchema,
]);

let blockCounter = 0;

const createBlockId = () => {
  blockCounter += 1;
  return `technical-${Date.now().toString(36)}-${blockCounter.toString(36)}`;
};

const createDefaultTable = (): Pick<TechnicalTableBlock, 'columns' | 'rows'> => ({
  columns: ['Parameter', 'Value'],
  rows: [
    ['Wetted parts', '316L'],
    ['Operating pressure', '90% FSV'],
  ],
});

export const createTechnicalContentBlock = (
  type: TechnicalContentBlockType,
): TechnicalContentBlock => {
  const id = createBlockId();

  if (type === 'text') {
    const block: TechnicalTextBlock = {
      id,
      type,
      title: 'Additional note',
      text: 'Add an explanatory note, a short instruction, or a remark for the datasheet.',
    };

    return block;
  }

  if (type === 'table') {
    const block: TechnicalTableBlock = {
      id,
      type,
      title: 'Specification table',
      ...createDefaultTable(),
    };

    return block;
  }

  const block: TechnicalImageBlock = {
    id,
    type,
    title: 'Reference screenshot',
    caption: 'Upload a screenshot or a product image for the technical note.',
    src: '',
  };

  return block;
};

export const technicalContentToPlainText = (
  technicalParameters: string,
  blocks: TechnicalContentBlock[],
) =>
  [technicalParameters.trim(), ...blocks.map((block) => block.title.trim()).filter(Boolean)]
    .filter(Boolean)
    .join('\n\n');
