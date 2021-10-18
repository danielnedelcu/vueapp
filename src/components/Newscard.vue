<template>
    <q-card>      
        <div class="card-wrapper" >
            <q-item-section class="relative-position">
                <q-img 
                    :ratio="1"
                    img-class="news-image"
                    spinner-color="primary"
                    :src="news.image"/>          

                <q-item class="col-auto likes-container absolute-top-right" >
                    <q-item-section>    
                        <q-btn class="daniel" :percentage="percentage" :loading="loadingLikes" flat color="white" @click="updateCount(news)">                                              
                            <!-- <q-tooltip class="likes-tooltip" anchor="top middle" self="bottom middle" :offset="[10, 10]"> -->
                                <span class="label-likes text-left text-white">{{ likes }}</span>                                
                            <!-- </q-tooltip> -->
                            <q-icon name="favorite_border"/>

                            <template v-slot:loadingLikes>
                                <q-spinner-gears />
                            </template>

                        </q-btn>
                    </q-item-section>     
                            
                </q-item>

                <div v-if="news.breaking" class="breaking-news absolute-bottom-left">
                    <i class="material-icons">
                        rss_feed  
                    </i>
                </div>
            
            </q-item-section>
            <div class="news-content">
                <q-btn v-if="LoggedState" v-on:click="onEdit(news)" round color="primary" class="news-edit absolute-top-right" icon="edit"></q-btn>                
                <q-item>
                    <q-item-section avatar >
                    <div class="q-avatar">
                        <q-avatar class="q-avatar__content row flex-center overflow-hidden">
                        <img :src="news.agencyLogo">
                        
                        </q-avatar>
                    </div>
                    </q-item-section>

                    <q-item-section>
                    <q-item-label>{{ news.agency }}</q-item-label>
                    <q-item-label v-if="news.author" class="author-name" caption>{{news.author}}</q-item-label>
                    </q-item-section>                  
                </q-item>

                <q-card-section>
                    <a :href="news.link">
                        <div class="text-h6">{{news.headline}}</div>
                    </a>
                </q-card-section>
            
            </div>
        </div>
        
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import News from '../models/News'
import  store from '../store/index'
import Fingerprint2 from 'fingerprintjs2';
import { newsitemsRef } from '../firebase';
import { mapGetters, mapActions } from 'vuex';
import  {ASSIGN_CURRENT_SELECTED_ITEM, ASSIGN_EDIT_DRAWER_STATE}  from "../store/actions.type";

export default defineComponent({
    name: 'Newscard',
    store,
    props : {
        news : { type : News, required : true }
    },

    data () {
        return {
            loadingLikes: false,
            likes : this.news.likes,
            disableIcon : false,
            percentage : 0,
            interval : null,
            item: {}           
        }
    },

    computed: {                        
        ...mapGetters ( {LoggedState : 'getLoggedInState' })      
    },       

    methods : {
        /**
         * mapActions
         * namespace : topStories, admin(global)
         */
        ...mapActions( {
            ActionData : ASSIGN_CURRENT_SELECTED_ITEM,
            ActionEditItem: ASSIGN_EDIT_DRAWER_STATE
        }), 

        contains ( arr, obj ) {
            if(arr !== null) {               
                return arr.some((item) =>                        
                    item.value === obj )
            }
        },    

        updateCount(item) {  
            var count = item.likes;  
            let self = this; 
            
            /**
             * Get unique fingerprint
             */
            Fingerprint2.get( (components) => {
                let values = components.map(function (component) { return component.value })
                let murmurHash = Fingerprint2.x64hash128(values.join('') + item.id, 4)
                let storeArray = JSON.parse(localStorage.getItem("storageArray") || "[]");

                if(localStorage.getItem("storageArray") !== null) {              
                    if(!this.contains(storeArray , murmurHash)) {                          
                        this.addItemtoStorage(storeArray, item.id, murmurHash, count);
                    }
                } else {
                    /**
                     * First time around, no 'storageArray' found in localStorage
                     */
                    this.addItemtoStorage(storeArray, item.id, murmurHash, count);
                }
            });
        },

        /**
         * Manage localStorage for LIKEs
         */
        addItemtoStorage (arr, id, hash, count) {
            /**
             * Initial loading symbol
             */
            this.loadingLikes = true; 

            /**
             * Update firestore DB
             */
            newsitemsRef.doc(id).update({
                likes : ++count
            })
            .then( (e) => {
                this.likes = count;
                
                this.interval = setInterval(() => {
                    this.percentage += Math.floor(Math.random() * 8 + 10);
                    if (this.percentage >= 100) {
                        this.loadingLikes = false; 
                        this.disableIcon = true;
                        clearInterval( this.interval );
                    }                    
                }, 100);

                /**
                 * Update localStorage
                 */
                arr.push(Object.assign({}, {key : id, value : hash}));                    
                localStorage.setItem('storageArray', JSON.stringify(arr));
            });            
        },

        /**
         * Handles single item edit
         */
        onEdit (obj) {
            this.ActionEditItem(0);
            this.ActionData(obj)
        }        
    }
})
</script>


<style scoped lang="scss">
    @import '../css/quasar.variables.scss';

    @keyframes pulse-ring {
        0% {
            transform: scale(.33);
        }
        80%, 100% {
            opacity: 0;
        }
    }

    @keyframes pulse-dot {
        0% {
            transform: scale(.8);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(.8);
        }
    }

    a {
        text-decoration: none;
        color: $gray;
    }

    .text-h6 {
        font-size: 1.10rem;
        font-weight: 500;
        line-height: 1.4rem;
        letter-spacing: 0.0125em;
        font-family: 'Roboto';
        text-decoration: none;
        padding: 10px 0 0 0;
    }
    
    .card {
        width: 100%;
        border-radius : 0;
        float: left;    
        padding: 10px;
        background: transparent;
        -webkit-box-shadow: none;
        box-shadow: none;       
        

        &:hover {
            .news-image {
                .image-cover {
                opacity: 0;
                }
            }
        }         

        &-wrapper {
            -webkit-box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
            box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);            
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
            background: #fff;
            position: relative;
            height: 100%;


            .breaking-news {
                position: absolute;
                width: 30px;
                height: 30px;
                margin-left: 10px;
                margin-bottom: 10px;

                i {
                    top: 0;
                    left: 3px;
                    bottom: 0;
                    position: absolute;
                    z-index: 2;
                    color: white;
                    font-size: 15px;
                    margin-left: auto;
                    margin-right: auto;
                    right: 0;
                }
                
                &:before {
                    content: '';
                    position: relative;
                    display: block;
                    width: 300%;
                    height: 300%;
                    box-sizing: border-box;
                    margin-left: -100%;
                    margin-top: -100%;
                    border-radius: 45px;
                    background-color: $primary;
                    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                
                &:after {
                    content: '';
                    position: absolute;
                    left: 0; 
                    top: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.41);
                    border-radius: 15px;
                    box-shadow: 0 0 8px rgba(0,0,0,.3);
                    animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
                }
                               
            }

            .q-img {               

                .q-img__content {
                    background-color:rgba(0, 0, 0, 0.5)
                }
            }

            .q-item {
                .label-likes {
                    margin-right: 10px;
                }     
                
                .q-btn {
                    &.disabled {
                        opacity: 1 !important;
                        cursor: default !important;
                    }
                }
            }

            .news-agency {
                height: 40px;
                width: 40px;        
                align-items: center;
                border-radius: 50%;
                display: inline-flex;
                justify-content: center;
                position: relative;
                text-align: center;
                vertical-align: middle;     
                position: absolute;
                top: 96%;
                
                &-image {
                position: relative;
                overflow: hidden;
                flex: 1 0 auto;          
                border-radius: 50%;
                display: inline-flex;
                height: inherit;
                width: inherit;          
                }
            }

            .news-content {
                position: relative;
                padding: 25px 20px 0;

                .news-edit {
                    transform: translateY(-50%);
                    right: 10px;        
                }
            }
            
    

                .likes-container {
                    padding: 0 10px;
                }

                .image-cover {
                    width: 100%;
                    height: 100%;
                    background-color: #000;
                    opacity: 0.3;
                    top: 0;
                    left: 0;
                    @include Transition;        
                }
              
            
            img {
                display: block;
                width: 100%;
                max-width: 100%;
                border: 0;      
            }

            .q-item__section--avatar {
                overflow: hidden;    
                position: relative;

                &.q-item__section--side {
                    padding: 0;
                }
            } 
        }       
    }  

</style>