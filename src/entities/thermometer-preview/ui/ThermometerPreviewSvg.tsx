import type {
  ConnectionDesign,
  ThermometerConfiguratorState,
  ThermometerVisualLayout,
  ThermowellDesign,
} from '@/entities/thermometer-config/model/types';
import { ScaleTicks } from '@/entities/thermometer-preview/ui/ScaleTicks';

type ThermometerPreviewSvgProps = {
  config: ThermometerConfiguratorState;
  visual: ThermometerVisualLayout;
};

const ThreadMarks = ({
  width,
  startY,
  height,
  lines = 4,
}: {
  width: number;
  startY: number;
  height: number;
  lines?: number;
}) => (
  <>
    {Array.from({ length: lines }).map((_, index) => {
      const y = startY + ((index + 1) * height) / (lines + 1);
      return (
        <line
          key={`${width}-${startY}-${index}`}
          x1={-width / 2}
          x2={width / 2}
          y1={y}
          y2={y}
          stroke="#6b7280"
          strokeWidth={0.8}
        />
      );
    })}
  </>
);

const StandardStemAssembly = ({
  design,
  visual,
}: {
  design: ConnectionDesign;
  visual: ThermometerVisualLayout;
}) => {
  const nutWidth = visual.stemWidth * 2.7;
  const threadWidth = visual.stemWidth * 1.8;
  const stemStart = 46;

  if (design === 'Design 1') {
    return (
      <g>
        <rect
          x={-visual.stemWidth / 2}
          y={0}
          width={visual.stemWidth}
          height={visual.stemLen + 36}
          fill="url(#stemGrad)"
          stroke="#8b8b8b"
        />
      </g>
    );
  }

  if (design === 'Standard') {
    return (
      <g>
        <rect x={-threadWidth / 2} y={0} width={threadWidth} height={22} fill="#d7d7d7" stroke="#7b7b7b" />
        <ThreadMarks width={threadWidth} startY={0} height={22} />
        <rect
          x={-visual.stemWidth / 2}
          y={22}
          width={visual.stemWidth}
          height={visual.stemLen + 20}
          fill="url(#stemGrad)"
          stroke="#8b8b8b"
        />
      </g>
    );
  }

  if (design === 'Design 2') {
    return (
      <g>
        <path
          d={`M ${-nutWidth / 2} 0 L ${nutWidth / 2} 0 L ${nutWidth / 2} 20 L ${-nutWidth / 2} 20 Z`}
          fill="#d4d4d4"
          stroke="#747474"
        />
        <rect x={-threadWidth / 2} y={20} width={threadWidth} height={20} fill="#d8d8d8" stroke="#7b7b7b" />
        <ThreadMarks width={threadWidth} startY={20} height={20} />
        <rect
          x={-visual.stemWidth / 2}
          y={40}
          width={visual.stemWidth}
          height={visual.stemLen + 14}
          fill="url(#stemGrad)"
          stroke="#8b8b8b"
        />
      </g>
    );
  }

  if (design === 'Design 3') {
    return (
      <g>
        <ellipse cx={0} cy={12} rx={nutWidth / 2} ry={12} fill="#dddddd" stroke="#7d7d7d" />
        <rect x={-threadWidth / 2} y={24} width={threadWidth} height={18} fill="#d8d8d8" stroke="#7b7b7b" />
        <ThreadMarks width={threadWidth} startY={24} height={18} />
        <rect
          x={-visual.stemWidth / 2}
          y={42}
          width={visual.stemWidth}
          height={visual.stemLen + 14}
          fill="url(#stemGrad)"
          stroke="#8b8b8b"
        />
      </g>
    );
  }

  return (
    <g>
      <path
        d={`M ${-nutWidth / 2} 0 L ${nutWidth / 2} 0 L ${threadWidth / 1.3} 16 L ${-threadWidth / 1.3} 16 Z`}
        fill="#d9d9d9"
        stroke="#7d7d7d"
      />
      <rect x={-threadWidth / 2} y={16} width={threadWidth} height={20} fill="#d8d8d8" stroke="#7b7b7b" />
      <ThreadMarks width={threadWidth} startY={16} height={20} />
      <rect
        x={-visual.stemWidth / 2}
        y={stemStart}
        width={visual.stemWidth}
        height={visual.stemLen + 16}
        fill="url(#stemGrad)"
        stroke="#8b8b8b"
      />
    </g>
  );
};

const ThermowellBody = ({
  design,
  visual,
  extensionLength,
}: {
  design: ThermowellDesign;
  visual: ThermometerVisualLayout;
  extensionLength: number;
}) => {
  const extensionVisual = Math.min(42, extensionLength * 0.35);
  const bodyStart = 24 + extensionVisual;
  const tipY = bodyStart + visual.stemLen + 10;

  return (
    <g>
      <rect
        x={-(visual.wellWidth * 0.62) / 2}
        y={0}
        width={visual.wellWidth * 0.62}
        height={24}
        fill="#d8d8d8"
        stroke="#6f6f6f"
      />
      <ThreadMarks width={visual.wellWidth * 0.62} startY={0} height={24} />

      {extensionVisual > 0 ? (
        <rect
          x={-visual.wellWidth * 0.2}
          y={24}
          width={visual.wellWidth * 0.4}
          height={extensionVisual}
          fill="url(#stemGrad)"
          stroke="#8b8b8b"
        />
      ) : null}

      {design === 'Tapered' ? (
        <path
          d={`M ${-visual.wellWidth / 2} ${bodyStart} L ${-visual.wellWidth / 3} ${tipY} L ${visual.wellWidth / 3} ${tipY} L ${visual.wellWidth / 2} ${bodyStart} Z`}
          fill="url(#wellGrad)"
          stroke="#6f6f6f"
        />
      ) : null}

      {design === 'Straight' ? (
        <rect
          x={-visual.wellWidth / 2}
          y={bodyStart}
          width={visual.wellWidth}
          height={visual.stemLen + 10}
          fill="url(#wellGrad)"
          stroke="#6f6f6f"
        />
      ) : null}

      {design === 'Stepped' ? (
        <g>
          <rect
            x={-(visual.wellWidth * 0.95) / 2}
            y={bodyStart}
            width={visual.wellWidth * 0.95}
            height={visual.stemLen * 0.35}
            fill="url(#wellGrad)"
            stroke="#6f6f6f"
          />
          <rect
            x={-(visual.wellWidth * 0.72) / 2}
            y={bodyStart + visual.stemLen * 0.35}
            width={visual.wellWidth * 0.72}
            height={visual.stemLen * 0.35}
            fill="url(#wellGrad)"
            stroke="#6f6f6f"
          />
          <rect
            x={-(visual.wellWidth * 0.48) / 2}
            y={bodyStart + visual.stemLen * 0.7}
            width={visual.wellWidth * 0.48}
            height={visual.stemLen * 0.34}
            fill="url(#wellGrad)"
            stroke="#6f6f6f"
          />
        </g>
      ) : null}
    </g>
  );
};

const LowerOrAdjustableAssembly = ({ config, visual }: ThermometerPreviewSvgProps) => (
  <g transform={`translate(0, ${visual.lowerStemStartY})`}>
    {config.accessories.thermowell.enabled ? (
      <ThermowellBody
        design={config.accessories.thermowell.design}
        visual={visual}
        extensionLength={config.accessories.thermowell.extensionLength}
      />
    ) : (
      <StandardStemAssembly design={config.connection.design} visual={visual} />
    )}
  </g>
);

const BackAssembly = ({ config, visual }: ThermometerPreviewSvgProps) => (
  <g>
    <rect
      x={-visual.backStemWidth / 2}
      y={24}
      width={visual.backStemWidth}
      height={visual.backStemLength * 0.24}
      fill="#d4d4d4"
      stroke="#7b7b7b"
    />
    <ThreadMarks width={visual.backStemWidth} startY={24} height={visual.backStemLength * 0.24} />

    {config.accessories.thermowell.enabled ? (
      <g transform={`translate(0, ${24 + visual.backStemLength * 0.24})`}>
        <ThermowellBody
          design={config.accessories.thermowell.design}
          visual={visual}
          extensionLength={config.accessories.thermowell.extensionLength}
        />
      </g>
    ) : (
      <rect
        x={-visual.stemWidth / 2}
        y={24 + visual.backStemLength * 0.24}
        width={visual.stemWidth}
        height={visual.backStemLength}
        fill="url(#stemGrad)"
        stroke="#8b8b8b"
      />
    )}
  </g>
);

export const ThermometerPreviewSvg = ({ config, visual }: ThermometerPreviewSvgProps) => (
  <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="caseGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e3e3e3" />
        <stop offset="45%" stopColor="#fafafa" />
        <stop offset="100%" stopColor="#d0d0d0" />
      </linearGradient>
      <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#dcdcdc" />
        <stop offset="50%" stopColor="#fafafa" />
        <stop offset="100%" stopColor="#bcbcbc" />
      </linearGradient>
      <linearGradient id="wellGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#c8c8c8" />
        <stop offset="45%" stopColor="#f5f5f5" />
        <stop offset="100%" stopColor="#b2b2b2" />
      </linearGradient>
      <filter id="dropshadow" height="135%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="2" dy="3" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.24" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <clipPath id="thermometerFaceClip">
        <circle cx="0" cy="0" r={visual.rDial} />
      </clipPath>
    </defs>

    <g transform={`translate(${visual.cx}, ${visual.cy}) rotate(${visual.headRotation})`}>
      {config.connection.location === 'Back' ? <BackAssembly config={config} visual={visual} /> : null}

      <circle r={visual.r} fill="url(#caseGrad)" stroke="#9f9f9f" strokeWidth="1" filter="url(#dropshadow)" />
      <circle r={visual.rInner} fill="none" stroke="#b3b3b3" strokeWidth="4" />
      <circle r={visual.rDial} fill="#ffffff" />

      {config.case.filling !== 'Dry' ? (
        <g clipPath="url(#thermometerFaceClip)">
          <path
            d={`M -${visual.rDial} -${visual.rDial * 0.52} Q 0 -${visual.rDial * 0.42} ${visual.rDial} -${visual.rDial * 0.52} L ${visual.rDial} ${visual.rDial} L -${visual.rDial} ${visual.rDial} Z`}
            fill="rgba(180, 215, 255, 0.22)"
          />
          <path
            d={`M -${visual.rDial} -${visual.rDial * 0.52} Q 0 -${visual.rDial * 0.42} ${visual.rDial} -${visual.rDial * 0.52}`}
            stroke="rgba(73, 132, 201, 0.35)"
            fill="none"
            strokeWidth="1"
          />
        </g>
      ) : null}

      <ScaleTicks radius={visual.rDial} min={config.rangeMin} max={config.rangeMax} />

      <text y={visual.rDial * 0.38} textAnchor="middle" className="fill-slate-900 text-[14px] font-black tracking-[0.32em]">
        TG
      </text>
      <text y={visual.rDial * 0.54} textAnchor="middle" className="fill-slate-600 text-[11px] font-bold">
        {config.unit}
      </text>
      <text y={visual.rDial * 0.7} textAnchor="middle" className="fill-slate-400 text-[8px] font-bold">
        EN 13190
      </text>

      {config.project.tagNumber.trim() ? (
        <>
          <rect
            x={-visual.rDial * 0.36}
            y={visual.rDial * 0.08}
            width={visual.rDial * 0.72}
            height={18}
            fill="rgba(255,255,255,0.9)"
            rx="2"
          />
          <text
            y={visual.rDial * 0.08 + 12}
            textAnchor="middle"
            className="fill-slate-950 text-[10px] font-bold tracking-[0.08em]"
          >
            {config.project.tagNumber}
          </text>
        </>
      ) : null}

      {config.options.redPointer ? (
        <g transform={`rotate(${visual.redPointerRotation})`}>
          <polygon points={`0,-10 4,-${visual.rDial * 0.7} 0,-${visual.rDial * 0.76} -4,-${visual.rDial * 0.7}`} fill="#dc2626" opacity="0.92" />
        </g>
      ) : null}

      {config.options.dragPointer ? (
        <g transform="rotate(35)">
          <path
            d={`M -1 0 L -2 -${visual.rDial * 0.76} L 2 -${visual.rDial * 0.76} L 1 0 Z`}
            fill="#475569"
            opacity="0.6"
          />
        </g>
      ) : null}

      <g transform={`rotate(${visual.pointerRotation})`} filter="url(#dropshadow)">
        <circle r="5" fill="#111827" />
        <path d={`M -2 0 L -1 -${visual.rDial * 0.84} L 1 -${visual.rDial * 0.84} L 2 0 Z`} fill="#111827" />
        <path d="M -3 0 L -4 15 L 4 15 L 3 0 Z" fill="#111827" />
      </g>

      <circle r="2.2" fill="#8a8a8a" />

      {config.connection.location !== 'Back' ? <LowerOrAdjustableAssembly config={config} visual={visual} /> : null}
    </g>
  </svg>
);
