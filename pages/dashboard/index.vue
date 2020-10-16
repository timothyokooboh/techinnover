<template>
    <div class="profile">
        <v-card class="py-5" flat>
            <div class="text-center">
                <v-avatar size="100">
                    <v-img :src="$store.state.photo"></v-img>
                </v-avatar>

                <div class="profile__details">
                    <div class="profile__details--content my-4">
                        <div>First name</div>
                        <div> {{$store.state.firstName}} </div>
                    </div>
                    <div class="profile__details--content my-4">
                        <div>Last name</div>
                        <div>{{$store.state.lastName}}</div>
                    </div>
                    <div class="profile__details--content my-4">
                        <div>Email</div>
                        <div>{{$store.state.email}}</div>
                    </div>
                    <div class="profile__details--content my-4">
                        <div>Date of birth</div>
                        <div>{{$store.state.dob}}</div>
                    </div>
                    <div class="profile__details--content my-4">
                        <div>Age</div>
                        <div>{{$store.state.age}}</div>
                    </div>

                    <h2>Family members</h2>

                    <v-card
                        v-for="(member, index) in $store.state.familyMembers"
                        :key="index"
                        class="family-member my-5 py-2"
                    >
                        <div class="family-member__details">
                            <div class="family-member__details--content">
                                <div>First name</div>
                                <div>{{member.familyMemberFirstName}}</div>
                            </div>
                            <div class="family-member__details--content">
                                <div>Last name</div>
                                <div>{{member.familyMemberLastName}}</div>
                            </div>
                            <div class="family-member__details--content">
                                <div>Age</div>
                                <div>{{member.familyMemberAge}}</div>
                            </div>
                            <div class="family-member__details--content">
                                <div>Relationship</div>
                                <div>{{member.relationship}}</div>
                            </div>
                        </div>
                        
                    </v-card>
                    
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    middleware: ["auth"],
    
    data() {
        return {
            familyMembers: [
                {
                    familyMemberFirstName: "daniel",
                    familyMemberLastName: "idiahi",
                    familyMemberAge: 25,
                    relationship: "brother"
                },
                {
                    familyMemberFirstName: "blessing",
                    familyMemberLastName: "idiahi",
                    familyMemberAge: 35,
                    relationship: "sister"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        max-width: 80rem;
        width: 90%;
        margin: 5rem auto;

        &__details {
            max-width: 40rem;
            width: 95%;
            background-color: #F7FDFD;
            margin: auto;
            padding: .2rem 1rem;

            h2 {
                color: $color-grey-light;
                text-transform: capitalize;
                padding: 1rem 2rem;
            }

            &--content {
                background-color: #fff;
                width: 100%;
                border-radius: 10rem;
                padding: .5rem 1rem;
                box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, .15);
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                color: $color-grey-light;

                & > :last-child{
                    font-weight: bold;
                    margin-left: 2rem;
                }

                @media only screen and(max-width: 31.25em) {
                    flex-direction: column;
                    min-height: 5rem;
                    border-radius: 4px;

                    & > :last-child{
                        margin-left: 0;
                    }

                    & > * {
                        width: 100%;
                    }
                    
                }
            }
        }
    }

    .family-member {
        
        &__details--content {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding: .5rem 1rem;
            justify-content: space-between;
            color: $color-grey-light;

            & > :last-child{
                font-weight: bold;
                margin-left: 2rem;
            }

            @media only screen and(max-width: 31.25em) {
                flex-direction: column;
                min-height: 5rem;
                border-radius: 4px;

                & > :last-child{
                    margin-left: 0;
                }

                & > * {
                    width: 100%;
                }
                    
            }
        }
    }
</style>