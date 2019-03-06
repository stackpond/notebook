<template>
  <div class="container-fluid mt-0 mb-1 pr-1 pl-1">
   <div class="row mt-1">
     <div class="col">
       <input type="text" 
              class="form-control"
              v-model="searchTerm"
              placeholder="Find notebook">
     </div>
   </div>
    <div class="row mt-1">
      <div class="col-xs-12 col-sm-6 col-lg-3" v-for="notebook in filteredNotebooks()" :key="notebook.id">
        <div class="card h-100">
          <div class="card-header"
               @dblclick="editNotebookTitle(notebook)">
            <h5>{{notebook.title}}</h5>
          </div>
          <div class="card-body">
            <router-link :to="notebook.id" class="btn btn-dark btn-sm mr-1 mt-1">Read</router-link>
            <a href="#" class="btn btn-dark btn-sm mr-1 mt-1" @click="cloneNotebook(notebook)">Duplicate</a>
            <a href="#" class="btn btn-danger btn-sm float-right mt-1" @click="removeNotebook(notebook)">Remove</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotebookList",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    editNotebookTitle(notebook) {
      notebook.title = prompt("Change title", notebook.title) || notebook.title;
    },
    composeNotebook() {
      this.$store.commit("composeNotebook");
    },
    editNotebookDescription(notebook) {
      notebook.description =
        prompt("Change description", notebook.description) ||
        notebook.description;
    },
    cloneNotebook(notebook) {
      this.$store.commit("composeNotebook", notebook);
    },
    removeNotebook(notebook) {
      this.$store.commit("removeNotebook", notebook);
    },
    filteredNotebooks() {
      var self = this;
      var allNotebooks = self.$store.getters.notebooks;
      return allNotebooks.filter(notebook => {
        var searchTerm = self.searchTerm.toLowerCase();
        return (
          notebook.title.toLowerCase().indexOf(searchTerm) >= 0 ||
          notebook.description.toLowerCase().indexOf(searchTerm) >= 0
        );
      });
    }
  }
};
</script>