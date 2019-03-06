<template>
  <div class="alert alert-warning mt-2 mb-1">{{data}}</div>
</template>
<script>
export default {
  name: "ErrorMessage",
  props: ["data"]
};
</script>

