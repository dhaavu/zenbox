import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  head: {
    title: 'timebox',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  
    ]
  },
  css: ['~/assets/css/main.css'], 
 
  modules: ['@nuxtjs/supabase', 'nuxt-icon', '@nuxtjs/google-fonts'], 

 
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/*'],
    }
  }, 
  googleFonts: {
    families: {
      Arizonia: true,
      Quicksand: [300],
      'Allerta+Stencil': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      Inter: '200..700',
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700',
      }
    }
  
  }
})
