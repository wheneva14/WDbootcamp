import axios from 'axios';

const KEY = 'AIzaSyD0eEbXo-TPl7SeKsE88-F2ZnrlaWD4-T0';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
    },
});