<template>
  <div v-if="block">
    {{ settings.label }}
  </div>
</template>

<script>
import { DruxtBlocksBlockMixin } from 'druxt-blocks'

export default {
  name: 'DruxtBlockSystemMenuBlock',

  mixins: [DruxtBlocksBlockMixin]
}
</script>

<style scoped>
#logo {
  border: 1px solid grey;
  height: 50px;
  width: 50px;
}

#slogan {
  content: 'Drupal in the '
}
</style>