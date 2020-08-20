<template>
  <div v-if="block">
    <img :src="logo" alt="Logo" class="logo" />
    <h4>Nuxt.js in the front, Drupal in the back.</h4>
  </div>
</template>

<script>
import { DruxtBlocksBlockMixin } from 'druxt-blocks'

export default {
  name: 'DruxtBlockSystemBrandingBlock',

  mixins: [DruxtBlocksBlockMixin],

  computed: {
    logo() {
      return this.$site.base + this.$themeConfig.logo
    }
  }
}
</script>

<style scoped>
.logo {
  height: 50px;
}
</style>