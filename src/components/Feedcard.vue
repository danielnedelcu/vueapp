<template>
   
        <q-card class="card">      
            <div class="card-wrapper" >
                <q-item-section>
                    <q-img 
                        :ratio="16/9"
                        img-class="news-image"
                        spinner-color="primary"
                        :src="feed.image"/>                          
                </q-item-section>

                <q-item class="col-auto likes-container absolute-top-right" >
                    <q-item-section>    
                        <q-btn class="daniel" :percentage="percentage" :loading="loadingLikes" flat color="white" @click="updateCount(feed)">                                              
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

                <div v-bind:class="['news-content', category]">
                    <q-btn v-if="LoggedState" v-on:click="onEdit(feed)" round color="primary" class="news-edit absolute-top-right" icon="edit"></q-btn>                
                    <q-item>
                        <q-item-section avatar >
                            <div class="q-avatar">
                                <q-avatar class="q-avatar__content row flex-center overflow-hidden">
                                <img :src="feed.agencyLogo">
                                </q-avatar>
                            </div>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ feed.agency }}</q-item-label>
                            <q-item-label v-if="feed.author" class="author-name" caption>{{feed.author}}</q-item-label>
                        </q-item-section>                  
                    </q-item>

                    <q-card-section>
                        <a :href="feed.link">
                            <div class="text-h6">{{feed.headline}}</div>
                        </a>
                    </q-card-section>
                
                </div>
            </div>
            
        </q-card>
    
</template>

<script>
import { defineComponent } from 'vue'
import Feed from '../models/Feed'
import  store from '../store/index'
import { mapGetters, mapActions } from 'vuex';
import  {ASSIGN_CURRENT_SELECTED_ITEM, ASSIGN_EDIT_DRAWER_STATE}  from "../store/actions.type";

export default defineComponent({
    name: 'Feedcard',
    store,
    props : {
        feed : { type : Feed, required : true }
    },

    data () {
        return {
            
            loadingLikes: false,
            likes : this.feed.likes,
            disableIcon : false,
            percentage : 0,
            interval : null,
            item: {},
            category: this.feed.category     
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
            FeedAction : ASSIGN_CURRENT_SELECTED_ITEM,
            EditDrawerStateAction: ASSIGN_EDIT_DRAWER_STATE
        }),         

        /**
         * Handles single news item edit
         */        
        onEdit (obj) {
            this.EditDrawerStateAction(0);
            this.FeedAction(obj)
        }       
    } 
})
</script>


<style scoped lang="scss">
    @import '../css/quasar.variables.scss';

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
        width: 25%;
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
                padding: 25px 20px;

                &:after {
                    content : '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;               
                }

                &.politics {
                    &:after {
                        border-bottom: solid 10px teal;
                        border-left: solid 10px teal;
                        border-right: solid 10px transparent;
                        border-top: solid 10px transparent;                    
                    }                    
                }

                &.technology {
                    &:after {
                        border-bottom: solid 10px orange;
                        border-left: solid 10px orange;
                        border-right: solid 10px transparent;
                        border-top: solid 10px transparent;                    
                    }                    
                }      
                
                &.business {
                    &:after {
                        border-bottom: solid 10px red;
                        border-left: solid 10px red;
                        border-right: solid 10px transparent;
                        border-top: solid 10px transparent;                    
                    }                    
                }   
                
                &.culture {
                    &:after {
                        border-bottom: solid 10px $culture;
                        border-left: solid 10px $culture;
                        border-right: solid 10px transparent;
                        border-top: solid 10px transparent;                    
                    }                    
                }   

                &.world {
                    &:after {
                        border-bottom: solid 10px $world;
                        border-left: solid 10px $world;
                        border-right: solid 10px transparent;
                        border-top: solid 10px transparent;                    
                    }                    
                }   

                &.economy {
                    &:after {
                        border-bottom: solid 10px green;
                        border-left: solid 10px green;
                        border-right: solid 10px transparent;
                        border-top: solid 10px transparent;                    
                    }                    
                }                   

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