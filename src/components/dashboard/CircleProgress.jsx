import { useState, useEffect } from "react";

export default function CircleProgress({ data, duration = 1200 }) {
    const radius = 70;
    const strokeWidthSale = 28;
    const strokeWidthCancel = 24;
    const strokeWidthRefund = 20;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;

    // Colors to match the image
    const saleColor = '#ED004F';
    const cancelColor = '#CD084F';
    const returnColor = '#EE6295';
    const bgColor = 'rgba(91, 147, 255, 0.05)';

    // GAP
    const GAP_PERCENT = 20; // percent of the circle left as gap
    const ACTIVE_PERCENT = 100 - GAP_PERCENT;

    // Calculate raw percentages for each segment
    const total = data.sales + data.cancel + data.refund;
    const salesRaw = data.sales / total;
    const cancelRaw = data.cancel / total;
    const refundRaw = data.refund / total;

    // Scale so segments sum to ACTIVE_PERCENT
    const salesTarget = salesRaw * ACTIVE_PERCENT;
    const cancelTarget = cancelRaw * ACTIVE_PERCENT;
    const refundTarget = refundRaw * ACTIVE_PERCENT;

    // Animated values
    const [salesPct, setSalesPct] = useState(0);
    const [cancelPct, setCancelPct] = useState(0);
    const [refundPct, setRefundPct] = useState(0);

    useEffect(() => {
        let start;
        function animate(ts) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setSalesPct(progress * salesTarget);
            setCancelPct(progress * cancelTarget);
            setRefundPct(progress * refundTarget);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setSalesPct(salesTarget);
                setCancelPct(cancelTarget);
                setRefundPct(refundTarget);
            }
        }
        requestAnimationFrame(animate);
        // eslint-disable-next-line
    }, [salesTarget, cancelTarget, refundTarget, duration]);

    // Calculate stroke dasharray for each segment
    const salesDash = (salesPct / 100) * circumference;
    const cancelDash = (cancelPct / 100) * circumference;
    const refundDash = (refundPct / 100) * circumference;
    // The gap is just the remaining circumference
    const gapDash = (GAP_PERCENT / 100) * circumference;

    return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* SVG filter for drop shadow */}
            <defs>
                <filter id="segmentShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.18" />
                </filter>
            </defs>
            {/* Background circle */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={bgColor}
                strokeWidth={strokeWidth}
            />
            {/* Return segment */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={returnColor}
                strokeWidth={strokeWidthRefund}
                strokeDasharray={`${refundDash} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(${(salesPct + cancelPct) * 3.6 - 90} 100 100)`}
                style={{ transition: 'stroke-dasharray 0.2s linear' }}
                filter="url(#segmentShadow)"
            />
            {/* Cancel segment */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={cancelColor}
                strokeWidth={strokeWidthCancel}
                strokeDasharray={`${cancelDash} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(${salesPct * 3.6 - 90} 100 100)`}
                style={{ transition: 'stroke-dasharray 0.2s linear' }}
                filter="url(#segmentShadow)"
            />
            {/* Sale segment */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={saleColor}
                strokeWidth={strokeWidthSale}
                strokeDasharray={`${salesDash} ${circumference}`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dasharray 0.2s linear' }}
                filter="url(#segmentShadow)"
            />
        </svg>
    );
} 