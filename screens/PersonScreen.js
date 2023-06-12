import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";
const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
        }
      >
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeftIcon size={28} strokeWidth={3} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFavorite(!isFavorite);
          }}
        >
          <HeartIcon size={35} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person detail */}
      <View>
        <View
          className="flex-row justify-center"
          style={{
            elevation: 4,
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="rounded-full overflow-hidden items-start h-72 w-72 border-2 border-neutral-400">
            <Image
              source={require("../assets/images/castImage1.png")}
              style={{ width: width * 0.74, height: height * 0.43 }}
            />
          </View>
        </View>
        <View className="mt-8">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            London, United Kingdaom
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row items-center justify-between bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className=" text-neutral-300 font-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">BirthDay</Text>
            <Text className=" text-neutral-300 font-sm">1964-09-02</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className=" text-neutral-300 font-sm">Acting</Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className=" text-neutral-300 font-sm">64.23</Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
            sed qui, dolor cum, ea assumenda aspernatur, at ex vitae error
            commodi voluptatibus rem possimus perspiciatis distinctio quos
            tempore minus iure. Harum quasi laudantium consequatur dolor
            repellat, eveniet iste. Amet, iste! Laborum inventore explicabo
            consequuntur quam, harum vero sunt cumque fugit deleniti itaque
            incidunt excepturi corrupti aperiam assumenda quidem libero
            aspernatur.
          </Text>
        </View>
        {/* movie list */}
        <MovieList
          title="Person Movies"
          hideSeeAll={true}
          data={personMovies}
        />
      </View>
    </ScrollView>
  );
};

export default PersonScreen;
