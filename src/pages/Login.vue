<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green white-text center">
          <h3>Login</h3>

            <div class="q-gutter-y-md column">
                <q-input filled v-model="email" label="Enter username" stack-label >
                    <template v-slot:append>
                        <q-icon

                        />
                    </template>
                </q-input>
                <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Enter password" stack-label >
                    <template v-slot:append>
                        <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>

                <q-btn
                    type="submit"
                    :loading="submitting"
                    @click="login"
                    label="Login"
                    class="q-mt-md"
                    color="primary"
                    >
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn>

                <!-- <button v-on:click="login" class="btn btn-large btn-extended grey lighten-4 black-text">Login</button> -->
            </div>

        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { store } from '../store/admin';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
      submitting: false,
    };
  },

  meta : {
    title : 'Login Page',
    meta: {
      description: { name: 'description', content: 'Login Page' },
      keywords: { name: 'keywords', content: 'Blurb, news' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
    },    
    bodyAttr : {
        'data-value' : 'login'
    }
  },

  // preFetch ({ store, currentRoute, redirect, previousRoute }) {      
  //   store.dispatch('AssignRedirectRoute', currentRoute.path);
  // },

  computed: {                        
      ...mapGetters ( {redirectRoute : 'getRedirectRoute' })      
  },    

  methods: {
    /**
     * mapActions
     * namespace : admin(global)
     */
    // ...mapActions( {
    //     EditDrawerStateAction: ASSIGN_EDIT_DRAWER_STATE
    // }), 

    login(e) {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            // console.log(`You are logged in as ${user.user.email}`);
            this.$store.dispatch('AssignLoggedState', true);
            this.$store.dispatch('AssignCurrentUser', user.user.email);
            console.log(this.redirectRoute);
            this.$router.push({ path: this.redirectRoute });
          },
          (err) => {
            alert(err.message);
          },
        );

        // console.log(auth.Auth.Persistence.SESSION)

        // auth.setPersistence(auth.Auth.Persistence.SESSION)
        // .then( () => {
        //     console.log('******************')
        //     return auth.signInWithEmailAndPassword(email, password);
        // }).catch(e => {
        //     console.log('error')
        // });
      e.preventDefault();
    },
  },
};
</script>
