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
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import MovieList from "../components/MovieList";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/movieDb";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

const PersonScreen = () => {
  const navigation = useNavigation();
  const { params: person } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [man, setMan] = useState({});

  useEffect(() => {
    getPersonDetail(person.id);
    getPersonMovies(person.id);
  }, [person]);

  const getPersonDetail = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setMan(data);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
  };
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
              source={{ uri: image342(man?.profile_path) }}
              style={{ width: width * 0.74, height: height * 0.43 }}
            />
          </View>
        </View>
        <View className="mt-8">
          <Text className="text-3xl text-white font-bold text-center">
            {man?.name}
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            {man?.place_of_birth}
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row items-center justify-between bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className=" text-neutral-300 font-sm">
              {man.gender === 2 ? "Male" : "Female"}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">BirthDay</Text>
            <Text className=" text-neutral-300 font-sm">{man.birthday}</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className=" text-neutral-300 font-sm">
              {man.known_for_department}
            </Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className=" text-neutral-300 font-sm">{man.popularity}</Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            {man.biography}
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
