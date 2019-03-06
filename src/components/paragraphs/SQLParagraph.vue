<template>
  <div class="pl-2 text-muted border-secondary border-left-paragraph">
    <div class="input-group mb-1">
      <div class="input-group-prepend">
        <select class="input-group-text" 
                v-model="paragraph.environment" 
                v-if="environments.length > 0" >
          <option v-for="environment in environments"  :key="environment" :value="environment">{{environment}}</option>
        </select>
        <select class="input-group-text" 
                v-model="paragraph.database" 
                v-if="databases.length > 0" >
          <option v-for="database in databases"  :key="database" :value="database">{{database}}</option>
        </select>
        <span class="input-group-text btn btn-secondary btn-sm"
              v-if="paragraph.database && paragraph.environment"
              @click="execute">
          <i class="material-icons">play_arrow</i>
        </span>
        <span class="input-group-text btn btn-secondary btn-sm"
              @click="clearResults">
          <i class="material-icons">clear_all</i>
        </span>
      </div>
    </div>
    <textarea-autosize class="form-control"
                       rows="1"
                       v-model="paragraph.content"
                       placeholder="Enter SQL query here">
    </textarea-autosize>
    <div v-if="!error">
      <table class="table table-responsive table-condensed table-hover table-sm table-light mt-2 mb-1" 
             v-if="columns.length > 0">
        <thead class="thead">
          <tr>
            <th v-for="(col, colIndex) in columns" :key="colIndex">{{col}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{cell}}</td>
          </tr>
        </tbody>
      </table>      
    </div>
    <div v-else>
      <error-message :data="$store.getters.sqlErrorMessage"></error-message>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import axios from "axios";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "SQLParagraph",
  props: ["paragraph"],
  components: {
    "error-message": ErrorMessage
  },
  data() {
    return {
      rows: [],
      columns: [],
      databases: [],
      environments: [],
      error: false
    };
  },
  created() {
    var self = this;

    axios.get(self.$store.getters.apiServerUrl + "databases").then(response => {
      self.databases = response.data || [];
    });

    axios
      .get(self.$store.getters.apiServerUrl + "environments")
      .then(response => {
        self.environments = response.data || [];
      });
  },
  methods: {
    execute() {
      var self = this;
      this.clearResults();

      if (self.paragraph.database && self.paragraph.environment) {
        var url = `${self.$store.getters.apiServerUrl}databases/${
          self.paragraph.environment
        }/${self.paragraph.database}`;

        axios
          .post(url, {
            paragraph: self.paragraph
          })
          .then(response => {
            self.clearResults();

            if (response.data.recordsets.length > 0) {
              self.columns = Object.keys(response.data.recordsets[0][0]);

              response.data.recordset.forEach(recordset => {
                var row = [];

                for (var recordSetField in recordset) {
                  row.push(recordset[recordSetField]);
                }

                self.rows.push(row);
              });
            }
          })
          .catch(error => {
            self.error = true;
          });
      }
    },
    clearResults() {
      this.error = false;

      this.rows = [];
      this.columns = [];
    }
  }
};
</script>
