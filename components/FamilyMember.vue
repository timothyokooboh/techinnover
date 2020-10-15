<template>
    <div>
        <v-card class="pa-5 my-5" elevation="20">
            <v-tooltip top>
                <template v-slot:activator="{on}">
                    <v-btn v-on="on" text class="pb-5 float-right" @click="decrementCount">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
                <span>Close form</span>
            </v-tooltip>
            <v-text-field
                label="First Name"
                dense
                class="mt-5"
            >
            </v-text-field>
            <v-text-field
                label="Last Name"
                dense
            >
            </v-text-field>
            <v-text-field
                label="Age"
                dense
                type=number
            >
            </v-text-field>
            <v-text-field
                label="Relationship"
                dense
                placeholder="e.g brother"
            >
            </v-text-field>
        </v-card>
    </div>
</template>

<script>
export default {
    methods: {
        decrementCount() {
            //this.$emit("decrementCount")
        }
    }
}
</script>