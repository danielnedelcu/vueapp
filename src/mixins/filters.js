/**
 * Filters Mixin
 */

import moment from 'moment'
import * as Constants from '../constants'

export default {
    methods : {      
      
        /**
         * Sorting mechanism
         * From Dashboard
         * 
         * @param {items} array 
         * @param {rule} string 
         */
        filterBy ( items, rule) {
            var byCategory = items.slice(0);

            return byCategory.sort((a,b) => {
                switch(rule) {
                    case Constants.DATE :
                        return moment(new Date(b.date)) - moment(new Date(a.date));
                      break; 
                    case Constants.CATEGORY :
                        let x = a.category;
                        let y = b.category;
    
                        return x < y ? -1 : x > y ? 1 : 0;
                      break;                       
                }
            })
        }       
    }
}