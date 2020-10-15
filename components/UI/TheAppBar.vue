<template>
    <div>
        <v-app-bar
            app
            color="#fff"
        >
            <v-btn 
                to="/" 
                text 
                class="mr-5"
                color="#20234E"
                v-if="!$store.state.userToken"
            >
                Register
            </v-btn>

            <v-btn 
                to="/dashboard" 
                text 
                class="mr-5"
                color="#20234E"
                v-if="$store.state.userToken"
            >
                Dashboard
            </v-btn>

            <v-btn 
                @click="a_logout"
                text 
                color="#20234E"
                v-if="$store.state.userToken"
            >
                Logout
            </v-btn>

            <v-btn 
                to="/login" 
                text
                color="#20234E"
                v-if="!$store.state.userToken"
            >
                Login
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    methods: {
      ...mapActions(["a_logout"])
    }
}
</script>