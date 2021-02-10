
let environment='local';

let config={};

let config1={

    local:{
        bareServer:'http://192.168.1.2',
        server:function(){ return this.bareServer +'/api'},
        imgServer:function(){return this.bareServer+'/images'},
        client_id:4,
        client_secret:'3Iwaavwp9K3acqkzQyI5jlnurqPZGK1dx6eM2mZz',
        environment:environment
    },
    serverRoutes:{
        getAllgroups:'all/groups',
        getPublishers:'all/publishers',
        getPublications:'all/publications',
        getPublicationsFoReading:'all/publications/reading',
        invitationUrl:'invite',
        imgUploadUrl:'upload/image',
        createCoverpage:'create/coverpage',
        createHeadline:'create/headlines',
        createPublisher:'create/publisher',
        getAllTypes:'all/types',
        getAllLanguages:'all/languages',
        getAllPerspectives:'all/perspectives',
        createPublication:'create/publication',
        getAllHeadlines:'all/headlines',
        getAllLocations:'all/locations',
        getAllCoverPages:'all/coverPages',
        deleteCoverPage:'delete/coverPage',
        blockCoverPage:'block/coverPage',
        getToken:'oauth/token',
        getUserData:'user',
        registerUser:'register/user',
        registerReader:'register/reader',
        getAllgenders:'all/genders',
        deleteHeadline:'delete/headline',
        blockHeadline:'block/headline',
        editPublisher:'edit/publisher',
        deletePublisher:'delete/publisher',
        deletePublication:'delete/publication',
        createComment:'create/comment',
        getAllComments:'all/comments',
        sendViews:'send/views',
        changePassword:'change/password',
        filterPublication:'filter/publication',
        sortPublication:'sort/publication',
        forgotPassword:'forgot/password',
        newPassword:'new/password',
        forgotPasswordCode:'forgot/password/code',
        editProfile:'profile/edit',
        editPublication:'edit/publication',
        editCoverPage:'edit/coverpage',
        rateHeadline:'rate/headline',
    }

};

let config2={

    local:{
        bareServer:'http://54.175.177.236/gazettiServer/public/index.php',
        server:function(){return this.bareServer+'/api'},
        imgServer:function(){return 'https://s3-us-west-2.amazonaws.com/gazettibucket2'},
        client_id:2,
        client_secret:'xAavAvyDqkVn0bTsMfjGl51M9IhI7A7DBV2NtMBv',
    },
    serverRoutes:{
        getAllgroups:'all/groups',
        getPublishers:'all/publishers',
        getPublications:'all/publications',
        invitationUrl:'invite',
        imgUploadUrl:'upload/image',
        createCoverpage:'create/coverpage',
        createHeadline:'create/headlines',
        createPublisher:'create/publisher',
        getAllTypes:'all/types',
        getAllLanguages:'all/languages',
        getAllPerspectives:'all/perspectives',
        createPublication:'create/publication',
        getAllHeadlines:'all/headlines',
        getAllLocations:'all/locations',
        getAllCoverPages:'all/coverPages',
        deleteCoverPage:'delete/coverPage',
        blockCoverPage:'block/coverPage',
        getToken:'oauth/token',
        getUserData:'user',
        registerUser:'register/user',
        registerReader:'register/reader',
        getAllgenders:'all/genders',
        deleteHeadline:'delete/headline',
        blockHeadline:'block/headline',
        editPublisher:'edit/publisher',
        deletePublisher:'delete/publisher',
        deletePublication:'delete/publication',
        createComment:'create/comment',
        getAllComments:'all/comments',
        sendViews:'send/views',
        changePassword:'change/password',
        filterPublication:'filter/publication',
        sortPublication:'sort/publication',
        forgotPassword:'forgot/password',
        newPassword:'new/password',
        forgotPasswordCode:'forgot/password/code',
        editProfile:'profile/edit',
        editPublication:'edit/publication',
        editCoverPage:'edit/coverpage',
        rateHeadline:'rate/headline'


    }

};

if (environment==='local'){

    config=config1;

}else {
    config=config2
}

export default config;

