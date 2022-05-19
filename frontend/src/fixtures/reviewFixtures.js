const reviewFixtures = {
    oneReview: {
        "id":1,
        "itemId": 10,
        "reviewerEmail":"cgaucho@ucsb.edu",
        "stars": 3,
        "dateReviewed":"2022-01-02T12:00:00",
        "comments":"Meh"
    },
    threeReviews: [
        {
            "id": 1,
            "itemId": 10,
            "reviewerEmail":"cgaucho@ucsb.edu",
            "stars": 3,
            "dateReviewed":"2022-01-02T12:00:00",
            "comments":"Meh"
        },
        {
            "id": 2,
            "itemId": 3,
            "reviewerEmail":"sgaucho@ucsb.edu",
            "stars": 4,
            "dateReviewed":"2021-01-02T12:00:00",
            "comments":"ok"
        },
        {
            "id": 3,
            "itemId": 12,
            "reviewerEmail":"mgaucho@ucsb.edu",
            "stars": 5,
            "dateReviewed":"2022-03-02T12:00:00",
            "comments":"Awesome"
        } 
    ]
};


export { reviewFixtures };