export const strict = false;

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

export const actions = {
    async nuxtServerInit({state}, {redirect, route, app}) {
        
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
            redirect("/login")
        } 

    }
      
    
}

