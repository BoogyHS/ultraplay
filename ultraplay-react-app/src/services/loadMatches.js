const serverUrl = "http://localhost:8081"

const matchesService = {

    getMatches: function (url = `${serverUrl}/matches`) {
        return fetch(url)
            .then(res => res.json())
            .catch(err => console.log(err));
    }
};

export default matchesService;