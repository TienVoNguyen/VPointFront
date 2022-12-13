import axios from "axios"
import authHeader from "@/service/auth-header";
export class UserService {
    static serverURL = `http://localhost:8080`

    static createUser(user){
        let userForm = new FormData(user)
        let dataURL = `${this.serverURL}/register`
        return axios.post(dataURL, userForm, {headers: authHeader()})
    }

    static getAll(params) {
        let dataURL = `${this.serverURL}/list`
        return axios.get(dataURL, {params, headers: authHeader()});
    }
    static getAllDpm(params) {
        let dataURL = `${this.serverURL}/department/list`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getAllByYear(params) {
        let dataURL = `${this.serverURL}/listByYear`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getAllQuantity() {
        let dataURL = `${this.serverURL}/department/listQuantity`
        return axios.get(dataURL, { headers: authHeader()});
    }

    static getDpmByName(params) {
        let dataURL = `${this.serverURL}/department/getDpmByName`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getAllSymbol() {
        let dataURL = `${this.serverURL}/getAllSymbol`
        return axios.get(dataURL, { headers: authHeader()});
    }

    static deleteUser(userId){
        let dataURL = `${this.serverURL}/delete/${userId}`
        return axios.delete(dataURL, { headers: authHeader() })
    }

    static findById(userId){
        let dataURL = `${this.serverURL}/findByIdUser/${userId}`
        return axios.get(dataURL, { headers: authHeader() })
    }

    static getVpoint(userId) {
        let dataURL = `${this.serverURL}/api/mark/myVpoint/${userId}`
        return axios.get(dataURL, {headers: authHeader()});
    }

    static getVpointByYear(userId, params) {
        let dataURL = `${this.serverURL}/api/mark/myVpointByYear/${userId}`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getYear(userId) {
        let dataURL = `${this.serverURL}/api/mark/getYear/${userId}`
        return axios.get(dataURL, {headers: authHeader()});
    }

    static getVpointByTime(userId, params) {
        let dataURL = `${this.serverURL}/api/mark/${userId}`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getUserById(id) {
        let dataURL = `${this.serverURL}/user/${id}`;
        return axios.get(dataURL, {headers: authHeader()});
    }

    static getUserByName(params) {
        let dataURL = `${this.serverURL}/getUserByName`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getUserByCateId(params) {
        let dataURL = `${this.serverURL}/getUserByCate`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getUserByCateIdAndName(params) {
        let dataURL = `${this.serverURL}/getUserByCateAndName`
        return axios.get(dataURL, {params, headers: authHeader()});
    }

    static getProfileUserById(id) {
        let dataURL = `${this.serverURL}/user/profile/${id}`;
        return axios.get(dataURL, {headers: authHeader()});
    }

}
