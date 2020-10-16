<template>
  <v-app>
    <Loader v-if="$route.path == '/' && showOnPageLoader" />
    <TheAppBar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template> 

<script>
import TheAppBar from "../components/UI/TheAppBar";
import Loader from "../components/Loader";
import {mapState} from "vuex";

export default {
  components: {
    TheAppBar,
    Loader
  },
  computed: {
    ...mapState(["showOnPageLoader"])
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/base.scss";
</style>