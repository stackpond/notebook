<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Notebook</router-link>
      <ul class="navbar-nav">
         <li class="nav-item">
           <a class="btn btn-secondary btn-sm text-white active mt-1 mr-1"
              @click="composeNotebook">
              Compose
           </a>
           <a class="btn btn-secondary btn-sm text-white mt-1"
              @click="exportData">
              Export
           </a>
         </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  methods: {
    exportData() {
      console.log(JSON.stringify(this.$store.getters.notebooks));
    },
    composeNotebook() {
      this.$store.commit("composeNotebook");
    }
  }
};
</script>