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
  import { mapGetters, mapActions, mapState } from 'vuex';
  import Isotope from 'isotope-layout';
  import fitColumns from 'isotope-fit-columns';
  import imgLoad from 'imagesloaded';
  import Fingerprint2 from 'fingerprintjs2';
  import NewsCard from '../components/Newscard';
  import FeedCard from '../components/Feedcard';
  import Opinion from '../components/Opinion';
  import Midpage from '../components/Midpage';
  import  {ASSIGN_NEWS_ITEMS, ASSIGN_FEED_ITEMS, ASSIGN_OPINION_ITEMS}  from "../store/actions.type";
  import { defineComponent } from 'vue';

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
      /**
       * mapGetters
       * namespace : topStories, feed and opinion
       */      
      ...mapGetters({
          newsItems : 'topStories/newsItems',
          feedItems : 'feed/feedItems',
          opinionItems : 'opinion/opinionItems'
      })
    },     


    methods : {
      /**
       * mapActions
       * namespace : topStories, feed and opinion
       */
      ...mapActions( {
          TopStoriesAction : 'topStories/' + ASSIGN_NEWS_ITEMS,
          FeedItemsAction : 'feed/' + ASSIGN_FEED_ITEMS,
          OpinionItemsAction : 'opinion/' + ASSIGN_OPINION_ITEMS
      }), 

    
      /**
       * Masonry Isotope functionality
       */
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


    updated () { this.createGrid(); },    


    mounted () {
      /**
       * Initial, sequantial load the three data collections in Firebase
       */
      this.TopStoriesAction().then(() => {
        this.FeedItemsAction({ type: 'likes', order: "desc" }).then(() => {
          this.OpinionItemsAction()
        })
      })
      
      /**
       * Initializes the Masonry grid for FEED cards
       */
      this.createGrid();
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
