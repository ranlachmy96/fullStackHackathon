import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = "https://fullstackhackathon.onrender.com";

export const GetAllWeatherUpdates = async () => {
    const res = await axios.get(baseUrl + "/weatherUpdate", {withCredentials: true})
    return res.data;
};

export const GetWeatherUpdateById = async (_id) => {
    return await axios.get(`${baseUrl}/weatherUpdate/${_id}`);
};

export const deleteWeatherUpdate = async (_id) =>{
    try{
        return await axios.delete(`${baseUrl}/weatherUpdate/${_id}`);
    } catch (error){
        console.log("Error deleting reunification case", error);
    }
};

export const getTemperatureByDates = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${baseUrl}/weatherUpdate`);
        const allWeatherUpdates = response.data;

        const temperatureData = allWeatherUpdates.filter(weatherUpdate => {
            const date = new Date(weatherUpdate.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        }).map(weatherUpdate => weatherUpdate.temperature);

        return temperatureData;
    } catch (error) {
        console.log("Error fetching temperature data", error);
        throw error;
    }
};


