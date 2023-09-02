import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { storage } from "./Dropdown";
import { Button } from "react-native-web";

const date = new Date();

function PrayerTime({ navigation }) {
    let parsedPrayerTimesObject;

    try {
        parsedPrayerTimesObject = JSON.parse(
            storage.getString("stringified-prayer-times-object")
        );
    } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Error 😭</Text>
                {/* <Text>{error}</Text> */}
                <Button
                    title="Go"
                    onPress={() => navigation.navigate("Dropdown")}
                />
            </View>
        );
    }

    let timings = parsedPrayerTimesObject.data[date.getDate() - 1].timings;
    let dateInDays = parsedPrayerTimesObject.data[date.getDate() - 1].date;

    useEffect(() => {
        // console.log(parsedPrayerTimesObject.data[3].date, "parsedPrayerTimesObject");
        // console.log(timings, "timings");
        // console.log(date.getDate() - 1, "date.getDate()");
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.timingsContainer}>
                {/* <Pressable style={styles.container}>
                    <Text style={styles.text}>Asr: </Text>
                    <Text style={styles.text}>{timings.Asr.slice(0, 5)}</Text>
                </Pressable> */}

                <Pressable style={[styles.container, { width: 250 }]}>
                    <Text style={{ color: "white" }}>
                        {dateInDays.readable}
                    </Text>
                    <Text style={{ color: "white" }}>
                        {dateInDays.hijri.day} {dateInDays.hijri.month.en}{" "}
                        {dateInDays.hijri.year}
                    </Text>
                </Pressable>

                {/* <Pressable style={styles.container}>
                    <Text style={styles.text}>Isha: </Text>
                    <Text style={styles.text}>{timings.Isha.slice(0, 5)}</Text>
                </Pressable> */}
            </View>

            <View style={styles.timingsContainer}>
                <Pressable style={styles.container}>
                    <Text style={styles.text}>Imsak: </Text>
                    <Text style={styles.text}>{timings.Imsak.slice(0, 5)}</Text>
                </Pressable>

                <Pressable style={styles.container}>
                    <Text style={styles.text}>Fajr: </Text>
                    <Text style={styles.text}>{timings.Fajr.slice(0, 5)}</Text>
                </Pressable>

                <Pressable style={styles.container}>
                    <Text style={styles.text}>Sunrise: </Text>
                    <Text style={styles.text}>
                        {timings.Sunrise.slice(0, 5)}
                    </Text>
                </Pressable>

                <Pressable style={styles.container}>
                    <Text style={styles.text}>Dhuhr: </Text>
                    <Text style={styles.text}>{timings.Dhuhr.slice(0, 5)}</Text>
                </Pressable>

                <Pressable style={styles.container}>
                    <Text style={styles.text}>Asr: </Text>
                    <Text style={styles.text}>{timings.Asr.slice(0, 5)}</Text>
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
                    <Text style={styles.text}>{timings.Isha.slice(0, 5)}</Text>
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
        </View>
    );
}

export default PrayerTime;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#444",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#33333355",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: "#555",
        borderRadius: 7,
        width: 200,
    },

    locationButtonContainer: {
        textAlign: "center",
        backgroundColor: "#33333355",
        paddingVertical: 7,
        paddingHorizontal: 10,
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
