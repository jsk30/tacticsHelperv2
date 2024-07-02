var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

const API_KEY = "key";

function getPlayerPUUID(riotid, tag){
    return axios.get("https://americas.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/"+ riotid + "/" + tag + "?api_key=" + API_KEY)
        .then (response => {
            //console.log(response.data);
            return response.data.puuid
        }).catch(err => err);
}

app.get('/getPUUID', async(req, res) =>{

    const riotidandtag = req.query.username;
    const [name, t] = riotidandtag.split('#');
    const riotid = name;
    const tag = t;
    const PUUID = await getPlayerPUUID(riotid, tag);
    console.log(PUUID);

    res.json(PUUID);
});

app.get('/getLL', async(req, res) =>{
    const id = req.query.tactician;
    const LLicons = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/tft-tactician.json");
    const tactDta = Object.values(LLicons.data.data);
    const tact = tactDta.find((tact) => tact.id === id);
    //console.log(tact.image.full);
    res.json(tact.image.full);
});

app.get('/getTraitIcon', async(req, res) =>{
    const trait = req.query.trait;
    const traitIcon = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/tft-trait.json");
    const traitDta = Object.values(traitIcon.data.data);
    const foundTrait = traitDta.find((foundTrait) => foundTrait.id === trait);
    //console.log(foundTrait.image.full);
    res.json(foundTrait.image.full);
});

app.get('/getAugmentIcon', async(req, res) =>{
    const augment = req.query.augment;
    const augIcon = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/tft-augments.json");
    const augDta = Object.values(augIcon.data.data);
    const foundAug = augDta.find((foundAug) => foundAug.id === augment);
    console.log(foundAug.image.full);
    res.json(foundAug.image.full);
});

app.get('/past20Games', async (req, res) => {
    const riotidandtag = req.query.username;
    const [name, t] = riotidandtag.split('#');
    const riotid = name;
    const tag = t;
    const PUUID = await getPlayerPUUID(riotid, tag);

    const API_CALL = "https://americas.api.riotgames.com" + "/tft/match/v1/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY

    const gameIDs = await axios.get(API_CALL)
        .then(response => {
            return response.data
        })
        .catch(err => err);
    //console.log(gameIDs);

    var matches = []
    for (var i = 0; i < gameIDs.length-15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/tft/match/v1/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matches.push(matchData);
    }
    //console.log(matches);
    //console.log(matches);
    res.json(matches);
});

app.listen(4000, function () {
    console.log("Server started on port 4000");
});