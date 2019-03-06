<template>
  <div>
    <div class="input-group mb-1">
      <span class="input-group-text btn btn-secondary btn-sm"
            @click="addParam">
        + {{context}}
      </span>
    </div>
    <hr class="mt-2 mb-2"
        v-if="params.length > 0">
    <div class="input-group mb-1"
         v-for="(param, paramIndex) in params" :key="paramIndex">
      <input type="text" 
             v-model="param.key"
             placeholder="Enter key"
             class="form-control">
      <input type="text"
             v-model="param.value"
             placeholder="Enter value"
             class="form-control">
      <div class="input-group-prepend">
        <span class="input-group-text btn btn-outline-danger btn-sm"
              @click="deleteParam(param)">
          <i class="material-icons">delete</i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "APIParameters",
  props: ["params", "context"],
  methods: {
    addParam() {
      this.params.push({ key: "", value: "" });
    },
    deleteParam(param) {
      this.params.splice(this.params.indexOf(param), 1);
    }
  }
};
</script>

