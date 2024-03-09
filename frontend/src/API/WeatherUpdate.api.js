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
        console.log("Error deleting weatherUpdate case", error);
    }
};

export const CreateWeatherUpdate = async (formData) => {
    try {
        const weatherUpdateCase = JSON.parse(formData);
        const promise = await axios.post(`${baseUrl}/weatherUpdate`, weatherUpdateCase);
        return promise.data;
    } catch (error) {
        console.log("Error Create weatherUpdate case", error);
    }
}
export const UpdateWeather= async (weather) => {
    try {
        const response = await axios.put(
            `${baseUrl}/weatherUpdate/${weather._id}`, weather);
        return response.data;
    } catch (error) {
        console.error("Error updating reunification case:", error);
    }
};



