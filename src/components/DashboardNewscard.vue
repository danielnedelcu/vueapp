<template>
    <div>
        <q-icon name="drag_indicator" class="drag-icon" />
        <q-badge outline  v-bind:class="['q-mt-sm q-mb-sm category-label', news.category]"  align="bottom">{{ news.category }}</q-badge>
        <q-btn :ripple="false" round flat v-on:click="" icon="more_vert">

        <q-menu 
            fit
            anchor="bottom left"
            self="top right"
            transition-show="jump-down"
            transition-hide="jump-up"
            >
            <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                    <q-item-section v-on:click="onEdit(news)">Edit</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                    <q-item-section v-on:click="onRemove(news)">Remove</q-item-section>
                </q-item>

            </q-list>
        </q-menu>

        </q-btn>

        <h6 class="blurb-headline">{{ news.headline }}</h6>
        <div class="blurb-agency">{{ news.agency }}</div>

        <q-item class="q-pl-none">
        <q-item-section>
            <q-icon color="gray" name="date_range" />
        </q-item-section>

        <q-item-section>
            {{ news.date }}
        </q-item-section>
        </q-item>

        <q-item class="q-pr-none">
            <q-item-section avatar>
            <q-avatar class="q-pr-none">
                
                <q-img 
                    spinner-size="25px"
                    spinner-color="primary"
                    :ratio="1"                  
                    :src="news.image"/>                 
            </q-avatar>
            </q-item-section>
        </q-item>     

        <transition name="fade">
            <div v-if="removeOverlay" class="confirm-overlay absolute">
                <div class="absolute-center q-pa-xs q-pt-lg q-gutter-sm">
                    <q-btn outline v-on:click="onCancel()" unelevated no-caps color="primary" text-color="text-accent" label="Cancel"  />
                    <q-btn v-on:click="onDeleteItem(news)" :loading="saveBtnLoading" unelevated no-caps color="primary" label="Remove" >
                        <template v-slot:saveBtnLoading>
                            <q-spinner-gears />
                        </template>
                    </q-btn>
                </div>
            </div>
        </transition>
            
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import * as Constants from '../constants'
import  store from '../store/index'
import { mapActions } from 'vuex';
import { newsRef, feedRef, opinionRef, appRoot, storageRef  } from '../firebase';
import  { REMOVE_OPINION_ITEM, 
          REMOVE_NEWS_ITEM, 
          REMOVE_FEED_ITEM, 
          ASSIGN_CURRENT_SELECTED_ITEM, 
          ASSIGN_EDIT_DRAWER_STATE}  from "../store/actions.type";

export default defineComponent({
    name: 'DashboardNewscard',
    store,
    props : {
        news : { type : Object, required : true }
    },

    data () {
        return {
            removeOverlay : false,
            saveBtnLoading : false,
        }
    },

    methods : {
        ...mapActions( {
            SelectedItemAction : ASSIGN_CURRENT_SELECTED_ITEM,
            EditDrawerStateAction: ASSIGN_EDIT_DRAWER_STATE,
            NewsItemAction : 'topStories/' + REMOVE_NEWS_ITEM,
            FeedItemAction : 'feed/' + REMOVE_FEED_ITEM,            
            OpinionItemAction : 'opinion/' + REMOVE_OPINION_ITEM
        }),         

        onEdit (obj) {
            this.EditDrawerStateAction(0);
            this.SelectedItemAction(obj)
        },
        
        onRemove (obj) {
            this.removeOverlay = true;
           
        },

        onDeleteItem(obj) {
            this.saveBtnLoading = true;    
    
            switch(obj.constructor.name) {
                case Constants.NEWS :
                    newsRef.doc(obj.id).delete().then( (e) => {    

                        this.removeSequence(this.dispatchNewsRemoval, obj)
                            .then(i => console.log(`Done`))
                            .catch(err => console.log(`Error`));   

                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                break;       
                
                case Constants.FEED :
                    feedRef.doc(obj.id).delete().then( (e) => {         

                        this.removeSequence(this.dispatchFeedRemoval, obj)
                            .then(i => console.log(`Done`))
                            .catch(err => console.log(`Error`));  

                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                break;  
                
                case Constants.OPINION :
                    opinionRef.doc(obj.id).delete().then( (e) => {   

                        this.removeSequence(this.dispatchOpinionRemoval, obj)
                            .then(i => console.log(`Done`))
                            .catch(err => console.log(`Error`));     

                  }).catch(function(error) {
                       console.error("Error removing document: ", error);
                   });
                break;     
            }             
        },

        endSequence () {
            return new Promise((resolve, reject) => {
                setTimeout( () => {
                    this.saveBtnLoading = false; 
                    this.removeOverlay = false;
                    resolve();
                }, 1000)   
            })
        },

        removeSequence (callback, obj) {
            let self = this;

            return this.endSequence()
                .then(
                    setTimeout( () => {
                        callback(obj);
                    }, 2000)                      
                 )
                .catch(err => { throw err; });
        },

        dispatchNewsRemoval (obj) {
            this.NewsItemAction(obj)
        },
          
        dispatchFeedRemoval (obj) {
            this.FeedItemAction(obj)
        },        


        dispatchOpinionRemoval (obj) {
            this.OpinionItemAction(obj)
        },

        onCancel () {
            this.removeOverlay = false;
        }
    }
})
</script>

<style scoped lang="scss">
    @import '../css/quasar.variables.scss';
    @import '../css/mixins/_dashboard.card.scss';

    @include DashboardCard;

    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }    

</style>