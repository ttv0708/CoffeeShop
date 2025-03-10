import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const buyIcon = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    
    {...props}
  >
    <Path
      d="M2.97928 3.52072L5.23261 3.91072L6.27586 16.3398C6.35928 17.3549 7.20753 18.1338 8.22586 18.1306H20.0439C21.0157 18.1327 21.8401 17.4177 21.9777 16.4557L23.0058 9.35122C23.1206 8.55714 22.5692 7.82047 21.7762 7.70564C21.7069 7.69589 5.59445 7.69047 5.59445 7.69047"
      stroke="#001833"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.3022 11.6944H18.3063"
      stroke="#001833"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.7506 21.886C8.07669 21.886 8.33994 22.1504 8.33994 22.4754C8.33994 22.8015 8.07669 23.0658 7.7506 23.0658C7.42452 23.0658 7.16127 22.8015 7.16127 22.4754C7.16127 22.1504 7.42452 21.886 7.7506 21.886Z"
      fill="#001833"
      stroke="#001833"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9709 21.886C20.297 21.886 20.5613 22.1504 20.5613 22.4754C20.5613 22.8015 20.297 23.0658 19.9709 23.0658C19.6448 23.0658 19.3816 22.8015 19.3816 22.4754C19.3816 22.1504 19.6448 21.886 19.9709 21.886Z"
      fill="#001833"
      stroke="#001833"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default buyIcon;
