import { View, Text, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

let { width, height } = Dimensions.get("window");

const movieCardPressHandler = ({ navigation }) => {
  navigation.navigate("Movie", item);
};
const TrendingMovie = ({ data }) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} onPress={movieCardPressHandler} />
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
        source={require("../assets/images/moviePoster1.png")}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovie;
