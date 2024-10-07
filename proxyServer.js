var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

const API_KEY = "key"; // Replace this with your Riot API Key

/**
 * Fetches the player's PUUID (Player Universally Unique Identifier) based on their Riot ID and tag.
 * 
 * @param {string} riotid - The Riot ID of the player.
 * @param {string} tag - The player's tag.
 * @returns {string} - Returns the player's PUUID as a string.
 */
function getPlayerPUUID(riotid, tag) {
    return axios.get("https://americas.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/" + riotid + "/" + tag + "?api_key=" + API_KEY)
        .then(response => response.data.puuid)
        .catch(err => err);
}

/**
 * Route to get the player's PUUID based on their Riot ID and tag.
 * 
 * @route GET /getPUUID
 * @queryparam {string} username - The player's Riot ID and tag.
 * @returns {string} - Returns the player's PUUID.
 */
app.get('/getPUUID', async (req, res) => {
    const riotidandtag = req.query.username;
    const [name, t] = riotidandtag.split('#');
    const riotid = name;
    const tag = t;
    const PUUID = await getPlayerPUUID(riotid, tag);
    console.log(PUUID);

    res.json(PUUID);
});

/**
 * Route to get the Little Legend (Tactician) icon based on the tactician ID.
 * 
 * @route GET /getLL
 * @queryparam {string} tactician - The ID of the Little Legend.
 * @returns {string} - Returns the filename of the Little Legend image.
 */
app.get('/getLL', async (req, res) => {
    const id = req.query.tactician;
    const LLicons = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/tft-tactician.json");
    const tactDta = Object.values(LLicons.data.data);
    const tact = tactDta.find((tact) => tact.id === id);
    res.json(tact.image.full);
});

/**
 * Route to get the trait icon based on the trait ID.
 * 
 * @route GET /getTraitIcon
 * @queryparam {string} trait - The ID of the trait.
 * @returns {string} - Returns the filename of the trait image.
 */
app.get('/getTraitIcon', async (req, res) => {
    const trait = req.query.trait;
    const traitIcon = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/tft-trait.json");
    const traitDta = Object.values(traitIcon.data.data);
    const foundTrait = traitDta.find((foundTrait) => foundTrait.id === trait);
    res.json(foundTrait.image.full);
});

/**
 * Route to get the augment icon based on the augment ID.
 * 
 * @route GET /getAugmentIcon
 * @queryparam {string} augment - The ID of the augment.
 * @returns {string} - Returns the filename of the augment image.
 */
app.get('/getAugmentIcon', async (req, res) => {
    const augment = req.query.augment;
    const augIcon = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/tft-augments.json");
    const augDta = Object.values(augIcon.data.data);
    const foundAug = augDta.find((foundAug) => foundAug.id === augment);
    console.log(foundAug.image.full);
    res.json(foundAug.image.full);
});

/**
 * Route to get the past 20 games for a player based on their Riot ID and tag.
 * 
 * @route GET /past20Games
 * @queryparam {string} username - The player's Riot ID and tag in the format of 'riotid#tag'.
 * @returns {Array} - Returns an array of match data for the past 20 games.
 */
app.get('/past20Games', async (req, res) => {
    const riotidandtag = req.query.username;
    const [name, t] = riotidandtag.split('#');
    const riotid = name;
    const tag = t;
    const PUUID = await getPlayerPUUID(riotid, tag);

    const API_CALL = "https://americas.api.riotgames.com" + "/tft/match/v1/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY;

    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err);

    var matches = [];
    for (var i = 0; i < gameIDs.length - 15; i++) {  // Limits to last 15 matches
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/tft/match/v1/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err);
        matches.push(matchData);
    }
    res.json(matches);
});

/**
 * Starts the Express server and listens on port 4000.
 */
app.listen(4000, function () {
    console.log("Server started on port 4000");
});
