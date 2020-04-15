class API {

    static baseURL = "http://localhost:3000/api"

    static get(url) {
        return fetch(this.baseURL + url)
            .then(function (response){
                if(response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
    }


    static post(url, data) {
        return fetch(this.baseURL + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    }
}