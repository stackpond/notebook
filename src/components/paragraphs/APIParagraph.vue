<template>
  <div class="pl-2 text-muted border-secondary border-left-paragraph">
    <div class="input-group mb-1">
      <div class="input-group-prepend">
        <select class="input-group-text"
                v-model="paragraph.method">
          <option v-for="verb in $store.getters.httpVerbs" :key="verb" :value="verb">
            {{verb}}
          </option>
        </select>
        <span class="input-group-text btn btn-secondary btn-sm"
              v-if="paragraph.method"
              @click="execute">
          <i class="material-icons">play_arrow</i>
        </span>
        <span class="input-group-text btn btn-secondary btn-sm"
              @click="clearResults">
          <i class="material-icons">clear_all</i>
        </span>
      </div>
      <input type="text"
             v-model="paragraph.content"
             placeholder="Enter API URL here"
             class="form-control">
    </div>
    <div class="row">
      <div class="col-6 mt-1">
        <div class="card h-100">
          <div class="card-body">
            <api-parameters context="Header" :params="paragraph.headers"></api-parameters>
          </div>
        </div>
      </div>
      <div class="col-6 mt-1">
        <div class="card h-100">
          <div class="card-body">
            <api-parameters context="Request Param" :params="paragraph.params"></api-parameters>
          </div>
        </div>
      </div>
      <div class="col-12 mt-1" v-if="paragraph.method ==='POST'">
        <div class="card h-100">
          <div class="card-body">
            <button class="btn mb-2"
                    @click="saveBody">
              +Body
            </button>
            <textarea-autosize class="form-control"
                               rows="1"
                               :class="{'alert alert-warning mt-1': !validBody}"
                               v-model="body">
            </textarea-autosize>
          </div>
        </div>
      </div>
    </div>
    <div v-if="apiResponse.headers || apiResponse.data"
         :class="{'alert alert-warning mt-1': error}">
      <hr>
      <div class="row limit">
        <div class="col-6">
          <vue-json-pretty v-if="apiResponse.headers"
                           :data="apiResponse.headers">
          </vue-json-pretty>
        </div>
        <div class="col-6">
          <vue-json-pretty v-if="apiResponse.data"
                           :data="apiResponse.data">
          </vue-json-pretty>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
import VueResource from "vue-resource";
import VueJsonPretty from "vue-json-pretty";
import ApiParameters from "@/components/api/APIParameters";

export default {
  name: "APIParagraph",
  props: ["paragraph"],
  components: {
    VueJsonPretty,
    ApiParameters
  },
  data() {
    return {
      error: false,
      apiResponse: {},
      body: JSON.stringify(this.paragraph.data, undefined, 4)
    };
  },
  computed: {
    validBody() {
      try {
        JSON.parse(`${this.body}`);
        return true;
      } catch(ex) {
        return false;
      }
    }
  },
  methods: {
    saveBody() {
      this.paragraph.data = JSON.parse(`${this.body}`);
    },
    execute() {
      var self = this;
      self.clearResults();

      if (self.paragraph.method) {
        var headers = {};

        for (var headerIndex in self.paragraph.headers) {
          var header = self.paragraph.headers[headerIndex];

          if (header.key) {
            headers[header.key] = header.value;
          }
        }

        var params = {};

        for (var paramIndex in self.paragraph.params) {
          var param = self.paragraph.params[paramIndex];

          if (param.key) {
            params[param.key] = param.value;
          }
        }

        axios({
          method: self.paragraph.method,
          url: `${self.$store.getters.corsServerUrl}${self.paragraph.content}`,
          headers: headers,
          data: self.paragraph.data,
          params: params
        })
          .then(response => {
            self.error = false;
            self.apiResponse = response;
          })
          .catch(error => {
            self.error = true;
            self.apiResponse = error.response;
          });
      }
    },
    clearResults() {
      this.error = false;
      this.apiResponse = {};
    }
  }
};
</script>
