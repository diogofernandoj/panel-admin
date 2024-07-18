import React from 'react'

const RadialProgress = ({
  percentage,
  barColor = 'white',
}: {
  percentage: number
  barColor: string
}) => {
  return (
    <div
      className={`radial-progress text-${barColor}`}
      style={{ '--value': percentage, '--size': '3rem' } as React.CSSProperties}
      role="progressbar"
    >
      <h3 className="text-xs font-semibold text-white">{percentage}%</h3>
    </div>
  )
}

export default RadialProgress