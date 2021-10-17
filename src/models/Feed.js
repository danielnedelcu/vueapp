import moment from 'moment'

export default class Feed {
    /**
     * @param {obj} rawData - JSON representation of each News item
     */
    constructor ( rawData = {} ) {     
        this.id = rawData.id        
        this.image = rawData.image
        this.likes = rawData.likes
        this.breaking = rawData.breaking
        this.agencyLogo = rawData.agencyLogo
        this.agency = rawData.agency
        this.author = rawData.author
        this.headline = rawData.headline     
        this.link = rawData.link   
        this.category = rawData.category   
        this.date = moment.unix(rawData.date.seconds).format("MM/DD/YYYY")
    }
}