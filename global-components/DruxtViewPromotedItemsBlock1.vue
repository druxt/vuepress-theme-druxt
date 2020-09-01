<template>
  <div>
    <h2>Results:</h2>
    <ul>
      <li
        v-for="result of results"
        :key="result.id"
        style="text-align: left"
      >
        <code>&lt;druxt-entity<br />
          &nbsp;&nbsp;uuid="{{ result.id }}"<br />
          &nbsp;&nbsp;type="{{ result.type }}"<br />
          &nbsp;&nbsp;mode="{{ view.attributes.display.default.display_options.row.options.view_mode }}"<br />
          /&gt;
        </code>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DruxtViewPromotedItemsBlock1',

  props: {
    results: {
      type: Array,
      required: true,
    },

    view: {
      type: Object,
      required: true
    }
  }
}
</script>
