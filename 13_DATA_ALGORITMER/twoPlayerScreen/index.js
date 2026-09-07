//array med alle rick and morty karaktererne
var characters = []
//mqtt "walkie talkie" kalder vi for client
var client

var topic = 'JegElskerFødder'

var playerAIndex = 0
var playerBIndex = 0

function setup() {
    getCharacters()
    //init mqtt
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', () => {
        showToast('Forbundet til MQTT')
        client.subscribe(topic)
    })
    client.on('message', (topic, ms) => {
        showToast(`Modtog besked: ${ms.toString()}`)    
        var msObj = JSON.parse(ms.toString())
        if(msObj.action == "choose character"){
            select(`#player${msObj.name}`).addClass('selected')
            
        }

        if(msObj.action == "select"){
            select(`#player${msObj.name}`).addClass('locked')
        }
        if(msObj.action == "forward"){
            if(select(`#player${msObj.name}`).hasClass('locked')){
                
            }else{
                var i = eval(`player${msObj.name}Index++`)
                //skift billede
                select(`#player${msObj.name} img`).attribute("src", characters[i].image)
                select(`#player${msObj.name} h2`).html(characters[i].name)
                
            }
        }
        if(msObj.action == "back"){
            if(select(`#player${msObj.name}`).hasClass('locked')){
                
            }else{
                var i = eval(`player${msObj.name}Index--`)
                console.log(i, msObj)
                console.log(characters.length, i)
                //skift billede
                select(`#player${msObj.name} img`).attribute("src", characters[i].image)
                select(`#player${msObj.name} h2`).html(characters[i].name)

            }
        }
    } )

}

async function getCharacters() {
    //Vi starter med at hente karakterne i Rick Morty API
    characters = await getJSON('https://rickandmortyapi.com/api/character?page=1')
    characters = characters.results
    /*select('#playerA img').attribute("src", characters[0].image)
    select('#playerA h2').html(characters[0].name)
    select('#playerB img').attribute("src", characters[0].image)
    select('#playerB h2').html(characters[0].name)*/    
    showCharacters(characters)
}

function showCharacters(characters) {
    characters.map(c => {
        var card = createCard(c.name, c.species, c.image)
        select('#characters').child(card)
    })
}