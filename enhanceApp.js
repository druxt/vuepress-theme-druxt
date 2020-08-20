import Vuex from 'vuex'
import { DruxtRouterStore } from 'druxt-router'
import { DruxtSchemaStore } from 'druxt-schema'
import md5 from 'md5'

export default async ({ Vue, options, router, siteData }) => {
  // Setup Vuex.
  Vue.use(Vuex)
  const store = new Vuex.Store({})

  // Setup Druxt.js Router.
  DruxtRouterStore({ store })
  store.$druxtRouter = () => ({
    getResource: async query => require(`./data/resources/${query.type}/${query.id}.json`),
    getResources: async (resource, query) => require('./data/resources/' + resource + '/' + md5(query) + '.json')
  })

  // Setup Druxt.js Schema.
  DruxtSchemaStore({ store })
  store.$druxtSchema = {
    import: async id => require(`./data/schemas/${id}.json`)
  }

  Vue.mixin({ store })
}
