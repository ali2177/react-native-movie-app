import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image185, image342 } from "../api/movieDb";

let { width, height } = Dimensions.get("window");
const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  let movieName = "Ant-man and the Wasp: Quantumania";

  const clickHandler = (movieID) => {
    navigation.push("Movie", movieID);
  };
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        <TouchableOpacity>
          {!hideSeeAll && (
            <Text style={styles.text} className="text-base">
              See All
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => clickHandler(item.id)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 mr-4">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
