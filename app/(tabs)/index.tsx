import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/movieCard";
import {useState} from "react";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/trendingCard";

export default function Index() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: trendingMovies,
        loading: tredningMoviesLoading,
        error: tredningMoviesError,

    } = useFetch(getTrendingMovies)

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: ''
    }))

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0"/>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
                {moviesLoading || tredningMoviesLoading ? (
                    <ActivityIndicator
                        color="#0000ff"
                        size="large"
                        className="mt-10 self-center"/>
                ) : moviesError || tredningMoviesError ? (
                    <Text>Error{moviesError?.message || tredningMoviesError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChangeText={(text: string) => setSearchQuery(text)}
                            onPress={() => {
                            }}
                        />
                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white">Trending Movies</Text>
                                <FlatList className="mb-4 mt-3"
                                          horizontal
                                          showsHorizontalScrollIndicator={false}
                                          ItemSeparatorComponent={() => <View className="w-4"/>}
                                          data={trendingMovies}
                                          renderItem={({item, index}) => (
                                              <TrendingCard
                                                  movie={item}
                                                  index={index}/>
                                          )}
                                          keyExtractor={(item) => item.movie_id.toString()}
                                />
                            </View>
                        )
                        }
                        <>
                            <Text className="text-lg, text-white font-bold mt-5 mb-3">Latest Movies</Text>
                        </>
                        <FlatList
                            data={movies}
                            renderItem={({item}) => (
                                <MovieCard
                                    id={0}
                                    title={item.title}
                                    adult={item.adult}
                                    backdrop_path={item.backdrop_path}
                                    genre_ids={[]}
                                    original_language={item.original_language}
                                    original_title={item.original_title}
                                    overview={item.overview}
                                    popularity={item.popularity}
                                    poster_path={item.poster_path}
                                    release_date={item.release_date}
                                    vote_average={item.vote_average}
                                    video={item.video}
                                    vote_count={item.vote_count}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10
                            }}

                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    </View>
                )
                }

            </ScrollView>
        </View>
    );
}
