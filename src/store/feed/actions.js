import { feedRef } from '../../firebase';
import { query, getDocs, orderBy } from "firebase/firestore";
import Feed from '../../models/Feed';
import { MUTATE_ASSIGN_FEED, 
         MUTATE_SORT_FEED, 
         MUTATE_CLEAR_FEED, 
         MUTATE_REMOVE_FEED,
         MUTATE_ASSIGN_CURRENT_FEED } from "../mutations.type";   
    
/**
 * Vuex Action
 * Retrieves news feed collection from Firebase.
 * Mutates state
 * 
 * @param {*} commit 
 */
export async function AssignFeedItems({commit}, payload) {
    const q = query(feedRef, orderBy(payload.type, payload.order));

    try {
        /**
         * Calls Mutation
         * Clears existing array
         */        
        commit(MUTATE_CLEAR_FEED);     

        /**
         * Async/await call to Firebase
         * Retrieves collection
         */
        const docSnap = await getDocs(q);

        /**
         * Loops through every document in the collection
         */
        docSnap.forEach(doc => {
            /**
             * Calls Mutation
             * Wraps each document in an Feed class
             */            
            commit(MUTATE_ASSIGN_FEED, new Feed(doc.data()));            
        })
    } catch (error) {
        console.log('error loading feed stories')
    }  
}

/**
 * Sorting items from dashboard column
 * 
 * @param {*} param0 
 * @param {*} payload 
 */
export async function SortFeedItems ({commit}, payload) {
    commit(MUTATE_SORT_FEED, payload)
}

/**
 * Handles single edit request
 * 
 * @param {store context} commit 
 * @param {obj} payload 
 */
export function AssignCurrentFeedItem({commit}, payload) {
    commit(MUTATE_ASSIGN_CURRENT_FEED, payload);   
}

/**
 * Removes single item from state
 * 
 * @param {*} param0 
 * @param {*} payload 
 */
export async function RemoveFeedItem ({commit}, payload) {
    commit(MUTATE_REMOVE_FEED, payload)
}