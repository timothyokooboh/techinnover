import http from "./http-client";

class AuthDataService {
    register(data) {
        return http.post("/user/register", data)
    }

    login(data) {
        return http.post("/user/login", data)
    }

    validateUser(data) {
        return http.post("/user/validateuser", data)
    }
}

export default new AuthDataService()