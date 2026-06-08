import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

if (typeof window !== 'undefined') {
    window.axios = axios;
}
