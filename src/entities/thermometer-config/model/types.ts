export type NominalSize = 63 | 100 | 160;
export type TemperatureUnit = 'degC' | 'degF';
export type ConnectionLocation = 'Lower' | 'Back' | 'Adjustable';
export type ConnectionDesign = 'Standard' | 'Design 1' | 'Design 2' | 'Design 3' | 'Design 4';
export type ThermometerFilling = 'Dry' | 'Silicone oil';
export type ThermowellType = 'Solid Machined' | 'Fabricated';
export type ThermowellDesign = 'Tapered' | 'Straight' | 'Stepped';
export type StemDiameter = 6 | 8 | 10;
export type AccessoryKey = 'thermowell';
export type BooleanOptionKey = 'redPointer' | 'dragPointer' | 'calibrationCert';

export type RangePreset = {
  min: number;
  max: number;
  label: string;
};

export type ConnectionDesignOption = {
  id: ConnectionDesign;
  label: string;
};

export type ThermowellAccessory = {
  enabled: boolean;
  type: ThermowellType;
  design: ThermowellDesign;
  material: string;
  processConnection: string;
  insertionLength: number;
  extensionLength: number;
};

export type TechnicalContentBlockType = 'text' | 'table' | 'image';

export type TechnicalTextBlock = {
  id: string;
  type: 'text';
  title: string;
  text: string;
};

export type TechnicalTableBlock = {
  id: string;
  type: 'table';
  title: string;
  columns: string[];
  rows: string[][];
};

export type TechnicalImageBlock = {
  id: string;
  type: 'image';
  title: string;
  caption: string;
  src: string;
};

export type TechnicalContentBlock = TechnicalTextBlock | TechnicalTableBlock | TechnicalImageBlock;

export type ThermometerConfiguratorState = {
  model: string;
  nominalSize: NominalSize;
  unit: TemperatureUnit;
  rangeMin: number;
  rangeMax: number;
  stem: {
    length: number;
    diameter: StemDiameter;
    material: string;
  };
  connection: {
    location: ConnectionLocation;
    design: ConnectionDesign;
    standard: string;
  };
  case: {
    material: string;
    filling: ThermometerFilling;
    window: string;
  };
  accessories: {
    thermowell: ThermowellAccessory;
  };
  options: {
    redPointer: boolean;
    dragPointer: boolean;
    calibrationCert: boolean;
  };
  project: {
    tagNumber: string;
    medium: string;
    standard: string;
    certificates: string;
    orderNumber: string;
    operatorName: string;
  };
  otherTechnicalParams: string;
  technicalContent: TechnicalContentBlock[];
};

export type ThermometerVisualLayout = {
  svgSize: number;
  cx: number;
  cy: number;
  r: number;
  rInner: number;
  rDial: number;
  stemLen: number;
  stemWidth: number;
  wellWidth: number;
  backStemLength: number;
  backStemWidth: number;
  scale: number;
  pointerRotation: number;
  redPointerRotation: number;
  headRotation: number;
  hingeOffsetY: number;
  lowerStemStartY: number;
};

export type PreviewBadgeTone = 'neutral' | 'accent' | 'info' | 'warning';

export type PreviewBadge = {
  label: string;
  tone: PreviewBadgeTone;
};

export type PdfSectionRow = {
  label: string;
  value: string;
};

export type PdfPayload = {
  fileName: string;
  sections: {
    projectData: PdfSectionRow[];
    technicalSpecifications: PdfSectionRow[];
    stemConnection: PdfSectionRow[];
    thermowell: PdfSectionRow[];
    options: PdfSectionRow[];
  };
  technicalParameters: string;
  technicalContent: TechnicalContentBlock[];
  sketchNotes: string[];
};
