import { formatScaleNumber } from '@/shared/lib/format';

type ScaleTicksProps = {
  radius: number;
  min: number;
  max: number;
};

export const ScaleTicks = ({ radius, min, max }: ScaleTicksProps) => {
  const startAngle = 225;
  const sweep = 270;
  const majorCount = 10;
  const minorPerMajor = 4;
  const ticks: JSX.Element[] = [];

  for (let index = 0; index <= majorCount * minorPerMajor; index += 1) {
    const progress = index / (majorCount * minorPerMajor);
    const angle = startAngle - progress * sweep;
    const radian = (angle * Math.PI) / 180;
    const isMajor = index % minorPerMajor === 0;
    const innerRadius = radius - (isMajor ? 12 : 6);
    const x1 = Math.cos(radian) * innerRadius;
    const y1 = -Math.sin(radian) * innerRadius;
    const x2 = Math.cos(radian) * radius;
    const y2 = -Math.sin(radian) * radius;

    ticks.push(
      <line
        key={`tick-${index}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isMajor ? '#111827' : '#6b7280'}
        strokeWidth={isMajor ? 2.2 : 1}
      />,
    );

    if (isMajor) {
      const labelRadius = radius - 25;
      const labelX = Math.cos(radian) * labelRadius;
      const labelY = -Math.sin(radian) * labelRadius;
      const value = min + (max - min) * progress;

      ticks.push(
        <text
          key={`label-${index}`}
          x={labelX}
          y={labelY + 4}
          textAnchor="middle"
          className="fill-slate-900 text-[10px] font-bold"
        >
          {formatScaleNumber(value)}
        </text>,
      );
    }
  }

  return <g>{ticks}</g>;
};

