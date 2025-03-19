import {Image, TextInput, View} from "react-native";
import React from "react";
import {icons} from "@/constants/icons";

interface Props {
    placeholder: string;
    onPress: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBar = ({placeholder, value, onChangeText, onPress}: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5" resizeMode={"contain"} tintColor={"#ab8bff"}/>
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                placeholderTextColor={"#a8b5db"}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-white"
            />
        </View>
    )
}

export default SearchBar;
