<template>
  <label class="text-reader">
    <i class="fas fa-file-upload" :title="$t('upload_config')"></i>
    <input type="file" @change="loadTextFromFile">
    <i>( {{filename}} )</i>
  </label>
</template>

<style>
  input[type="file"] {
    display: none;
  }

  .text-reader {
    width: auto;
    cursor: pointer;
  }
</style>

<script>
export default {
  props: ["filename"],
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
          this.$emit("load", e.target.result);
          ev.target.value = null;
      }
      reader.readAsText(file);
    }
  }
};
</script>

<i18n>
{
    "en": {
        "upload_config": "Upload config"
    },
    "zh": {
        "upload_config": "上传配置"
    }
}
</i18n>
