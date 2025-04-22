import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { wp, hp } from "../constants/device";

export function CurvedTop({ color, width, height }) {
  const widthPercentage = wp(width);
  const heightPercentage = hp(height);
  const curveDepth = heightPercentage * 0.3;

  return (
    <View>
      <Svg
        width={widthPercentage}
        height={heightPercentage}
        viewBox={`0 0 ${widthPercentage} ${heightPercentage}`}
        preserveAspectRatio="none"
      >
        <Path
          d={`M0 0 Q${
            widthPercentage / 2
          } ${curveDepth} ${widthPercentage} 0 L${widthPercentage} ${heightPercentage} L0 ${heightPercentage} Z`}
          fill={color}
        />
      </Svg>
    </View>
  );
}
