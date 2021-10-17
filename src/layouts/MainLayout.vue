<template>
  <q-layout view="lHh Lpr lFf">
    <app-header></app-header>
    <app-drawer></app-drawer>
    <edit-drawer></edit-drawer>
    <q-page-container>
      <div class="column items-center">
        
          <router-view />
      
      </div>
    </q-page-container>
    <app-footer></app-footer>
  </q-layout>
</template>

<script>
import Drawer from '../components/shared/drawer';
import Header from '../components/shared/header';
import Footer from '../components/shared/footer';
import EditDrawer from '../components/shared/editdrawer';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    'app-header': Header,
    'app-drawer': Drawer,
    'edit-drawer': EditDrawer,
    'app-footer' : Footer
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {}
  }
})
</script>
