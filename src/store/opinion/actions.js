import { opinionRef } from '../../firebase';
import { query, getDocs, orderBy } from "firebase/firestore";
import Opinion from '../../models/Opinion';
import { MUTATE_ASSIGN_OPINION, 
         MUTATE_REMOVE_OPINION, 
         MUTATE_SORT_OPINION, 
         MUTATE_CLEAR_OPINIONS } from "../mutations.type";
    
/**
 * Vuex Action
 * Retrieves opinion collection from Firebase.
 * Mutates state
 * 
 * @param {*} commit 
 */
export async function AssignOpinionItems({commit}) {
    const q = query(opinionRef, orderBy('date'));

    try {
        /**
         * Calls Mutation
         * Clears existing array
         */
        commit(MUTATE_CLEAR_OPINIONS);     

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
             * Wraps each document in an Opinion class
             */
            commit(MUTATE_ASSIGN_OPINION, new Opinion(doc.data()));            
        })
    } catch (error) {
        console.log('error loading opinion stories')
    }  
}

/**
 * Sorting items from dashboard column
 * 
 * @param {*} param0 
 * @param {*} payload 
 */
export async function SortOpinionItems ({commit}, payload) {
    commit(MUTATE_SORT_OPINION, payload)
}

/**
 * Removes single item from state
 * 
 * @param {*} param0 
 * @param {*} payload 
 */
export async function RemoveOpinionItem ({commit}, payload) {
    commit(MUTATE_REMOVE_OPINION, payload)
}