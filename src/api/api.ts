import axios from "axios";

export const apiCountry = axios.create({
    baseURL: "https://689cb61758a27b18087f33a8.mockapi.io/"
    // api/country/country
})