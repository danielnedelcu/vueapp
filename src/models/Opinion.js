import moment from 'moment'

export default class Opinion {
    /**
     * @param {obj} rawData - JSON representation of each News item
     */
    constructor ( rawData = {} ) {     
        this.id = rawData.id        
        this.agencyLogo = rawData.agencyLogo
        this.agency = rawData.agency
        this.author = rawData.author
        this.headline = rawData.headline     
        this.link = rawData.link   
        this.breaking = rawData.breaking
        this.category = rawData.category 
        this.image = rawData.image
        this.date = moment.unix(rawData.date.seconds).format("MM/DD/YYYY")
    }
}