export default {

    /**
     * 
     * @param {items} array 
     */
    filterByName ()  {
        const list = [    
            {
                "label" : "The Epoch Times",    
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fepochtimes.jpg?alt=media&token=65cab83d-4a5a-48af-8808-81513db3a579"
            },
            {
                "label" : "American Spectator",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Famericanspectator.jpg?alt=media&token=34ecee4d-140e-4090-9b6c-fdb6cf864c60"
            },
            {
                "label" : "Daily Express UK",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fdailyexpress.jpg?alt=media&token=e07e19ee-7883-44d7-84ba-7ec97abdd6ab"
            },
            {
                "label" : "The Intercept",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fintercept.jpg?alt=media&token=6afe468e-745c-4991-972d-4fe96d9ff075"
            },
            {
                "label" : "Conservative Review",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fcr.jpg?alt=media&token=6faff1b4-9f80-41ad-9ea1-c60e8832a5f3"
            },
            {
                "label" : "Buzz Feed",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fbuzzfeed.jpg?alt=media&token=d7e1b141-6be9-4959-9f1f-136d5465c7c2"
            },
            {
                "label" : "Axios",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Faxios.jpg?alt=media&token=7aed8f02-89c2-40c4-a348-24c5a8a5f2d4"
            },
            {
                "label" : "Gateway Pundit",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fgatewaypundit.jpg?alt=media&token=e0b383e6-ac2b-4aa9-9c8f-b0d27b53557b"
            },
            {
                "label" : "Washington Times",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fwt.jpg?alt=media&token=d8e0c9da-7110-4df1-8232-8f53993956eb"
            },
            {
                "label" : "Washington Post",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fwp.jpg?alt=media&token=cbd7495e-fbbd-4c9b-852e-96455643d2f4"
            },
            {
                "label" : "LA Times",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Flatimes.jpg?alt=media&token=d697a3ae-2e7c-4279-a421-96ee5b96bda9"
            },
            {
                "label" : "New York Times",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fnyt.jpg?alt=media&token=210bbacd-2f6d-4697-ba0a-a8075339b159"
            },
            {
                "label" : "Guardian",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fguardian.jpg?alt=media&token=685ac57c-dabe-4d50-8d71-4abca35ae91d"
            },
            {
                "label" : "Huffington Post",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fhuffingtonpost.jpg?alt=media&token=83b326c7-92b4-4e4e-9238-818bdb64e20f"
            },
            {
                "label" : "Rolling Stones",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Frollingstone.jpg?alt=media&token=f0bca2f2-1b8e-4012-b4a6-2f850b5f1560"
            },
            {
                "label" : "Breitbart",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fbreitbart.jpg?alt=media&token=f37b119a-6e3d-4a81-a340-7871128605f7"
            },
            {
                "label" : "National Review",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fnr.jpg?alt=media&token=f2baedde-0b71-4d4f-8f6f-037999a08931"
            },
            {
                "label" : "The Economist",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Feconomist.jpg?alt=media&token=a9c6117d-77b8-4a91-ab66-d9692ee1cd7d"
            },
            {
                "label" : "Financial Times",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fft.jpg?alt=media&token=9681637a-6a17-4c12-8d8e-de2dcc8aaf51"
            },
            {
                "label" : "Business Insider",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fbi.jpg?alt=media&token=ec86581a-77a5-43c8-b38d-5e94b6aa38e3"
            },
            {
                "label" : "The Atlantic",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fatlantic.jpg?alt=media&token=c39415aa-2e36-4bef-8f24-53f1631ec8d8"
            },
            {
                "label" : "Jerusalem Post",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fjpost.jpg?alt=media&token=3de8bcb0-2a76-4ae7-a8e1-c84060ea7d8d"
            },
            {
                "label" : "CNBC",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fcnbc.jpg?alt=media&token=32efab7d-f232-46fd-8cc3-d166d27ed9d5"
            },
            {
                "label" : "New York Post",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fnyp.jpg?alt=media&token=c1a70f5d-da3a-47b1-90b1-45de8c18b341"
            },
            {
                "label" : "USA Today",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fusatoday.jpg?alt=media&token=448ce053-30e7-4f47-9226-f34377b50bfe"
            },
            {
                "label" : "Mirror UK",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fmirror.jpg?alt=media&token=870f16a0-6987-42ad-99b0-bb040c9a7454"
            },
            {
                "label" : "The Week",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Ftheweek.jpg?alt=media&token=4298d4fe-37c9-48b4-a2fa-456c929dd5e5"
            },
            {
                "label" : "The Hollywood Reporter",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fthr.jpg?alt=media&token=061c3a00-ed93-4530-b920-16e6749dbad2"
            },
            {
                "label" : "The Hill",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fthehill.jpg?alt=media&token=7cf2afe7-9a89-45e2-b58c-ff1a0b4bcd27"
            },
            {
                "label" : "MSN",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fmsn.jpg?alt=media&token=7bbcb15d-fd90-4d32-ab31-155ab05bda0f"
            },
            {
                "label" : "NBC News",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fnbcnews.jpg?alt=media&token=e256e87c-6ab4-4212-9ce9-93044f952d58"
            },
            {
                "label" : "Wall Street Journal",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fwsj.jpg?alt=media&token=f791c852-1f38-4ef5-9da0-51a5635803b2"
            },
            {
                "label" : "Daily Mail",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fdailymail.jpg?alt=media&token=f88c48c5-3c20-4bd8-b7d6-a74220511b79"
            },
            {
                "label" : "BBC News",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fbbc.jpg?alt=media&token=23218c24-5e3b-4dcc-995f-fa1ecb3c2400"
            },
            {
                "label" : "NPR",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fnpr.jpg?alt=media&token=a2753946-9cf0-400c-b83a-76fe3179efce"
            },
            {
                "label" : "Vox",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fvox.jpg?alt=media&token=63d2438a-e8a5-4843-9a54-a15bb37898a7"
            },
            {
                "label" : "Politico",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fpolitico-logo.jpg?alt=media&token=15c42ea9-4ba6-4d0e-9e67-1309384a48bc"
            },
            {
                "label" : "Fox News",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Ffoxnews.jpg?alt=media&token=5384b09f-b6ba-4f7b-b680-85d90e6345c3"
            },
            {
                "label" : "CNN",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fcnn.jpg?alt=media&token=03093f44-e6eb-4838-b39d-c7fe263d5b64"
            },
            {
                "label" : "Associated Press",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fassociatedpress.png?alt=media&token=533962a2-c6fd-4b6e-ba23-6af71596ea81"
            },
            {
                "label" : "ABC News",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fabcnews.jpg?alt=media&token=48a94882-b4c9-48c8-9eb1-aeee138e388c"
            },
            {
                "label" : "CBS News",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fcbsnews.jpg?alt=media&token=809d55b1-440c-41a5-a7f8-3aaa25c5e9b9"
            },
            {
                "label" : "Variery",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fvariety.jpg?alt=media&token=fe63ab97-3861-460d-b80b-3edd25b5ba06"
            },            
            {
                "label" : "Bloomberg",
                "image" : "https://firebasestorage.googleapis.com/v0/b/newsie-e96b7.appspot.com/o/newsagencyicons%2Fbloomberg.jpg?alt=media&token=5193249c-e106-4394-87dd-3838c45e35ed"
            },
        ]

        var byName = list.slice(0);

        return byName.sort((a,b) => {
            let x = a.label;
            let y = b.label;

            return x < y ? -1 : x > y ? 1 : 0;            
        })

    }       
}