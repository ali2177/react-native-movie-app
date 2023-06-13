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
import {
  fetchMovieCredits,
  fetchMoviesDetail,
  fetchSimilarMovies,
} from "../api/movieDb";
import { image500 } from "../api/movieDb";

let movieName = "Ant-man and the Wasp: Quantumania";
let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const marginTop = ios ? "" : " mt-3";

const MovieScreen = () => {
  const navigation = useNavigation();
  const { params: movieID } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovie] = useState([]);
  useEffect(() => {
    getMoviesDetail(movieID);
    getMoviesCast(movieID);
    getMoviesSimiler(movieID);
  }, [movieID]);

  const getMoviesDetail = async (id) => {
    const data = await fetchMoviesDetail(id);
    if (data) setMovie({ ...movie, ...data });
  };
  const getMoviesCast = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };
  const getMoviesSimiler = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovie(data.results);
  };

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
            source={{ uri: image500(movie.poster_path) }}
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
          {movie?.original_title}
        </Text>
        {/* status , release , runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movie?.status} . {movie?.release_date} . {movie?.runtime} min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => (
            <Text
              key={index}
              className="text-neutral-400 font-semibold text-base text-center"
            >
              {genre.name} .
            </Text>
          ))}
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie.overview}
        </Text>
      </View>
      {/* cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similer movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
