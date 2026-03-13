import axios from "axios";

export const fetchAllCountryByNames = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
        const countryNames = response.data.map((country : any) => country.name.common).sort();
        return countryNames;
    } catch(error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}