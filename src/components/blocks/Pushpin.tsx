import React from "react";

interface PushpinProps {
  color : string;
  className? : string | string[];
};

const COLOR_MAP: Record<string,string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
};

const Pushpin : React.FC<PushpinProps> = ({color, className = ""}) => {
  const additionalClasses = Array.isArray(className) ? className.join(' ') : className;
  const bgColorClass = COLOR_MAP[color] || 'bg-gray-500';

  return (
    <div className={`rounded-full bg-radial from-red-700 from-20% to-red-900 ${additionalClasses} shadow-md/100`}>
      <div className={`rounded-full bg-radial from-red-500 from-20% to-red-900 size-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-md/100`}></div>
    </div>
  );
};
export default Pushpin;