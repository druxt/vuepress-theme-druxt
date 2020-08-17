import Vuex from 'vuex'

/**
 * Import module.
 *
 * @param {string} module - The module to be imported.
 * @param {object} siteData - The Vuepress site configuration.
 */
const importModule = (module, siteData) => {
  if (siteData.base.indexOf(module) === 1) {
    return false
  }

  return import('druxt-router').then(m => m.DruxtRouterStore)
}

export default ({ Vue, options, router, siteData }) => {
  // Setup Vuex.
  Vue.use(Vuex)
  const store = new Vuex.Store({})

  // Setup Druxt.js Router.
  const DruxtRouterStore = importModule('druxt-router', siteData)
  if (DruxtRouterStore) {
    store.$druxtRouter = () => ({
      getResource: async (query = {}) => require(`./data/resources/${query.type}/${query.id}.json`)
    })
  }

  // Setup Druxt.js Schema.
  const DruxtSchemaStore = importModule('druxt-schema', siteData)
  if (DruxtSchemaStore) {
    DruxtSchemaStore({ store })
    store.$druxtSchema = {
      import: async id => require(`./data/schemas/${id}.json`)
    }
  }

  Vue.mixin({ store })
}
