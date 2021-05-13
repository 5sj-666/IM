//fetch封装
// function request() {

// }
interface reqOptions {
    data?: Object,
    header?: Object,
}

interface respond {
    ok: Boolean, 
    status: Number, 
    data?: Object,
    token?: String,
    error?: String,
}

let Request:Object = {
    async get(url:string, data:any):Promise<Object> {
        let payload = "";
        for(let key in data) {
            payload += `&${key}=${data[key]}`;
        }
        // fetch(`/api/user/hasUser?id=${account}&pwd=${password}`);
        let res = await fetch(`${url}?${payload}`);
        return res.json();
    },

    async post(url:string, options:reqOptions):Promise<respond> {
        console.log("Request post param: ", arguments);

        let res = await fetch(url, {
            body: JSON.stringify(options.data),
            headers:  {
                'content-type': 'application/json'
            },
            method: 'POST', 
        });
        return res.json();

        // example in MDN
        // fetch(url, {
        //     body: JSON.stringify(data), // must match 'Content-Type' header
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, same-origin, *omit
        //     headers: {
        //       'user-agent': 'Mozilla/4.0 MDN Example',
        //       'content-type': 'application/json'
        //     },
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, cors, *same-origin
        //     redirect: 'follow', // manual, *follow, error
        //     referrer: 'no-referrer', // *client, no-referrer
        //   })
        //   .then(response => response.json())
    },

}
export default Request;
