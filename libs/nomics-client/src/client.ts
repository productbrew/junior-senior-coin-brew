import Axios from 'axios';

const NOMICS_URL = 'https://api.nomics.com/v1';
const NOMICS_KEY = 'a59ba9a2cab3c6235285bf694f9d5284';

export const nomicsClient = Axios.create({
  baseURL: NOMICS_URL,
  params: {
    key: NOMICS_KEY,
  },
});
