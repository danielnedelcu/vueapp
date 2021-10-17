import { newsitemsRef} from '../../firebase';
import { query, getDocs } from "firebase/firestore";
import News from '../../models/News';
import { MUTATE_ASSIGN_NEWS, 
         MUTATE_CLEAR_NEWS, 
         MUTATE_SORT_NEWS,
         MUTATE_REMOVE_NEWS,
         MUTATE_ASSIGN_CURRENT_NEWS } from "../mutations.type";
    
/**
 * Vuex Action
 * Retrieves top headlines collection from Firebase.
 * Mutates state
 * 
 * @param {*} commit 
 */
export async function AssignNewsItems({commit}) {
    const q = query(newsitemsRef);
    
    try {
        /**
         * Calls Mutation
         * Clears existing array
         */          
        commit(MUTATE_CLEAR_NEWS);     

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
             * Wraps each document in an News class
             */            
            commit(MUTATE_ASSIGN_NEWS, new News(doc.data()));   
        });
    } catch (error) {
        console.log('error loading top storiessss')
    }
}

/**
 * Sorting items from dashboard column
 * 
 * @param {*} param0 
 * @param {*} payload 
 */
export async function SortNewsItems ({commit}, payload) {
    commit(MUTATE_SORT_NEWS, payload)
}

/**
 * Handles single edit request
 * 
 * @param {store context} commit 
 * @param {obj} payload 
 */
export async function AssignCurrentNewsItem({commit}, payload) {
    commit(MUTATE_ASSIGN_CURRENT_NEWS, payload);   
}

/**
 * Removes single item from state
 * 
 * @param {*} param0 
 * @param {*} payload 
 */
export async function RemoveNewsItem ({commit}, payload) {
    commit(MUTATE_REMOVE_NEWS, payload)
}