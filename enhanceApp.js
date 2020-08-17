import Vuex from 'vuex'
import { DruxtRouterStore } from 'druxt-router'
import { DruxtSchemaStore } from 'druxt-schema'

export default ({ Vue, options, router, siteData }) => {
  // Setup Vuex.
  Vue.use(Vuex)
  const store = new Vuex.Store({})

  // Setup Druxt.js Router.
  DruxtRouterStore({ store })
  store.$druxtRouter = () => ({
    getResource: async (query = {}) => require(`./data/resources/${query.type}/${query.id}.json`)
  })

  // Setup Druxt.js Router.
  DruxtSchemaStore({ store })
  store.$druxtSchema = {
    import: async id => require(`./data/schemas/${id}.json`)
  }

  Vue.mixin({ store })
}
