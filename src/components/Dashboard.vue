<template>
  <notebook-list></notebook-list>
</template>

<script>
import NotebookList from "@/components/NotebookList";

export default {
  name: "Dashboard",
  components: {
    notebookList: NotebookList
  }
};
</script>