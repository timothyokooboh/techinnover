<template>
  <v-app>
    <TheAppBar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template> 

<script>
import TheAppBar from "../components/UI/TheAppBar";
export default {
  TheAppBar
}
</script>

<style lang="scss" scoped>
  @import "~assets/base.scss";
</style>