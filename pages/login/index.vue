
<template>
  <div class="register">
    <div class="form-container">
      <div class="form">
            <h1 class="u-uppercase"> Sign in to your account </h1>

            <v-form ref="form">

                <v-text-field
                    label="Email Addresss"
                    v-model="email"
                    outlined
                    dense
                    clearable
                    append-icon="mdi-email"
                    class="form__input"
                    :rules="emailRules"
                >
                </v-text-field>

                <v-text-field
                    label="Paaword"
                    v-model="password"
                    type="password"
                    outlined
                    dense
                    append-icon="mdi-key"
                    class="form__input"
                    :rules="passwordRules"
                >
                </v-text-field>
                    <v-btn
                    class="form__input my-5 white--text"
                    color="#20234E" 
                    @click="submit"
                    :loading="contentLoading"
                    >
                    login
                </v-btn>

            </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthDataService from "../../services/AuthDataService";

export default {
  data() {
    return {
        email: null,
        password: "",
        contentLoading: false,

        passwordRules: [
            v => !!v || "This field is required",
            v => v.length >=8 || "Password must have a minimum of 8 characters"
        ],
        emailRules: [
            v => !!v || "This field is required",
            v =>   /.+@.+\..+/.test(v) || "Must be a valid email address"
        ],
    }
   
  },
  
  methods: {
    async submit() {
     if(this.$refs.form.validate()) {
        this.contentLoading = true;

        try {
            const loginUser = await AuthDataService.login({
                email: this.email,
                password: this.password
            })

            console.log(loginUser)
            this.contentLoading = false;

            this.$store.state.firstName = loginUser.data.data.firstName;
            this.$store.state.lastName = loginUser.data.data.lastName;
            this.$store.state.email = loginUser.data.data.email;
            this.$store.state.age = loginUser.data.data.age;
            this.$store.state.dob = loginUser.data.data.dob;
            this.$store.state.familyMembers = loginUser.data.data.familyMembers;
            this.$store.state.userToken = loginUser.data.token;
          
            // save user token and user ID to cookies
            this.$cookies.set("v-userToken", loginUser.data.token);
            this.$cookies.set("v-userId", loginUser.data.data._id);

            // redirect to dashboard
            this.$router.push("/dashboard");
        }
        catch(error) {
            console.log(error)
            this.contentLoading = false
        }
     }
    }

  },

}
</script>

<style lang="scss" scoped>
@import "~assets/utilities.scss";

  .register {
    background-color: $color-primary;
    min-height: 100vh;
    padding: 2rem 0
  }

  .form-container {
    min-height: 100vh;
    width: 90%;
    margin: auto;
    background-image: 
      linear-gradient(80deg, rgba($color-plain-white, .9) 0%, rgba($color-plain-white, .9) 50%, transparent 50%),
      url("~assets/bgimage.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .form {
    width: 50%;
    margin: 2rem 0;
    padding: 2rem 1rem;
    color: $color-grey;
    position: absolute;
    top: 40%;
    left: 0%;
    transform: translateY(-40%);

    h1 {
      font-weight: 300;
      font-size: 1.8rem;
      padding-bottom: 2rem;
    }

    h2 {
      font-weight: 300;
    }

    &__input {
      width: 90%;
    }
  }
</style>