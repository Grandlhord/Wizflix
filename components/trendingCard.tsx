import {Link} from "expo-router";
import {Image, Text, TouchableOpacity, View} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {images} from "@/constants/images";


const TrendingCard = ({movie: {movie_id, title, poster_url}, index}: TrendingCardProps) => {
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                <Image
                    source={{
                        uri: poster_url
                            ?
                            `https://image.tmdb.org/t/p/w500/${poster_url}`
                            : `https://placeholder.co/600x400/1a1a1a/fffff.png`
                    }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"/>
                <View className="absolute bottom-6 -left px-2 rounded-full">
                    <MaskedView maskElement={
                        <Text className="text-6xl font-bold text-white">{index + 1}</Text>
                    }>
                        <Image className="size-14"
                               resizeMode={"cover"}
                               source={images.rankingGradient}
                        />
                    </MaskedView>
                </View>
                <Text className="text-sm font-bold mt-2 text-light-200">{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard;