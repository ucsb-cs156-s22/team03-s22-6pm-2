const recommendationsFixtures = {
    oneRecommendations: {
        "id": 1,
        "dateNeeded": "2022-01-02T12:00:00",
        "dateRequested": "2022-01-01T12:00:00",
        "done": false,
        "explanation": "grad school",
        "professorEmail": "professor@school.edu",
        "requesterEmail": "requester@school.edu"
    },
    threeRecommendations: [
        {
            "id": 1,
            "dateNeeded": "2022-01-02T12:00:00",
            "dateRequested": "2022-01-01T12:00:00",
            "done": false,
            "explanation": "grad school",
            "professorEmail": "professor@school.edu",
            "requesterEmail": "requester@school.edu"
        },
        {
            "id": 2,
            "dateNeeded": "2022-01-03T12:00:00",
            "dateRequested": "2022-01-01T12:00:00",
            "done": false,
            "explanation": "grad school",
            "professorEmail": "professor2@school.edu",
            "requesterEmail": "requester2school.edu"
        },
        {
            "id": 3,
            "dateNeeded": "2022-01-04T12:00:00",
            "dateRequested": "2022-01-01T12:00:00",
            "done": false,
            "explanation": "grad school",
            "professorEmail": "professor3@school.edu",
            "requesterEmail": "requester3@school.edu"
        } 
    ]
};


export { recommendationsFixtures };