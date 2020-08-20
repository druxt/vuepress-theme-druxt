import Vuex from 'vuex'
import { DruxtEntityComponents } from 'druxt-entity'
import { DruxtRouterStore } from 'druxt-router'
import { DruxtSchemaStore } from 'druxt-schema'
import md5 from 'md5'

const { DruxtEntity, DruxtField, DruxtFieldTextDefault } = DruxtEntityComponents

export default async ({ Vue, options, router, siteData }) => {
  // Setup Vuex.
  Vue.use(Vuex)
  const store = new Vuex.Store({})

  // Setup Druxt.js Entity.
  Vue.component(DruxtEntity.name, DruxtEntity)
  Vue.component(DruxtField.name, DruxtField)
  Vue.component(DruxtFieldTextDefault.name, DruxtFieldTextDefault)

  // Setup Druxt.js Router.
  DruxtRouterStore({ store })
  store.$druxtRouter = () => ({
    getResource: async query => require(`./data/resources/${query.type}/${query.id}.json`),
    getResources: async (resource, query) => require('./data/resources/' + resource + '/' + md5(query.getQueryString()) + '.json')
  })

  // Mock and set route to '/node/1'.
  store.commit('druxtRouter/addRoute', {
    path: '/node/1',
    route: require('./data/routes/' + md5('/node/1') + '.json')
  })
  store.commit('druxtRouter/setRoute', '/node/1')

  // Setup Druxt.js Schema.
  DruxtSchemaStore({ store })
  store.$druxtSchema = {
    import: async id => require(`./data/schemas/${id}.json`)
  }

  Vue.mixin({ store })
}
