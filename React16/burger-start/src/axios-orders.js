import axios from "axios";


const instance = axios.create({
    baseURL : "https://react-burgerr.firebaseio.com/"
});

export default instance;