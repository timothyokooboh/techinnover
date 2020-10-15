export const strict = false;
import AuthDataService from "../services/AuthDataService";

export const state = () => ({
    firstName: null,
    lastName: null,
    email: null,
    age: null,
    dob: null,
    photo: null,
    familyMembers: [],
    userToken: null,
    userId: null
})

export const mutations = {
    m_logout(state) {

        //redirect to login page
        $nuxt.$router.push("/login")

        state.firstName = null;
        state.lastname = null;
        state.email = null;
        state.age= null;
        state.dob = null;
        state.familyMembers = [];
        state.photo = null;
        state.userId = null;
        state.userToken = null;

        // remove cookies
        this.$cookies.remove("v-userId");
        this.$cookies.remove("v-userToken");

    }
}


export const actions = {
    a_logout({commit}) {
        commit("m_logout")
    },

    async nuxtServerInit({state}, {redirect, route, app}) {
        // get current path
        let currentPath = route.path;

        if(currentPath == "/dashboard") {
            currentPath = "/login"
        }
        console.log(currentPath)
        // only set showOnPageLoader to true if nuxtServerInit runs on the home page
        if(route.path == "/") {
            state.showOnPageLoader = true;
        }

        const userId = app.$cookies.get("v-userId")
        const userToken = app.$cookies.get("v-userToken")
               
        try {

            const user = await AuthDataService.validateUser({ token: userToken, userId: userId})

            state.firstName = user.data.firstName
            state.lastName = user.data.lastName
            state.email = user.data.email
            state.age= user.data.age
            state.dob = user.data.dob
            state.photo = user.data.photo
            state.familyMembers= user.data.familyMembers
            state.userId = user.data._id
            state.userToken = userToken

        }
        catch(err) {
            redirect(`${currentPath}`)
        } 

    }
      
    
}

