import * as React from "react";
import Svg, { Circle, Mask, Path, G, SvgProps } from "react-native-svg";
const profileName = (props: SvgProps) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
   
    {...props}
  >
    <Circle cx={21} cy={21} r={21} fill="#F7F8FB" />
    <Mask
      id="mask0_0_1"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={14}
      y={23}
      width={14}
      height={7}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3334 23.0801H27.5333V29.2251H14.3334V23.0801Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_0_1)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9341 24.3301C17.3833 24.3301 15.5833 24.9401 15.5833 26.1442C15.5833 27.3592 17.3833 27.9751 20.9341 27.9751C24.4841 27.9751 26.2833 27.3651 26.2833 26.1609C26.2833 24.9459 24.4841 24.3301 20.9341 24.3301ZM20.9341 29.2251C19.3016 29.2251 14.3333 29.2251 14.3333 26.1442C14.3333 23.3976 18.1008 23.0801 20.9341 23.0801C22.5666 23.0801 27.5333 23.0801 27.5333 26.1609C27.5333 28.9076 23.7666 29.2251 20.9341 29.2251Z"
        fill="#324A59"
      />
    </G>
    <Mask
      id="mask1_0_1"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={16}
      y={12}
      width={10}
      height={10}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5083 12.6667H25.3583V21.5156H16.5083V12.6667Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask1_0_1)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9342 13.8564C19.15 13.8564 17.6983 15.3072 17.6983 17.0914C17.6925 18.8697 19.1333 20.3197 20.91 20.3264L20.9342 20.9214V20.3264C22.7175 20.3264 24.1683 18.8747 24.1683 17.0914C24.1683 15.3072 22.7175 13.8564 20.9342 13.8564ZM20.9342 21.5156H20.9075C18.4725 21.5081 16.5 19.5222 16.5083 17.0889C16.5083 14.6514 18.4933 12.6664 20.9342 12.6664C23.3742 12.6664 25.3583 14.6514 25.3583 17.0914C25.3583 19.5314 23.3742 21.5156 20.9342 21.5156Z"
        fill="#324A59"
      />
    </G>
  </Svg>
);
export default profileName;
