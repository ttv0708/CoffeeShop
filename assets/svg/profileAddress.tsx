import * as React from "react";
import Svg, { Circle, Path, Mask, G, SvgProps } from "react-native-svg";
const profileAddress = (props: SvgProps) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
   
    {...props}
  >
    <Circle cx={21} cy={21} r={21} fill="#F7F8FB" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.2088 18.0833C20.4047 18.0833 19.7505 18.7375 19.7505 19.5425C19.7505 20.3467 20.4047 21 21.2088 21C22.013 21 22.6672 20.3467 22.6672 19.5425C22.6672 18.7375 22.013 18.0833 21.2088 18.0833ZM21.2088 22.25C19.7155 22.25 18.5005 21.0358 18.5005 19.5425C18.5005 18.0483 19.7155 16.8333 21.2088 16.8333C22.7022 16.8333 23.9172 18.0483 23.9172 19.5425C23.9172 21.0358 22.7022 22.25 21.2088 22.25Z"
      fill="#324A59"
    />
    <Mask
      id="mask0_0_1"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={14}
      y={12}
      width={15}
      height={17}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3334 12.6667H28.083V28.9167H14.3334V12.6667Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_0_1)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.208 13.9167C18.1063 13.9167 15.583 16.4642 15.583 19.5942C15.583 23.5767 20.2697 27.4567 21.208 27.6633C22.1463 27.4558 26.833 23.5758 26.833 19.5942C26.833 16.4642 24.3097 13.9167 21.208 13.9167ZM21.208 28.9167C19.713 28.9167 14.333 24.29 14.333 19.5942C14.333 15.7742 17.4172 12.6667 21.208 12.6667C24.9988 12.6667 28.083 15.7742 28.083 19.5942C28.083 24.29 22.703 28.9167 21.208 28.9167Z"
        fill="#324A59"
      />
    </G>
  </Svg>
);
export default profileAddress;
