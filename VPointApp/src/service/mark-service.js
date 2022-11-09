import axios from "axios";
import authHeader from "@/service/auth-header";

class MarkSerive {
  serverURL = `http://localhost:8080/api/mark`

  create (data) {
    let dataURL = `${this.serverURL}/add`
    return axios.post(dataURL, data, {
      headers: authHeader()
    })
  }

  getMarkByUserAndDate(data) {
    let dataURL = `${this.serverURL}/user/date`;
    return axios.get(dataURL, {
      params: {
        userId: data.userId,
        month: data.month,
        year: data.year
      },
      headers: authHeader()
    })
  }

  getAllMark(params) {
    let allMarkURL = `${this.serverURL}/reportmark`;
    return axios.get(allMarkURL, {
      params: params,
      headers: authHeader()
    })
  }

  getAllYear() {
    let allMarkURL = `${this.serverURL}/getallyear`;
    return axios.get(allMarkURL, {
      headers: authHeader()
    })
  }
}

export default new MarkSerive();