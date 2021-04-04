import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://snake-game-9baca-default-rtdb.firebaseio.com/'
});

export default instance;