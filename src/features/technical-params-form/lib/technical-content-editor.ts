import type {
  TechnicalContentBlock,
  TechnicalTableBlock,
} from '@/entities/thermometer-config/model/types';

export const updateTechnicalBlock = (
  blocks: TechnicalContentBlock[],
  blockId: string,
  nextBlock: TechnicalContentBlock,
) => blocks.map((block) => (block.id === blockId ? nextBlock : block));

export const removeTechnicalBlock = (blocks: TechnicalContentBlock[], blockId: string) =>
  blocks.filter((block) => block.id !== blockId);

const updateTableBlock = (
  blocks: TechnicalContentBlock[],
  blockId: string,
  updater: (block: TechnicalTableBlock) => TechnicalTableBlock,
) =>
  blocks.map((block) => {
    if (block.id !== blockId || block.type !== 'table') {
      return block;
    }

    return updater(block);
  });

export const addTableRow = (blocks: TechnicalContentBlock[], blockId: string) =>
  updateTableBlock(blocks, blockId, (block) => ({
    ...block,
    rows: [...block.rows, new Array(block.columns.length).fill('')],
  }));

export const removeTableRow = (
  blocks: TechnicalContentBlock[],
  blockId: string,
  rowIndex: number,
) =>
  updateTableBlock(blocks, blockId, (block) => ({
    ...block,
    rows: block.rows.filter((_, index) => index !== rowIndex),
  }));

export const addTableColumn = (blocks: TechnicalContentBlock[], blockId: string) =>
  updateTableBlock(blocks, blockId, (block) => ({
    ...block,
    columns: [...block.columns, `Column ${block.columns.length + 1}`],
    rows: block.rows.map((row) => [...row, '']),
  }));

export const removeTableColumn = (
  blocks: TechnicalContentBlock[],
  blockId: string,
  columnIndex: number,
) =>
  updateTableBlock(blocks, blockId, (block) => ({
    ...block,
    columns: block.columns.filter((_, index) => index !== columnIndex),
    rows: block.rows.map((row) => row.filter((_, index) => index !== columnIndex)),
  }));

export const updateTableColumnHeader = (
  blocks: TechnicalContentBlock[],
  blockId: string,
  columnIndex: number,
  value: string,
) =>
  updateTableBlock(blocks, blockId, (block) => ({
    ...block,
    columns: block.columns.map((column, index) => (index === columnIndex ? value : column)),
  }));

export const updateTableCell = (
  blocks: TechnicalContentBlock[],
  blockId: string,
  rowIndex: number,
  columnIndex: number,
  value: string,
) =>
  updateTableBlock(blocks, blockId, (block) => ({
    ...block,
    rows: block.rows.map((row, currentRowIndex) =>
      currentRowIndex === rowIndex
        ? row.map((cell, currentColumnIndex) =>
            currentColumnIndex === columnIndex ? value : cell,
          )
        : row,
    ),
  }));

