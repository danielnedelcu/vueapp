<template>
      <q-drawer
      v-model="toggleDrawer"
      
      bordered
      :persistent="persistent"
      overlay="overlayStatus"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item to="/" exact>
          <q-item-section avatar >
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>        

        <q-item to="/dashboard" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator  />

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://theintercept.com/2019/12/16/evo-morales-interview-glenn-greenwald/"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Glen Greenwald</q-item-label>
          </q-item-section>
        </q-item>


        <q-item
          clickable
          tag="a"
          target="_blank"
          href="http://podcasts.joerogan.net/"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Joe Rogan</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://www.washingtonpost.com/people/george-f-will/"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>George Will</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="http://drudgereport.com"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Byron York</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://www.nationalreview.com/author/victor-davis-hanson/"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Victor Davis Hanson</q-item-label>
          </q-item-section>
        </q-item>        

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://www.nationalreview.com/author/andrew-c-mccarthy/"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Andrew C. MaCarthy</q-item-label>
          </q-item-section>
        </q-item>     

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://samharris.org/podcast"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Sam Harris</q-item-label>
          </q-item-section>
        </q-item>              

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://www.wsj.com/news/author/peggy-noonan"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Peggy Noonan</q-item-label>
          </q-item-section>
        </q-item>    

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://www.zerohedge.com/"
        >
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            
            <q-item-label caption>Zero Hedge</q-item-label>
          </q-item-section>
        </q-item>                    

      </q-list>
    </q-drawer>
</template>

<script>
import { defineComponent } from 'vue'
/* eslint-disable */
export default defineComponent({
    name: "Drawer",

    data() {
        return {
            overlayStatus: true,
            persistent : false
        };
    },
    computed: {
      toggleDrawer() {
        return this.$store.getters.getDrawerState;
      },
    },    
})
</script>

<style scoped lang="scss">
  @import '../../css/quasar.variables.scss';

  .q-drawer-container {
    .q-item {
      .q-item__section {
        .q-icon {
          color : $accent;
        }
      }
    }
  }
</style>