import * as React from "react";
import Svg, { G, Path, Mask, SvgProps } from "react-native-svg";
const address = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    
    {...props}
  >
    <G id="Iconly/Light-Outline/Location">
      <G id="Location">
        <Path
          id="Fill 1"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.14608 4.95834C6.58316 4.95834 6.12524 5.41626 6.12524 5.97976C6.12524 6.54268 6.58316 7.00001 7.14608 7.00001C7.70899 7.00001 8.16691 6.54268 8.16691 5.97976C8.16691 5.41626 7.70899 4.95834 7.14608 4.95834ZM7.14608 7.87501C6.10074 7.87501 5.25024 7.02509 5.25024 5.97976C5.25024 4.93384 6.10074 4.08334 7.14608 4.08334C8.19141 4.08334 9.04191 4.93384 9.04191 5.97976C9.04191 7.02509 8.19141 7.87501 7.14608 7.87501Z"
          fill="#324A59"
          fillOpacity={0.8}
        />
        <G id="Group 5">
          <Mask
            id="mask0_29_15"
            style={{
              maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x={2}
            y={1}
            width={10}
            height={12}
          >
            <Path
              id="Clip 4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.33325 1.16667H11.958V12.5417H2.33325V1.16667Z"
              fill="white"
            />
          </Mask>
          <G mask="url(#mask0_29_15)">
            <Path
              id="Fill 3"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.14551 2.04167C4.97434 2.04167 3.20801 3.82492 3.20801 6.01592C3.20801 8.80367 6.48867 11.5197 7.14551 11.6643C7.80234 11.5191 11.083 8.80309 11.083 6.01592C11.083 3.82492 9.31667 2.04167 7.14551 2.04167ZM7.14551 12.5417C6.09901 12.5417 2.33301 9.303 2.33301 6.01592C2.33301 3.34192 4.49192 1.16667 7.14551 1.16667C9.79909 1.16667 11.958 3.34192 11.958 6.01592C11.958 9.303 8.19201 12.5417 7.14551 12.5417Z"
              fill="#324A59"
              fillOpacity={0.8}
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
export default address;
