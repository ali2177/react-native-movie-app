import { View, Text, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieDb";

let { width, height } = Dimensions.get("window");

const TrendingMovie = ({ data }) => {
  const navigation = useNavigation();
  const movieCardPressHandler = (movieID) => {
    navigation.navigate("Movie", movieID);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-lg mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() => movieCardPressHandler(item.id)}
          />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

const MovieCard = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovie;
