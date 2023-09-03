import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Pressable,
    Button,
    // ToastAndroid,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { MMKV } from "react-native-mmkv";
import { ReRenderContext } from "../context/ReRenderContext";

export const storage = new MMKV();

export default function App() {
    const [countryCode, setCountryCode] = useState("AF");
    const [cityInformations, setcityInformations] = useState(
        JSON.stringify({
            name: "Andkhoy",
            countryCode: "AF",
            stateCode: "FYB",
            latitude: "36.95293000",
            longitude: "65.12376000",
        })
    );
    const [shouldFetch, setShouldFetch] = useState(false);
    const { reRender, setReRender } = useContext(ReRenderContext);

    useEffect(() => {
        let parsedCityInfos = JSON.parse(cityInformations);

        console.log("use efefevt in dropdown");
        // console.log(
        //     JSON.parse(storage.getString("stringified-prayer-times-object"))
        // );

        if (shouldFetch) {
            console.log("fetchhhhhhhhhhhhhhhhh");
            fetch(
                `https://api.aladhan.com/v1/calendar/2023/9?latitude=${parsedCityInfos.latitude}&longitude=${parsedCityInfos.longitude}&method=13`
            )
                .then(res => res.json())
                .then(data => {
                    storage.set(
                        "stringified-prayer-times-object",
                        JSON.stringify(data)
                    );

                    storage.set("location-name", parsedCityInfos.name);
                    // invoke re render
                    setReRender(prev => !prev);
                    // set shouldFetch
                    setShouldFetch(false);
                    // toast message: times r updated
                    // try {
                    //     ToastAndroid.showWithGravity(
                    //         "Updated successfully!",
                    //         ToastAndroid.LONG,
                    //         ToastAndroid.CENTER
                    //     );
                    // } catch (error) {
                    //     console.log(error, "error from Toast");
                    // }
                })
                .catch(e => {
                    console.log(e);
                    // toast message: times couldt updaed
                    // try {
                    //     ToastAndroid.showWithGravity(
                    //         "Could NOT update!",
                    //         ToastAndroid.LONG,
                    //         ToastAndroid.CENTER
                    //     );
                    // } catch (error) {
                    //     console.log(error, "error from Toast");
                    // }
                });
        }
    }, [cityInformations]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.viewContainer}>
                <Button
                    onPress={() => setReRender(prev => !prev)}
                    title="rerender?"
                />

                <View>
                    <label>Countries</label>
                    <select
                        id="Countries"
                        name="Countries"
                        // value={value}
                        onChange={e => setCountryCode(e.target.value)}
                    >
                        {Country.getAllCountries().map(country => (
                            <option
                                value={country.isoCode}
                                key={country.name}
                                style={styles.countryContainer}
                            >
                                <>
                                    {country.name === "Turkey"
                                        ? "Türkiye"
                                        : country.name}
                                </>

                                <>{country.flag}</>

                                <>{country.phonecode}</>
                            </option>
                        ))}
                    </select>
                </View>

                <View>
                    <label>Cities</label>
                    <select
                        id="Cities"
                        name="Cities"
                        // value={value}
                        onChange={e => {
                            setcityInformations(e.target.value);
                            setShouldFetch(true);
                        }}
                    >
                        {City.getCitiesOfCountry(countryCode).map(city => (
                            <option
                                value={JSON.stringify(city)}
                                key={`${city.name} + ${city.latitude} + ${city.longitude}`}
                            >
                                {city.name}
                            </option>
                        ))}
                    </select>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#444",
        justifyContent: "center",
        alignItems: "center",
    },

    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
    },

    viewContainer: {
        maxWidth: "70%",
    },
});
