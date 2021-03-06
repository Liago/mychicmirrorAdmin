import { useEffect, useState } from "react";
import axios from 'axios';

const endpoint = 'https://www.mychicmirror.com/API/';
const rest_ep = 'https://www.mychicmirror.com/wp-json/';
const avatar_ep = 'https://api.multiavatar.com/';

const wrappedApi = ({ store }) => {
    const useRawCall = async (method, url, payload = {}, opts = {}) => {
        const token = store.getState()?.app.token || null;

        let data = null;
        let error = null;

        try {
            const response = await axios({
                baseURL: endpoint,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method,
                url,
                data: payload
            });

            data = response.data;
        } catch (e) {
            error = e;
        }

        return {
            data,
            error
        }
    }

    const useApi = (method, url, payload = {}, opts = {}) => {
        const [func, response] = useLazyApi(method, url);

        useEffect(() => {
            (async () => {
                await func(payload);
            })();
        }, []);

        return response;
    }

    const useLazyApi = (method, url, opts = {}) => {
        const [error, setError] = useState(null);
        const [event, setEvent] = useState({
            loading: true,
            data: null
        });

		const token = store.getState()?.app?.token || null;
		
        const func = async (payload = {}) => {
            try {
                setEvent({
                    loading: true,
                    data: null
                });

                const response = await axios({
                    baseURL: endpoint,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    method,
                    url,
                    data: {...payload, ...opts}
                });

                setEvent({
                    loading: false,
                    data: response.data
                });
            } catch (e) {
                setError(e);
            }
        }

        return [
            func,
            {
                error,
                loading: event.loading,
                data: event.data
            }
        ];
    }
	const useLazyRestApi = (method, url, opts = {}) => {
        const [error, setError] = useState(null);
        const [event, setEvent] = useState({
            loading: true,
            data: null
        });

		const token = store.getState()?.app?.token || null;
		
        const func = async (payload = {}) => {
            try {
                setEvent({
                    loading: true,
                    data: null
                });

                const response = await axios({
                    baseURL: rest_ep,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    method,
                    url,
                    data: {...payload, ...opts}
                });

                setEvent({
                    loading: false,
                    data: response.data
                });
            } catch (e) {
                setError(e);
            }
        }

        return [
            func,
            {
                error,
                loading: event.loading,
                data: event.data
            }
        ];
    }
	const useLazyApi_Avatar = (method, url, opts = {}) => {
        const [error, setError] = useState(null);
        const [event, setEvent] = useState({
            loading: true,
            data: null
        });

		const token = store.getState()?.app?.token || null;
		
        const func = async (payload = {}) => {
            try {
                setEvent({
                    loading: true,
                    data: null
                });

                const response = await axios({
                    baseURL: avatar_ep,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    method,
                    url,
                    data: {...payload, ...opts}
                });

                setEvent({
                    loading: false,
                    data: response.data
                });
            } catch (e) {
                setError(e);
            }
        }

        return [
            func,
            {
                error,
                loading: event.loading,
                data: event.data
            }
        ];
    }
    return {
        useRawCall,
        useApi,
        useLazyApi,
		useLazyRestApi,
		useLazyApi_Avatar
    }
}

export {
    wrappedApi
};