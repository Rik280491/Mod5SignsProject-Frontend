const baseURL = "http://localhost:3001"
const signsURL = `${baseURL}/signs`


const get = () => {
    return fetch(signsURL).then((response => response.json()))
}



export default {
    get
}