import { View, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import React from "react";
import { theme } from "../theme";

let { width, height } = Dimensions.get("window");
const Loading = () => {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-grow justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;
