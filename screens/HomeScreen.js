import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import { useState } from "react";
import TrendingMovie from "../components/TrendingMovie";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const ios = Platform.OS == "ios";
const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([1, 2, 3, 4]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4]);
  const [topRated, setTopRated] = useState([1, 2, 3, 4]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between mx-4 mt-2">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* trending movie carousel */}
          <TrendingMovie data={trending} />

          {/* upcomming movies */}
          <MovieList title="Upcoming Movies" data={upcoming} />

          {/* TopRated movies */}
          <MovieList title="TopRated Movies" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
