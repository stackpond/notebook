import Vue from 'vue'
import Vuex from 'vuex'
import { uuid } from 'vue-uuid'
import axios from "axios";
import data from "../../static/notebooks.json"

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
  _corsServerUrl: "http://localhost:9083/",
  _apiServerUrl: "http://localhost:9082/",
  _notebooks: [...data],
  _templates: {
   api: {
    type: "api",
    content: "https://jsonplaceholder.typicode.com/todos/1",
    headers: [],
    params: [],
    data: [],
    method: "GET"
   },
   sql: {
    type: "sql",
    environment: "DEV",
    database: "",
    content: "SELECT @@VERSION As Version"
   },
   md: {
    type: "md",
    content: "Test title"
   }
  },
  _httpVerbs: ["GET", "POST"],
  _sqlErrorMessage: "Query failed to execute. Check your query and contact administrator if the problem persists.",
  _apiErrorMessage: "API request failed. Check browser console for detailed information. Contact administrator if the problem persists."
 },
 getters: {
  corsServerUrl(state) {
   return state._corsServerUrl;
  },
  apiServerUrl(state) {
   return state._apiServerUrl;
  },
  apiErrorMessage(state) {
   return state._apiErrorMessage;
  },
  sqlErrorMessage(state) {
   return state._sqlErrorMessage;
  },
  notebook: (state) => (notebookId => {
   return state._notebooks.find(n => n.id === notebookId);
  }),
  httpVerbs(state) {
   return state._httpVerbs;
  },
  notebooks(state) {
   state._notebooks.forEach(notebook => {
    notebook.id = notebook.id || uuid.v4();

    notebook.paragraphs.forEach(paragraph => {
     paragraph.id = paragraph.id || uuid.v4()
    });
   });

   return state._notebooks;
  }
 },
 mutations: {
  composeNotebook(state, payload) {
   let newNotebook;
   let self = this;

   if (payload) {
    newNotebook = JSON.parse(JSON.stringify(payload));

    newNotebook.paragraphs.forEach(paragraph => {
     paragraph.id = uuid.v4();
    });
   }
   else {
    newNotebook = {
     title: "Notebook Title",
     description: "Short description about this notebook",
     paragraphs: []
    };
   }

   newNotebook.id = uuid.v4();
   state._notebooks.push(newNotebook);
  },
  removeNotebook(state, notebook) {
   state._notebooks.splice(state._notebooks.indexOf(notebook), 1);
  },
  addParagraph(state, payload) {
   var newParagraph = JSON.parse(JSON.stringify(state._templates[payload.type]));
   newParagraph.id = uuid.v4();
   payload.notebook.paragraphs.splice(payload.paragraphIndex, 0, newParagraph);
  },
  removeParagraph(state, payload) {
   payload.notebook.paragraphs.splice(payload.notebook.paragraphs.indexOf(payload.paragraph), 1);
  },
 }
})