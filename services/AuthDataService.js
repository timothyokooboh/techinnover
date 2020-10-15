import http from "./http-client";

class AuthDataService {
    register(data) {
        return http.post("/user/register", data)
    }

    login(data) {
        return http.post("/user/login", data)
    }
}

export default new AuthDataService()