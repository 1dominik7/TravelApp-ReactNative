import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const styles = StyleSheet.create({
    profile: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 110,
        alignItems: "center"
    },
    image: {
        resizeMode: "cover",
        height: 100,
        width: 100,
        borderColor: COLORS.lightWhite,
        borderWidth: 2,
        borderRadius: 90,
    },
    name: {
        backgroundColor: COLORS.gray,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12
    }
})

export default styles