<template>
  <div class="pl-2 text-muted border-secondary border-left-paragraph">
    <textarea-autosize class="form-control mb-2"
                       v-model="paragraph.content"
                       v-if="editing"
                       @blur.native="editing=!editing"
                       placeholder="Enter description here (you can use markdown syntax in here)">
    </textarea-autosize>
    <VueShowdown :markdown="paragraph.content"
                 @dblclick.native="editing=!editing"
                 class="text-justify pl-1"/>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "MarkdownParagraph",
  props: ["paragraph"],
  data() {
    return {
      editing: false
    };
  }
};
</script>
