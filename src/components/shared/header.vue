<template>
    <q-header elevated>
      <q-toolbar class="q-mr-sm">
        <q-btn
          flat
          dense
          round
          @click="toggleDrawer"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="items-center flex">
          blurb.news
          <q-badge class="q-ml-sm text-primary" color="white" align="bottom">v0.0.1</q-badge>
          
        </q-toolbar-title>
        <!-- <img src="~/assets/logo.svg"/> -->
        <q-btn v-if="getLoggedInState"  class="float-left" size="sm" color="accent" icon="add_to_photos" />

        <!-- <q-input
            v-model="search"
            debounce="1000"
            color="orange"
            rounded

            standout
            dark

            dense
            class="float-left">


            <template v-slot:append>
              <q-icon name="search" />
            </template>
        </q-input> -->


      

        <q-btn 
          v-if="getLoggedInState" 
          label="Log out"  
          flat 
          v-on:click="onLogout"
          icon="power_settings_new" />

        <q-btn 
          v-else 
          to="/login" 
          label="Login"  
          flat 
          icon="supervised_user_circle" />
        

      </q-toolbar>
    </q-header>
</template>

<script>
import { defineComponent } from 'vue'
import { auth } from '../../firebase';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: "Header",

    data() {
        return {
          search : []
        };
    },

    created() {
      console.log(auth.currentUser)
      if (auth.currentUser) {
        this.$store.dispatch('AssignLoggedState', true);
        this.$store.dispatch('AssignCurrentUser', auth.currentUser.email);
      }
    },

    /**
     * COMPUTED PROPERTIES
     */
    computed: {
      ...mapGetters ([
        'getLoggedInState',
        'getCurrentUser'
      ])
    },      

    methods: {
        toggleDrawer() {
            this.$store.dispatch('AssignDrawerState', this.$store.getters.getDrawerState);
        },

        onLogout() {
          auth
            .signOut()
            .then(() => {
              this.$store.dispatch('AssignLoggedState', false);
              this.$store.dispatch('AssignCurrentUser', '');
              this.$router.push({ path: '/' });
            });
        }       
    }
})
</script>

<style scoped lang="scss">
  .q-toolbar__title {
    img {
      width: 35px;
      margin-right: 20px;
    }
  }
</style>