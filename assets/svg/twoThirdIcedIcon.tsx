import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";
const twoThirdIcedIcon = ({ color = "black", ...props}: SvgProps) => (
  <Svg
    width={29}
    height={20}
    viewBox="0 0 29 20"
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
    <Rect
      x={15.85}
      y={6.85}
      width={12.3}
      height={12.3}
      rx={3.15}
      stroke={color}
    />
  </Svg>
);
export default twoThirdIcedIcon;
