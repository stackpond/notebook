<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "@/components/navigation/NavigationBar";

export default {
  name: "App",
  components: {
    navigationBar: NavigationBar
  }
};
</script>
