import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const sizeLargeIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={38}
    viewBox="0 0 17 22"
    fill="none"
    
    {...props}
  >
    <Path
      d="M15.4652 3.1425H15.4045L15.4237 2.93246C15.4241 2.92788 15.4245 2.92329 15.4248 2.9187C15.4845 2.06761 15.2131 1.22549 14.6988 0.666005C14.304 0.236496 13.7931 0 13.2601 0C13.2598 0 13.2596 0 13.2594 0L3.5637 0.00394517C3.03057 0.00415958 2.5194 0.240999 2.12434 0.670808C1.60996 1.23051 1.33827 2.07263 1.39759 2.92354C1.39793 2.92813 1.39831 2.93272 1.39869 2.93731L1.41782 3.14748C0.626043 3.20833 0 3.88021 0 4.69797V5.65137C0 6.50906 0.688495 7.20685 1.53477 7.20685H1.78737L3.08092 21.4159C3.11105 21.7468 3.38501 22 3.71293 22H3.71322L13.1013 21.9959C13.429 21.9958 13.7027 21.7427 13.733 21.412L15.0326 7.20689H15.4652C16.3115 7.20689 17 6.50911 17 5.65142V4.69801C17 3.84028 16.3115 3.1425 15.4652 3.1425V3.1425ZM3.05316 1.54762C3.16097 1.43034 3.33716 1.29046 3.56416 1.29037L13.2599 1.28647H13.2601C13.4867 1.28647 13.6626 1.42592 13.7702 1.54295C14.0475 1.84458 14.1927 2.32191 14.1591 2.82093L14.1297 3.1425H2.69216L2.66339 2.82642C2.63009 2.32731 2.7756 1.84969 3.05316 1.54762V1.54762ZM12.9666 15.8551H3.84947L3.34532 10.3175H13.4732L12.9666 15.8551ZM4.29175 20.7133L3.96659 17.1415H12.8489L12.5225 20.7097L4.29175 20.7133ZM13.591 9.03106H3.22821L3.06213 7.20689H13.7578L13.591 9.03106ZM15.7307 5.65142C15.7307 5.79975 15.6116 5.92042 15.4652 5.92042H1.53481C1.38846 5.92042 1.26939 5.79975 1.26939 5.65142V4.69801C1.26939 4.54969 1.38846 4.42901 1.53481 4.42901H15.4652C15.6115 4.42901 15.7306 4.54969 15.7306 4.69801V5.65142H15.7307Z"
      fill={props.fill || "currentColor"}
    />
  </Svg>
);
export default sizeLargeIcon;
