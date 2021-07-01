import axios from 'axios';
axios.defaults.baseURL = 'http://10.11.24.118:8181/dataclean/'
axios.defaults.crossDomain = true;
//axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;
axios.$get = function(url, params,myConfig){
    return new Promise((resolve, reject) =>{
        let config= {
            params: params
        };
        if(myConfig){
            config=Object.assign(config,myConfig);
        }
        axios.get(url,config,
            {
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
            }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err)
        })
    })
}
axios.$post = function(url, params) {
    var headers = {
        'Content-Type':'application/json;charset=utf-8;',
    };
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params),
            {
                headers:headers,
            }).then(res => {
            resolve(res.data);
        })
            .catch(err =>{
                console.log(err)
                reject(err.data)
            })
    })
}
axios.$put = function(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, JSON.stringify(params),
            {
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
            },
        ).then(res => {
            resolve(res.data);
        })
            .catch(err =>{
                reject(err.data)
            })
    })
}
axios.$delete = (url) =>{
    return new Promise((resolve, reject) =>{
        axios.delete(url).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    })
}
export default axios
