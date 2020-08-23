import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async(country) => {
    let ChangableUrl = url;

    if(country) {
        ChangableUrl = `${url}/countries/${country}`
    }

    try {
        const {data : {confirmed, recovered, deaths, lastUpdate} } = await axios.get(ChangableUrl);
        
        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () =>{
    try {
        const { data } = await axios.get(`${url}/daily`);

        console.log(data)

        const modifiedData = data.map((dailyData) => ({
            confirmed : dailyData.confirmed.total,
            deaths : dailyData.deaths.total, 
            date : dailyData.reportDate,
        }));
        console.log(modifiedData)
        return modifiedData;
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data : {countries} } = await axios.get(`${url}/countries`);

        console.log(countries)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
        
    }
}

