
<template>
  <div class="register">
    <v-snackbar
      top
      :timeout="5000"
      color="red"
      class="white--text"
      v-model="showSnackbar"
    >
      <div class="text-center">Something went wrong. Please try again</div>
    </v-snackbar>

    <div class="form-container">
      <div class="form">
        <h1 class="u-uppercase">Kindly fill your personal details</h1>

        <v-form ref="form">
          <v-text-field
            label="First Name"
            v-model="user.userDetails.firstName"
            outlined
            dense
            clearable
            append-icon="mdi-account"
            class="form__input"
            :rules="formRules"
          >
          </v-text-field>

          <v-text-field
            label="Last Name"
            v-model="user.userDetails.lastName"
            outlined
            dense
            clearable
            append-icon="mdi-account"
            class="form__input"
            :rules="formRules"
          >
          </v-text-field>

          <v-menu offset-x :close-on-content-click="false">
            <template v-slot:activator="{on}">
              <v-text-field 
                label="Date of birth"
                v-model="user.userDetails.dob"
                outlined 
                dense
                v-on="on" 
                class="form__input"
                @input="useDatePicker"
                :rules="formRules"
              > 
                Date of birth 
              </v-text-field>
            </template>
            <v-date-picker v-model="dob"> </v-date-picker>
          </v-menu>

          <v-text-field
            disabled
            label="Age"
            v-model="user.userDetails.age"
            type="number"
            outlined
            dense
            clearable
            append-icon="mdi-counter"
            class="form__input"
            :rules="ageRules"
          >
          </v-text-field>
          <p class="red--text" v-if="(user.userDetails.age < 18 || user.userDetails.age > 65 )&& showAgeRules">Age must be between 18 and 65</p>

          <v-text-field
            label="Email Addresss"
            v-model="user.userDetails.email"
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
            v-model="user.userDetails.password"
            type="password"
            outlined
            dense
            append-icon="mdi-key"
            class="form__input"
            :rules="passwordRules"
          >
          </v-text-field>

          <v-file-input
            label="Upload passport"
            dense
            @change="handleFileUpload"
            id="file"
            class="form__input"
            :rules="formRules"
          >
          </v-file-input>
          <small>Must have a max size of 1mb </small>

          <h2 class="u-uppercase mt-5">Add family members</h2>

          <v-btn 
            fab 
            color="#1D5FA9" 
            class="my-5"
            small
            @click="showFamilyForm"
          >
            <v-icon color="#fff">mdi-plus</v-icon>
          </v-btn>

          <!-- displays the list of family memebers -->
          <v-card
            dark
            v-for="(member, index) in user.familyMembers"
            :key="index"
            class="my-2 pa-5"
            min-width=100
          >
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" text class="pb-5 float-right" @click="removeFamilyMember(index)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>Close form</span>
            </v-tooltip>

            <div class="u-uppercase py-2">Family member {{index + 1}}</div>
            <div class="py-2">First name: {{member.familyMemberFirstName}} </div>
            <div class="py-2">Last name: {{member.familyMemberLastName}} </div>
            <div class="py-2">Age: {{member.familyMemberAge}} </div>
            <div class="py-2">Relationship: {{member.relationship}} </div>
          </v-card>

          <!-- holds the form for adding family members -->
          <v-card class="pa-5 my-5" elevation="20" v-if="showForm" >

            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" text class="pb-5 float-right" @click="hideForm">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>Close form</span>
            </v-tooltip>

            <v-form ref="familyForm">
              <v-text-field
                label="First Name"
                v-model="familyMemberFirstName"
                dense
                class="mt-5"
                :rules="formRules"
              >
              </v-text-field>

              <v-text-field
                label="Last Name"
                v-model="familyMemberLastName"
                dense
                :rules="formRules"
              >
              </v-text-field>

              <v-text-field
                label="Age"
                v-model="familyMemberAge"
                dense
                type=number
                :rules="formRules"
              >
              </v-text-field>

              <v-text-field
                label="Relationship"
                v-model="relationship"
                dense
                placeholder="e.g brother"
                :rules="formRules"
              >
              </v-text-field>

              <v-btn 
                @click="addToFamilyMembers" 
                class="my-3 white--text"
                color="#1D5FA9" 
                width="100%"
              >
                Add to family members
              </v-btn>
            </v-form>

          </v-card>
        
          <div>
            <v-btn
              class="form__input my-5 white--text"
              color="#20234E" 
              @click="submit"
              :loading="contentLoading"
            >
            submit
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthDataService from "../services/AuthDataService";

export default {
  data() {
    return {
      showAgeRules: false,
      showSnackbar: false,
      showForm: false,
      dob: null,
      file: null,

      familyMemberFirstName: null,
      familyMemberLastName: null,
      familyMemberAge: null,
      relationship: null,

      user: {
        userDetails: {
          firstName: null,
          lastName: null,
          email: null,
          age: null,
          dob: null,
          password: ""
        },
        familyMembers: []
      },

      // validation rules for the form
      formRules: [
        v => !!v || "This field is required"
      ],
      passwordRules: [
        v => !!v || "This field is required",
        v => v.length >=8 || "Password must have a minimum of 8 characters"
      ],
      emailRules: [
        v => !!v || "This field is required",
        v =>   /.+@.+\..+/.test(v) || "Must be a valid email address"
      ],
      ageRules: [
        v => (v >= 18 && v <=65)
      ],

      contentLoading: false
    }
  },
  
  methods: {
    showFamilyForm() {
      // shows the form for adding family members
      this.showForm = true;
    },
    hideForm() {
      this.showForm = false
    },
    addToFamilyMembers() {
      // Add family members after validating the form
      if(this.$refs.familyForm.validate()) {
        this.user.familyMembers.push({
        familyMemberFirstName: this.familyMemberFirstName,
        familyMemberLastName: this.familyMemberLastName,
        familyMemberAge: this.familyMemberAge,
        relationship: this.relationship
      })
    
        // clear the family member form
        this.familyMemberFirstName = null
        this.familyMemberLastName = null
        this.familyMemberAge = null
        this.relationship = null

        // Then hide the form
        this.showForm = false
      }
     
    },
    removeFamilyMember(index) {
      this.user.familyMembers.splice(index, 1)
    },
    useDatePicker() {
      alert("Please use the date picker")
    },
    handleFileUpload() {
      const image = document.querySelector("#file")
      this.file = image.files[0]
      console.log(this.file)
    },
    async submit() {
      // validate the form before submitting to the database
      if(this.$refs.form.validate()) {
        this.contentLoading = true;

        const formData = new FormData()
        formData.append("image", this.file)
        formData.set("firstName", this.user.userDetails.firstName)
        formData.set("lastName", this.user.userDetails.lastName)
        formData.set("age", this.user.userDetails.age)
        formData.set("dob", this.user.userDetails.dob)
        formData.set("email", this.user.userDetails.email)
        formData.set("password", this.user.userDetails.password)
        formData.append("familyMembers", JSON.stringify(this.user.familyMembers))

        try {
          const addUser = await AuthDataService.register(formData)
          this.contentLoading = false;
          console.log(addUser)

          this.$store.state.firstName = addUser.data.data.firstName;
          this.$store.state.lastName = addUser.data.data.lastName;
          this.$store.state.email = addUser.data.data.email;
          this.$store.state.age = addUser.data.data.age;
          this.$store.state.dob = addUser.data.data.dob;
          this.$store.state.familyMembers = addUser.data.data.familyMembers;
          this.$store.state.photo = addUser.data.data.passportPhoto;
          this.$store.state.userToken = addUser.data.token
          
          // save user token and user ID to cookies
          this.$cookies.set("v-userToken", addUser.data.token);
          this.$cookies.set("v-userId", addUser.data.data._id);

          // redirect to dashboard
          this.$router.push("/dashboard");

        }
        catch(err) {
          this.showSnackbar = true;
          this.contentLoading = false;
        }
      } else {
        this.showAgeRules = true
        window.scrollTo(0, 0)
      }
    }

  },

  watch: {
    dob(newValue) {
      this.user.userDetails.dob = newValue

      let year = newValue.slice(0, 4)
      this.user.userDetails.age = new Date().getFullYear() - Number(year)
    }
  }
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
      linear-gradient(80deg, rgba($color-plain-white, .9) 0%, rgba($color-plain-white, .9) 60%, transparent 60%),
      url("~assets/bgimage.jpg");
    background-size: cover;
    background-position: center;

    @media only screen and(max-width: 54.7em) {
      background-image: 
      linear-gradient(80deg, rgba($color-plain-white, .9) 0%, rgba($color-plain-white, .9) 100%),
      url("~assets/bgimage.jpg");
    }
  }

  .form {
    width: 60%;
    margin: 2rem 0;
    padding: 2rem 1rem;
    color: $color-grey;

    @media only screen and(max-width: 54.7em) {
      width: 100%;
    }

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