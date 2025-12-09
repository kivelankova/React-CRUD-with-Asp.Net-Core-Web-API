import axios from "axios";

const baseurl = "http://localhost:5000/api/"

export default {
    Tulos(url = baseurl + 'Tulos/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },

    KuormaTyyppi(url2 = baseurl + 'KuormaTyyppi/') {
        return {
            fetchAll2: () => axios.get(url2)
        }
    }
}

