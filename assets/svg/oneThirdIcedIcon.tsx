import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";
const oneThirdIcedIcon = ({ color = "black", ...props}: SvgProps) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
  
    {...props}
  >
    <Rect
      x={0.85}
      y={0.85}
      width={12.3}
      height={12.3}
      rx={3.15}
      stroke={color}
    />
  </Svg>
);
export default oneThirdIcedIcon;
