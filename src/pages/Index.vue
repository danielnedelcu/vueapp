<template>
  <div class="container-fluid">
      <q-page class="flex column container-custom">
        <q-list separator class="headline-list">
          <transition-group name="list">
            <news-card v-for="(member, key, index) in newsItems" 
              :key="key" 
              :dataindex="index"
              :news="member" 
              class="List card"
              flat>                                         
            </news-card>            
          </transition-group>
        </q-list>  

        <div class="container">
            <midpage-card></midpage-card>
        </div>

        <q-list separator id="IsotopeLayout" class="grid">
          <transition-group name="list">
            <feed-card v-for="(feed, key, index) in feedItems" 
              :key="key" 
              :dataindex="index"
              :feed="feed" 
              :class="feed.category"
              :data-value="feed.category"
              flat>                                         
            </feed-card>  
          </transition-group>      
        </q-list>   
      </q-page>
      <div>
        <section class="opinion__section">
          <div class="flex column container-custom">
            <div class="">
              <div class="opinion__section-wrapper">
                <q-list class="flex row justify-center">
                    <opinion-card v-for="(opinion, key, index) in opinionItems" 
                      :key="key" 
                      :dataindex="index"
                      :opinion="opinion"
                      class="card"
                      flat>                                         
                    </opinion-card>        
                </q-list>        
              </div>
            </div>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
  import { defineComponent, defineAsyncComponent } from 'vue';
  import { mapGetters, mapActions, mapState } from 'vuex';
  import Isotope from 'isotope-layout';
  import fitColumns from 'isotope-fit-columns';
  import imgLoad from 'imagesloaded';
  import Fingerprint2 from 'fingerprintjs2';
  import  {ASSIGN_NEWS_ITEMS, ASSIGN_FEED_ITEMS, ASSIGN_OPINION_ITEMS}  from "../store/actions.type";


  const NewsCard = defineAsyncComponent(() => import('../components/Newscard'))
  const FeedCard = defineAsyncComponent(() => import('../components/Feedcard'))
  const Opinion = defineAsyncComponent(() => import('../components/Opinion'))
  const Midpage = defineAsyncComponent(() => import('../components/Midpage'))

export default defineComponent({
    name: "PageIndex",
    meta : {
      title : 'Blurb News',
      meta: {
        description: { name: 'description', content: 'Home' },
        keywords: { name: 'keywords', content: 'Blurb, news' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      }
    },    

    components : {
      'news-card' : NewsCard,
      'feed-card' : FeedCard,
      'midpage-card' : Midpage,
      'opinion-card' : Opinion
    },    

    data () { 
      return {
          className : 'card'
      } 
    },

    computed: {  
      ...mapGetters({
          newsItems : 'topStories/newsItems',
          feedItems : 'feed/feedItems',
          opinionItems : 'opinion/opinionItems'
      })
    },     

    methods : {
      ...mapActions({
          ActionTopData : 'topStories/' + ASSIGN_NEWS_ITEMS,
          ActionFeedData : 'feed/' + ASSIGN_FEED_ITEMS,
          ActionOpinionData : 'opinion/' + ASSIGN_OPINION_ITEMS
      }), 

      createGrid () {
        var grid = document.getElementById('IsotopeLayout');

        setTimeout(function() {
          window.iso = new Isotope( grid, {
            filter: '*',
            transitionDuration: 0,
            itemSelector: '.card',
            percentPosition: true
          }); 
        }, 200)          
      }
    },    

    updated () { 
      this.createGrid(); 
    },    

    watch: {
      feedItems (){
        if (window.iso !== undefined) {
          this.createGrid(); 
        }
      }
    },

    mounted () {
      this.ActionTopData().then(() => {
        this.ActionFeedData({ type: 'likes', order: "desc" }).then(() => {
          this.ActionOpinionData().then(() => {
            this.createGrid();
          })
        })
      })
    }

  });
</script>

<style scoped lang="scss">
  .headline-list {
    display: grid;
    gap: 0;
    grid-template-columns: repeat(4,minmax(0,1fr));
  }

  .grid {
    min-height: 60vh;
  }

  .list {  
    display: grid;
    gap: 0;
    grid-template-columns: repeat(4,minmax(0,1fr));

    &-enter,
    &-leave-to { 
      opacity: 0; 
      transform: translateY(30px);
    }

    &-leave,
    &-enter-to { opacity: 1; }

    
    &-leave-active {
      opacity: 0;
      transition: all 0;
    }

    &-enter-active { 
      transition: all 1s;
      transition-delay: 100ms;
      transition: opacity 500ms ease-in-out;
    }
  }



  .container-fluid {
     width: 100%;
  }
  .opinion__section {
    background-color: #455a64;
    padding: 100px 0;
    margin: 100px 0 0;

    &-wrapper {
      padding: 10px;

      ul {
        color: #fff;
      }
    }
  }

  .container-custom {
    width: 1200px;
    // min-height: 30vh;
    margin: 0 auto;
  }

</style>
