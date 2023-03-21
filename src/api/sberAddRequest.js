"https://api.react-learning.ru/v2/"


const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({baseUrl, headers}){
        this._headers = headers;
        this._baseUrl= baseUrl;
    }
addPost(body) {
    return fetch (`${this._baseUrl}/group-10/posts`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(body)
    }).then(onResponce)

}
}

const config = {
    baseUrl: "https://api.react-learning.ru/v2",
    headers: {
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U2MTVkNzU5Yjk4YjAzOGY3N2I0ZWYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MDIzNDI1LCJleHAiOjE3MDc1NTk0MjV9.sN3kyESC9Qlq9Xg2R2guEDXp3ErtuwfBUD4d9pQP2IM'
    }
}

const api = new Api(config);

export default api;