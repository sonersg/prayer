import { StyleSheet, Text, Pressable, View } from "react-native";
import { storage } from "./Dropdown";
import moment from "moment";
import { useEffect, useState } from "react";

let dateObject = new Date();
let current = moment().format("HH:mm"); // Format the time as per your requirements

function Calendar() {
    const [date, setdate] = useState(dateObject);
    const [currentTime, setCurrentTime] = useState(current);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format("HH:mm"));
            setdate(new Date());
        }, 1000); // Update the time every 1 second (1000 milliseconds)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // setInterval(() => { // set interval METHOD
    //     setdate(new Date());
    //     setCurrentTime(moment().format("HH:mm"));
    // }, 1000);

    let parsedPrayerTimesObject = JSON.parse(
        storage.getString("stringified-prayer-times-object")
    );

    let dateInfosFromAPI =
        parsedPrayerTimesObject.data[date.getDate() - 1].date;

    return (
        <View style={styles.container}>
            <Pressable style={styles.one}>
                <Text style={[styles.text, { fontSize: 35 }]}>
                    {currentTime}
                </Text>
            </Pressable>

            <Pressable style={styles.one}>
                <Text style={styles.text}>{dateInfosFromAPI.readable}</Text>
                <Text style={styles.text}>
                    {dateInfosFromAPI.hijri.day}{" "}
                    {dateInfosFromAPI.hijri.month.en}{" "}
                    {dateInfosFromAPI.hijri.year}
                </Text>
            </Pressable>
            {/*
            <Pressable style={styles.one}>
                <Text style={[styles.text, { fontSize: 20 }]}>{day}</Text>
                <Text style={[styles.text, { fontSize: 20 }]}>{year}</Text>
            </Pressable> */}
        </View>
    );
}

export default Calendar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 50,
        justifyContent: "center",
    },

    one: {
        backgroundColor: "#333333bb",
        paddingVertical: 10,
        borderWidth: 3,
        borderColor: "#555",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 13,
        marginHorizontal: 3,
        width: 150,
    },

    text: {
        color: "antiquewhite",
        fontWeight: "bold",
        fontSize: 17,
    },
});
