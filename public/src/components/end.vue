<template>
  <div class="end">
    <a href="https://github.com/assetto-corsa-web/accweb" target="_blank">accweb Version %VERSION% (%COMMIT%)</a>
    <div class="endBtnBox">
      <label class="language">
        <span>{{ $t('language') }}</span>
        <select v-model="$root.$i18n.locale">
          <option v-for="(item, index) in languageOptions" :key="index" :value="item">{{ item }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import { languages, getLocale } from '@/util/locale.js'

export default {
  data() {
    return {
      languageOptions: languages,
    }
  },
}
</script>

<style scoped lang="scss">
.endBtnBox {
  display: flex;
  justify-items: center;
  flex-wrap: wrap;
  margin-top: 8px;

  .language {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-right: 8px;
    }
  }
}
</style>

<i18n>
{
    "en": {
        "language": "language"
    },
    "zh": {
        "language": "当前语言"
    }
}
</i18n>
