import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

import "./App.css";

function App() {
    const [countryCode, setCountryCode] = useState("AF");
    const [cityInformations, setcityInformations] = useState();

    useEffect(() => {
        let parsedString = JSON.parse(cityInformations);

        fetch(
            `https://api.aladhan.com/v1/calendar/2023/9?latitude=${parsedString.latitude}&longitude=${parsedString.longitude}&method=13`
        )
            .then(res => res.json())
            .then(data => console.log(data));
    }, [cityInformations]);

    return (
        <>
            <>
                <label>Countries</label>
                <select
                    id="Countries"
                    name="Countries"
                    // value={value}
                    onChange={e => setCountryCode(e.target.value)}
                >
                    {Country.getAllCountries().map(country => (
                        <option value={country.isoCode} key={country.name}>
                            <>
                                {country.name === "Turkey"
                                    ? "Türkiye"
                                    : country.name}
                            </>

                            <>{country.flag}</>
                        </option>
                    ))}
                </select>
            </>

            <>
                <label>Cities</label>
                <select
                    id="Cities"
                    name="Cities"
                    // value={value}
                    onChange={e => setcityInformations(e.target.value)}
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
            </>
        </>
    );
}

export default App;
