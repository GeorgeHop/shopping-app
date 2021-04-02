import { Dimensions } from "react-native";
import Colors from "./Colors";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
      width,
      height
    },
    BorderRadius: {
        Regular: {borderRadius: 10},
        Circle: {borderRadius: 100},
    },
    Shadows: {
        Regular: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        ShadowToTop: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.28,
            shadowRadius: 10.00,

            elevation: 24,
        }
    },
}
