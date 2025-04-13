
import { Star } from "lucide-react";

type StarHalfProps = {
  className?: string;
};

const StarHalf = ({ className = "" }: StarHalfProps) => {
  return (
    <div className="relative" style={{ display: "inline-block" }}>
      {/* Empty star as background */}
      <Star className={`${className} text-gray-300`} />
      
      {/* Half-filled star overlay - clip to 50% width */}
      <div 
        className="absolute top-0 left-0 overflow-hidden" 
        style={{ width: "50%" }}
      >
        <Star className={`${className} fill-amber-500 text-amber-500`} />
      </div>
    </div>
  );
};

export default StarHalf;
