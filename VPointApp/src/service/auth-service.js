import axios from 'axios';
import authHeader from "@/service/auth-header";

const API_URL = 'http://localhost:8080/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    getAllDepartment(){
        let dataURL = `${API_URL}getAllDepartment`
        return axios.get(dataURL, { headers: authHeader() })
    }

    getAllRole(){
        let dataURL = `${API_URL}getAllRole`
        return axios.get(dataURL, { headers: authHeader() })
    }

    getUserPage(params){
        let dataURL = `${API_URL}list`
        return axios.get(dataURL, {params, headers: authHeader() })
    }

    getAllUser(){
        let dataURL = `${API_URL}getAllUser`
        return axios.get(dataURL, { headers: authHeader() })
    }

    logout() {
        localStorage.removeItem('user');
        return true;
    }
    createUser(user){
        let dataURL = `${API_URL}register`
        return axios.post(dataURL, user, {headers: authHeader()})
    }

    createDpm(dpm){
        let dataURL = `${API_URL}department/create`
        return axios.post(dataURL, dpm, {headers: authHeader()})
    }

    editDpm(dpmId, dpm){
        let dataURL = `${API_URL}department/update/${dpmId}`
        return axios.put(dataURL, dpm, {headers: authHeader()})
    }

    findDpm(dpmId){
        let dataURL = `${API_URL}department/${dpmId}`
        return axios.get(dataURL, {headers: authHeader()})
    }

    lockUser(userId){
        let dataURL = `${API_URL}lockUser/${userId}`
        return axios.put(dataURL, {headers: authHeader()})
    }

    unlockUser(userId){
        let dataURL = `${API_URL}unlockUser/${userId}`
        return axios.put(dataURL, {headers: authHeader()})
    }

    editUser(userId, user){
        let dataURL = `${API_URL}update/${userId}`
        return axios.put(dataURL, user, {headers: authHeader()})
    }
    adminRepass(idUser, changePass){
        let dataURL = `${API_URL}adminChangePassword/${idUser}`
        return axios.post(dataURL, changePass, {headers: authHeader()})
    }
    userRepass(idUser, changePass){
        let dataURL = `${API_URL}userChangePassword/${idUser}`
        return axios.post(dataURL, changePass, {headers: authHeader()})
    }
    adminGetYear() {
        let dataURL = `${API_URL}adminGetYear`
        return axios.get(dataURL, { headers: authHeader()});
    }
}

export default new AuthService();
