<template>
  <div class="container-fluid mt-0 mb-1">
    <div class="row mt-1">
      <div class="col text-center">
        <h4>{{notebook.title}}</h4>
        <div class="input-group input-group">
          <button class="btn btn-dark btn-sm mr-1"
                  @click="addSQLParagraph(-1)">
            + SQL
          </button>
          <button class="btn btn-dark btn-sm mr-1"
                  @click="addAPIParagraph(-1)">
            + API
          </button>
          <button class="btn btn-dark btn-sm mr-1"
                  @click="addMarkdownParagraph(-1)">
            + Simple Note
          </button>
        </div>
       <input type="text" 
              class="form-control mt-2 mb-3"
              v-model="searchTerm"
              placeholder="Find paragraph">
      </div>
    </div> 
    <div class="row">
      <div class="col">
        <ul class="list-group">
          <li class="list-group-item p-0 border-0 text-justify">
            <component v-for="(paragraph, paragraphIndex) in filteredParagraphs()" 
                       :key="paragraphIndex" 
                       :paragraph="paragraph"
                       :ref="paragraph.id"
                       :is="component(paragraph)">
              <hr class="mb-1 mt-2">
              <div class="input-group mb-1">
                <button class="btn btn-outline-secondary btn-sm mr-1 mt-1"
                        @click="addSQLParagraph(paragraphIndex)">
                  + SQL
                </button>
                <button class="btn btn-outline-secondary btn-sm mr-1 mt-1"
                        @click="addAPIParagraph(paragraphIndex)">
                  + API
                </button>
                <button class="btn btn-outline-secondary btn-sm mr-1 mt-1"
                        @click="addMarkdownParagraph(paragraphIndex)">
                  + Simple Note
                </button>
                <button class="btn btn-outline-danger btn-sm mt-1"
                        @click="removeParagraph(paragraph)">
                  Delete
                </button>
              </div>
              <hr class="mt-2 mb-2">
            </component>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import APIParagraph from "@/components/paragraphs/APIParagraph";
import SQLParagraph from "@/components/paragraphs/SQLParagraph";
import MarkdownParagraph from "@/components/paragraphs/MarkdownParagraph";

export default {
  name: "NotebookEditor",
  data() {
    return {
      searchTerm: "",
      notebook: null,
      plugins: {
        sql: "sql-paragraph",
        api: "api-paragraph",
        md: "markdown-paragraph"
      }
    };
  },
  components: {
    "api-paragraph": APIParagraph,
    "sql-paragraph": SQLParagraph,
    "markdown-paragraph": MarkdownParagraph
  },
  created() {
    this.notebook = this.$store.getters.notebook(this.$route.params.notebookId);
  },
  methods: {
    component(paragraph) {
      return this.plugins[paragraph.type];
    },
    removeParagraph(paragraph) {
      this.$store.commit("removeParagraph", {
        notebook: this.notebook,
        paragraph: paragraph
      });
    },
    addParagraph(paragraphIndex, type) {
      this.$store.commit("addParagraph", {
        type: type,
        notebook: this.notebook,
        paragraphIndex: paragraphIndex + 1
      });
    },
    addAPIParagraph(paragraphIndex) {
      this.addParagraph(paragraphIndex, "api");
    },
    addSQLParagraph(paragraphIndex) {
      this.addParagraph(paragraphIndex, "sql");
    },
    addMarkdownParagraph(paragraphIndex) {
      this.addParagraph(paragraphIndex, "md");
    },
    filteredParagraphs() {
      var self = this;
      var allParagraphs = self.notebook.paragraphs;
      return allParagraphs.filter(paragraph => {
        var searchTerm = self.searchTerm.toLowerCase();
        return paragraph.content.toLowerCase().indexOf(searchTerm) >= 0;
      });
    }
  }
};
</script>

