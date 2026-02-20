import React from 'react';

interface SimplePriceChartProps {
  history: { value: number; effectiveAt: string }[];
}

export const SimplePriceChart: React.FC<SimplePriceChartProps> = ({ history }) => {
    if (history.length < 2) return null;

    // Use pure numeric timestamps for X axis logic
    const data = history.map(h => ({
        date: new Date(h.effectiveAt).getTime(),
        value: h.value
    }));

    const minVal = Math.min(...data.map(d => d.value));
    const maxVal = Math.max(...data.map(d => d.value));
    const minDate = Math.min(...data.map(d => d.date));
    const maxDate = Math.max(...data.map(d => d.date));
    
    // Add 10% padding to Y axis for better visual
    const range = maxVal - minVal;
    const padding = range === 0 ? maxVal * 0.1 : range * 0.1;
    const yMin = minVal - padding;
    const yMax = maxVal + padding;

    // Dimensions
    const width = 400;
    const height = 150;
    const margin = { top: 10, right: 10, bottom: 20, left: 45 };

    const getX = (date: number) => {
        if (maxDate === minDate) return margin.left;
        return margin.left + ((date - minDate) / (maxDate - minDate)) * (width - margin.left - margin.right);
    };

    const getY = (val: number) => {
        return height - margin.bottom - ((val - yMin) / (yMax - yMin)) * (height - margin.top - margin.bottom);
    };

    // Generate Line Path
    const points = data.map(d => `${getX(d.date)},${getY(d.value)}`).join(' ');
    
    // Generate Area Path (close the loop at the bottom)
    const areaPoints = `${points} ${getX(data[data.length-1].date)},${height - margin.bottom} ${getX(data[0].date)},${height - margin.bottom}`;

    const formatYLabel = (val: number) => {
        if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
        if (val >= 1000) return (val / 1000).toFixed(0) + 'k';
        return val.toString();
    };

    return (
        <div className="w-full mb-6">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#b0804e" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#b0804e" stopOpacity="0"/>
                    </linearGradient>
                </defs>

                {/* Grid Lines (Horizontal) */}
                <line x1={margin.left} y1={margin.top} x2={width - margin.right} y2={margin.top} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4"/>
                <line x1={margin.left} y1={height/2} x2={width - margin.right} y2={height/2} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4"/>
                <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#cbd5e1" strokeWidth="1"/>

                {/* Area Fill */}
                <path d={`M ${areaPoints} Z`} fill="url(#chartGradient)" stroke="none" />

                {/* Line */}
                <polyline 
                    points={points} 
                    fill="none" 
                    stroke="#b0804e" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Points */}
                {data.map((d, i) => (
                    <circle 
                        key={i} 
                        cx={getX(d.date)} 
                        cy={getY(d.value)} 
                        r="3.5" 
                        fill="white" 
                        stroke="#b0804e" 
                        strokeWidth="2"
                    />
                ))}

                {/* Y Axis Labels */}
                <text x={margin.left - 5} y={getY(maxVal)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-400 font-sans">{formatYLabel(maxVal)}</text>
                <text x={margin.left - 5} y={getY(minVal)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-400 font-sans">{formatYLabel(minVal)}</text>

                {/* X Axis Labels */}
                <text x={getX(minDate)} y={height - 2} textAnchor="start" className="text-[10px] fill-slate-400 font-sans">
                    {new Date(minDate).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                </text>
                <text x={getX(maxDate)} y={height - 2} textAnchor="end" className="text-[10px] fill-slate-400 font-sans">
                    {new Date(maxDate).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                </text>
            </svg>
        </div>
    );
};
