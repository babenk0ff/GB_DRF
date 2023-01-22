import axios from "axios";


export default class ServerAPI {
    static server_api = 'http://localhost:8000/api/';

    static async getElems(elems) {
        return await axios.get(this.server_api + elems)
            .then(responsive => responsive.data.results)
    }
}
