import * as React from "react";
import Svg, { G, Mask, Path, SvgProps } from "react-native-svg";
const userIcon = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    
    {...props}
  >
    <G id="Iconly/Light-Outline/Profile">
      <G id="Profile">
        <G id="Group 3">
          <Mask
            id="mask0_30_52"
            style={{
              maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x={4}
            y={15}
            width={18}
            height={9}
          >
            <Path
              id="Clip 2"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.33333 15.7041H21.4932V23.6926H4.33333V15.7041Z"
              fill="white"
            />
          </Mask>
          <G mask="url(#mask0_30_52)">
            <Path
              id="Fill 1"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.9143 17.3291C8.29821 17.3291 5.95821 18.1221 5.95821 19.6875C5.95821 21.267 8.29821 22.0676 12.9143 22.0676C17.5293 22.0676 19.8682 21.2746 19.8682 19.7092C19.8682 18.1297 17.5293 17.3291 12.9143 17.3291ZM12.9143 23.6926C10.792 23.6926 4.33321 23.6926 4.33321 19.6875C4.33321 16.1169 9.23096 15.7041 12.9143 15.7041C15.0365 15.7041 21.4932 15.7041 21.4932 19.7092C21.4932 23.2799 16.5965 23.6926 12.9143 23.6926Z"
              fill="#001833"
            />
          </G>
        </G>
        <G id="Group 6">
          <Mask
            id="mask1_30_52"
            style={{
              maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x={7}
            y={2}
            width={12}
            height={12}
          >
            <Path
              id="Clip 5"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.16069 2.16678H18.6657V13.6703H7.16069V2.16678Z"
              fill="white"
            />
          </Mask>
          <G mask="url(#mask1_30_52)">
            <Path
              id="Fill 4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.9143 3.71332C10.5949 3.71332 8.70772 5.5994 8.70772 7.91882C8.70014 10.2307 10.5732 12.1157 12.8829 12.1243L12.9143 12.8978V12.1243C15.2326 12.1243 17.1187 10.2372 17.1187 7.91882C17.1187 5.5994 15.2326 3.71332 12.9143 3.71332ZM12.9143 13.6702H12.8796C9.71414 13.6605 7.14989 11.0789 7.16072 7.91557C7.16072 4.74682 9.74122 2.16632 12.9143 2.16632C16.0863 2.16632 18.6657 4.74682 18.6657 7.91882C18.6657 11.0908 16.0863 13.6702 12.9143 13.6702Z"
              fill="#001833"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
export default userIcon;
