<template>
    <section class="edit__section">
        <div class="fullscreen q-drawer__backdrop" v-bind:class="[ getEditDrawerState ? 'pointer-events active'   : 'no-pointer-events']" ></div>
            <div class="edit-panel q-drawer--right fixed q-drawer--on-top" v-bind:class="{'active' : getEditDrawerState}">
                <div class="q-drawer__content fit scroll">
                    <div class="q-scrollarea fit">
                        <div class="scroll relative-position fit hide-scrollbar">
                            <div class="absolute full-width">

                                <div class="edit-panel-headline flex items-center">
                                    <q-btn v-on:click="onClose(getEditDrawerState)" flat round color="white" class="" icon="cancel"></q-btn>                
                                    <h5 class="q-mt-none q-mb-none q-ml-md">Edit Blurb</h5>
                                </div>                               

                                <div class="edit-panel-content">
                                    <div class="tabs-container">
                                        <q-tabs
                                            v-model="tab"
                                            inline-label
                                            align="left"
                                            narrow-indicator
                                            class="text-text-gray"
                                        >
                                            <q-tab :ripple="false" name="info" label="Info" />
                                            <q-tab :ripple="false" v-on:click="onPhotosClick" name="photos" label="Photos" />
                                        </q-tabs>
                                    </div>

                                    <q-tab-panels
                                        v-model="tab"
                                        animated
                                        transition-prev="jump-left"
                                        transition-next="jump-left"
                                        >
                                        <q-tab-panel name="info">
                                            <q-form ref="myForm"
                                                @submit="onSave"
                                                @reset="onCancel">
                                                <q-select  tabindex="0" @input="filterFn"  outlined v-model="CurrentItem.agency" :options="this.agencyList" label="News Organization" />

                                                <q-input color="text-gray q-mt-md" outlined v-model="CurrentItem.author" label="Author" stack-label :dense="dense" 
                                                     lazy-rules :rules="[val => val !== null && val !== '' || CurrentItem.author]"/>                                                
                                                <q-input color="text-gray q-mt-md" outlined v-model="CurrentItem.headline" label="Headline" stack-label :dense="dense" 
                                                    lazy-rules :rules="[val => val !== null && val !== '' || CurrentItem.headline]"/>
                                                <q-input color="text-gray q-mt-md" outlined v-model="CurrentItem.link" label="Link URL"  :dense="dense" 
                                                    lazy-rules :rules="[val => val !== null && val !== '' || CurrentItem.link]">
                                                    <template v-slot:prepend>
                                                        <q-icon name="link" />
                                                    </template>
                                                </q-input>

                                                <div class="row q-col-gutter-md">
                                                    <div class="col">
                                                        <q-input outlined v-model="CurrentItem.date" :rules="['CurrentItem.date']" color="text-gray" >
                                                            <template v-slot:prepend>
                                                                <q-icon name="event" class="cursor-pointer">
                                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                                    <q-date mask="MM/DD/YYYY" v-model="CurrentItem.date" @input="() => $refs.qDateProxy.hide()" />
                                                                </q-popup-proxy>
                                                                </q-icon>
                                                            </template>
                                                        </q-input>  
                                                    </div>
                                                    <div class="col">
                                                        <q-select tabindex="0" @input="filterCategory"  outlined v-model="CurrentItem.category" :options="categories" label="Category" />
                                                    </div>
                                                </div>
                                                
                                                <q-item-section class="q-mt-sm">
                                                    <q-checkbox v-model="CurrentItem.breaking"  label="Breaking News" color="teal" />
                                                </q-item-section>

                                                <div class="confirm-panel">
                                                    <q-btn class="float-right" type="reset" no-caps color="gray" flat label="Cancel" />
                                                    <q-btn class="float-right" :loading="saveBtnLoading" type="submit" no-caps color="primary" label="Save" >
                                                        <template v-slot:saveBtnLoading>
                                                            <q-spinner-gears />
                                                        </template>
                                                    </q-btn>
                                                </div> 
                                            </q-form>                                               
                                        </q-tab-panel>

                                        <q-tab-panel name="photos">
                                            <div class="row">
                                                <file-pond
                                                    name="filepond"
                                                    ref="pond"
                                                    multiple="false"
                                                    class-name="my-pond"
                                                    drop-validation = "true"
                                                    label-idle='Drag and Drop your image here or <span class="filepond--label-action"><i class="material-icons">get_app</i> Browse </span>'
                                                    allow-multiple="true"
                                                    label-file-loading = "Loading"
                                                    label-file-processing = "Uploading"
                                                    label-file-processing-complete = "Upload complete"
                                                    label-button-process-item = 'Upload'
                                                    styleProgressIndicatorPosition = "right"
                                                    styleLoadIndicatorPosition = "right"
                                                    styleButtonRemoveItemPosition = "left"
                                                    styleButtonProcessItemPosition = "right"
                                                    accepted-file-types="image/jpeg, image/png"
                                                    instant = "false"

                                                    v-bind:files="myFiles"
                                                    v-on:processfilestart="handleProcessFileStart"
                                                    v-on:processfileprogress="handleProcessFileProgress"
                                                    v-on:onprocessfile="handleProcessFile"
                                                    v-on:init="handleFilePondInit"
                                                    v-on:addfile="handleAddFile"
                                                    v-on:addfilestart="handleFileStart"
                                                    v-on:addfileprogress="handleFileProgress"
                                                />

                                                <div class="image-upload">
                                                    <q-circular-progress
                                                        :value="uploadValuePercentage"
                                                        size="30px"
                                                        color="primary"
                                                        class="q-ma-md"
                                                    />                                                    
                                                </div>
                                            </div>
                                        </q-tab-panel>                                        
                                    </q-tab-panels>                                                                                                                                        
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import * as Constants from '../../constants'
import DeffMixin from "../../mixins/diff"
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import { mapGetters, mapState, mapActions } from 'vuex';
import { newsitemsRef, feedRef, opinionRef, appRoot, storageRef, timeStamp  } from '../../firebase';
import AgencyList from '../../data/Agency';
import { ASSIGN_EDIT_DRAWER_STATE }  from "../../store/actions.type";
import moment from 'moment'
import firebase from 'firebase/app'

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default defineComponent({
    name : "EditDrawer",
    mixins: [DeffMixin],

    components: {
        FilePond
    },    

    data() {
        return {
            accept: false,
            tab: 'info',
            dense: false,
            imagesCollection: [],
            tempCollection : {},
            saveBtnLoading : false,
            agencyList : Object.freeze(AgencyList.filterByName()),
            forceScrollbar: 'q-body--force-scrollbar',
            preventScroll: 'q-body--prevent-scroll',
            myFiles : [],
            uploadValuePercentage: 0,
            categories : [
               "Politics",
               "Technology",
               "Business",
               "Economy",
               "Culture",
               "World"
            ]              
        };
    },    

    computed : {
        ...mapGetters ( {
            CurrentItem : 'getCurrentItem',
            getEditDrawerState: 'getEditDrawerState' 
        })
    },

    watch : {
        CurrentItem (obj) {
            this.tempCollection = Object.assign({}, obj)    
        }
    },

    methods : {
        ...mapActions( {
            ActionEdit: ASSIGN_EDIT_DRAWER_STATE
        }), 

        handleProcessFileStart: function() {
            console.log('processfilestart');
        },   
         
        handleProcessFileProgress: function() {
            console.log('processfilestart');
        },    
        
        handleProcessFile: function() {
            console.log('processfilestart');
        },    

        handleAddFile: function(e) {
            console.dir(e);
        },        
        
        handleFileStart: function(e) {
            const uploadTask = storageRef.child(e.filename).put(e.file, {contentType: e.file.type});

            uploadTask.on('state_changed', (snapshot) => {              
                const percentage  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.uploadValuePercentage = percentage;
            })

            uploadTask
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    this.CurrentItem.image = url; 
                    this.uploadValuePercentage = 0;    
                })
                .catch(console.error);            
        },      
        
        handleFileProgress: function() {
            console.log('addfileprogress');
        },            

        handleFilePondInit: function() {
            console.log('FilePond has initialized');

            // example of instance method call on pond reference
            // console.dir(this.$refs.pond.getFiles());
        },        

        onClose (state) {
            this.onCancel();        
        },

        filterFn (value) {
            this.CurrentItem.agency = value.label;
            this.CurrentItem.agencyLogo = value.image;
        },

        filterCategory (value) {
            this.CurrentItem.category = value.toLowerCase();
        },

        onCancel () {
            /**
             * Compare state and local versions
             * Return the difference
             */
            let tempObj = (this.diff(Object.assign({}, this.CurrentItem), this.tempCollection))

            
            /**
             * Loop through temporary collection and replace any changed property
             * with the old property.
             */
            if(Object.entries(tempObj).length) {
                for (let key in this.tempCollection) {
                    if (this.tempCollection.hasOwnProperty(key)) {
                        /**
                         * Store out tempCollection data
                         * back into our CurrentItem oject
                         */
                        this.CurrentItem[key] = this.tempCollection[key];   
                    }
                }     
            } 

            /**
             * Deletes contents of the temporary collection
             */
            let i,
                keys = Object.keys(this.tempCollection);

                for(i = 0; i < keys.length; i++){
                    delete this.tempCollection[keys[i]];
                }

            /**
             * Reconcile both objects
             */
            this.tempCollection = Object.assign({}, this.CurrentItem);
            
            /**
             * Handles drawer state
             */
            this.ActionEdit(this.getEditDrawerState);
        },
        

        onSave() {
            this.saveBtnLoading = true; 
            
            // this.$refs.myForm.validate().then(success => {
            //     if (success) {                    
            //         this.tempCollection = Object.assign({}, this.CurrentItem);
            //         this.tempCollection.date = firebase.firestore.Timestamp.fromDate(new Date(this.CurrentItem.date));
                  
            //         switch(this.CurrentItem.constructor.name) {
            //             case Constants.NEWS :
            //                 newsitemsRef.doc(this.CurrentItem.id).set(Object.assign({}, this.tempCollection)).then( (e) => {                                
            //                     setTimeout( () => {
            //                         this.saveBtnLoading = false; 
            //                     }, 1000)
            //                 });
            //             break;  
            //             case Constants.FEED :
            //                 feedRef.doc(this.CurrentItem.id).set(Object.assign({}, this.tempCollection)).then( (e) => {                                
            //                     setTimeout( () => {
            //                         this.saveBtnLoading = false; 
            //                     }, 1000)
            //                 });
            //             break;  
            //             case Constants.OPINION :
            //                 opinionRef.doc(this.CurrentItem.id).set(Object.assign({}, this.tempCollection)).then( (e) => {                                
            //                     setTimeout( () => {
            //                         this.saveBtnLoading = false; 
            //                     }, 1000)
            //                 });
            //             break;                                 
            //         }    
                    
            //         /**
            //          * Change date back from Timestamp into readable format
            //          */
            //         this.tempCollection.date = moment.unix(this.tempCollection.date.seconds).format("MM/DD/YYYY");
            //     }  else {
            //         alert('bad form')
            //     }
            // })  //         
        },

        onPhotosClick() {}
    }
})
</script>

<style scoped lang="scss">
    @import '../../css/quasar.variables.scss';

    .edit__section {
        .q-drawer__backdrop {
            background-color: rgba(0, 0, 0, 0);
            @include Transition;

            &.active {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        .edit-panel {
            width: 630px;
            transform: translateX(645px);
            top: 0;
            bottom: 0;
            background: rgb(222, 231, 236);     
            box-shadow: -4px 0 27px 0 rgba(40,53,68,.26);
            @include Transition;

            &.active {
                transform: translateX(0px);
            }

            .tabs-container {
                border-bottom: 1px solid rgba(82, 86, 95, 0.27);
            }

             .q-tab-panels {
                background-color: $transparent;

                ul {
                    padding: 0;
                }

                .image-upload {
                    position: absolute;
                    top: 25px;
                }
         
            }     
            
            &-headline {
                padding: 20px 10px;
                color: #fff;
                background-color: #708690

            }

            &-content {
                color: #52565f;
                margin-top: 30px;
                padding: 10px;
            }        
        }

        .confirm-panel {
            padding: 20px 0;
            float: left;
        }
    }
</style>