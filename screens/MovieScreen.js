import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";

let movieName = "Ant-man and the Wasp: Quantumania";
let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const marginTop = ios ? "" : " mt-3";

const MovieScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [similarMovies, setSimilarMovie] = useState([1, 2, 3, 4, 5, 6, 7]);
  useEffect(() => {}, [item]);

  // handler
  const backPressHandler = () => {
    navigation.goBack();
  };
  const favouritePressHandler = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "w-full flex-row justify-between items-center px-4 absolute z-20 " +
            marginTop
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={backPressHandler}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={favouritePressHandler}>
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23,23,23,0.8)",
              "rgba(23,23,23,0.99)",
            ]}
            style={{ width: width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* movie detail */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movieName}
        </Text>
        {/* status , release , runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released . 2020 . 170 min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action .
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill .
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus optio atque aut aliquam totam! Nemo perferendis aperiam
          tenetur! Ipsum tempore, laborum corporis aut aspernatur praesentium
          accusantium officia minima cupiditate necessitatibus. Numquam aliquam
          deleniti quae quod mollitia similique eos ratione suscipit aspernatur
          reiciendis harum provident officiis praesentium adipisci quos corporis
          velit, neque aliquid tempore! Distinctio aut impedit nihil laudantium
          eius ratione.
        </Text>
      </View>
      {/* cast */}
      <Cast navigation={navigation} cast={cast} />
      {/* similer movies */}
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
};

export default MovieScreen;
