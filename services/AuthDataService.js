import http from "./http-client";

class AuthDataService {
    register(data) {
        return http.post("/user/register", data)
    }
}

export default new AuthDataService()