import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const marginTop = ios ? "" : " mt-3";
let movieName = "Ant-man and the Wasp: Quantumania";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className={
          "mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-3xl" +
          marginTop
        }
      >
        <TextInput
          placeholder="Search movie"
          placeholderTextColor="gray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback key={index}>
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={require("../assets/images/moviePoster2.png")}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-400 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            className="h-96 w-96"
            source={require("../assets/images/movieTime.png")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
