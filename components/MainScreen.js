import React, { useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    ImageBackground,
} from "react-native";
import { storage } from "./Dropdown";
import { Button } from "react-native-web";
import { ReRenderContext } from "../context/ReRenderContext";
import Calendar from "./Calendar";

const date = new Date();
const bgImage = {
    uri: "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600",
};

function PrayerTime({ navigation }) {
    const data = useContext(ReRenderContext);

    console.log("main secreen");

    let parsedPrayerTimesObject;

    try {
        parsedPrayerTimesObject = JSON.parse(
            storage.getString("stringified-prayer-times-object")
        );
    } catch (error) {
        console.log(error);
        return (
            <View style={styles.bgImgContainer}>
                <Text style={styles.text}>Error 😭</Text>
                {/* <Text>{error}</Text> */}
                <Button
                    title="Go"
                    onPress={() => navigation.navigate("Dropdown")}
                />
            </View>
        );
    }

    let timings = parsedPrayerTimesObject.data[date.getDate() - 1].timings;

    useEffect(() => {
        // console.log(parsedPrayerTimesObject.data[3].date, "parsedPrayerTimesObject");
        // console.log(timings, "timings");
        // console.log(date.getDate() - 1, "date.getDate()");
    });

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={bgImage} style={styles.bgImgContainer}>
                <Calendar />

                <View style={styles.timingsContainer}>
                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Imsak: </Text>
                        <Text style={styles.text}>
                            {timings.Imsak.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Fajr: </Text>
                        <Text style={styles.text}>
                            {timings.Fajr.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Sunrise: </Text>
                        <Text style={styles.text}>
                            {timings.Sunrise.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Dhuhr: </Text>
                        <Text style={styles.text}>
                            {timings.Dhuhr.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Asr: </Text>
                        <Text style={styles.text}>
                            {timings.Asr.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Sunset: </Text>
                        <Text style={styles.text}>
                            {timings.Sunset.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Maghrib: </Text>
                        <Text style={styles.text}>
                            {timings.Maghrib.slice(0, 5)}
                        </Text>
                    </Pressable>

                    <Pressable style={styles.container}>
                        <Text style={styles.text}>Isha: </Text>
                        <Text style={styles.text}>
                            {timings.Isha.slice(0, 5)}
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                    style={[styles.locationButtonContainer]}
                    onPress={() => navigation.navigate("Dropdown")}
                >
                    <Text style={{ color: "#fff" }}>
                        {storage.getString("location-name")}
                    </Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
}

export default PrayerTime;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#444",
    },

    bgImgContainer: {
        flex: 1,
        backgroundColor: "#444",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "center",
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#33333399",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: "#555",
        borderRadius: 7,
        width: 200,
    },

    locationButtonContainer: {
        textAlign: "center",
        backgroundColor: "#33333399",
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderWidth: 3,
        borderColor: "#555",
        borderRadius: 7,
    },

    clockContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#33333355",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: "#555",
        borderRadius: 7,
    },

    text: {
        color: "white",
        fontSize: 20,
    },

    timingsContainer: {
        padding: 8,
        marginVertical: 18,
    },
});
