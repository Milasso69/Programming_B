//array med alle rick and morty karaktererne
var chars = []

function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
    getChars()
    
}

async function getChars(){
    //Vi starter med at hente karakterne i Rick Morty API
    var res 
    try{
        res = await fetch('https://rickandmortyapi.com/api/character?page=1')
    }catch(err){
        console.log(err)
    }
    //Hvis response er ok, henter vi json data 
    var json = await res.json()
    chars = json.results
    console.log(chars) 
}
