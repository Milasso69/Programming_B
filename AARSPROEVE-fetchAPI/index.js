var currentPage = '#page1'
var deck

var card1 = []
var card2 = []


//P5 setup() bliver kaldt EN gang før siden vises 
function setup() {
    console.log('P5 setup kaldt inshallah')

    //skift til current page 
    shiftPage(currentPage)

    getDeck()
    drawCard()



}

async function drawCard() {
    var cardOne = await getOneCard()
    card1.push(cardOne)
    console.log('Her er kort 1', card1)
    
    var cardTwo = await getOneCard()
    card2.push(cardTwo)
    console.log('Her er kort 2', card2)

}
//Async står for asyncronous - vi ved ikke præcis hvor længe det tager at køre funktionen  
async function getDeck() {
    try {
        //fetch kan hente data fra en server ude i byen 
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        //Repsonse objektet kommer tilbage fr serveren - og HVIS response.ok er true, kan vi hente data
        console.log("Response objektet:", response)
        if (response.ok) {
            const data = await response.json()
            console.log("Data vi får tilbage: ", data)
            deck = data

        }
    } catch (error) {
        console.log(error)
    }
}

function returnCardValue(card) {
    if (isNaN(card.value)) {
        if (card.value == "ACE") {
            return 11
        } else {
            return 10
        }
    } else {
        return card.value
    }
}

async function getOneCard() {
    //Hent et kort 
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
        const data = await response.json()
        console.log("DrawCard kommer tilbage med et nyt kort:", data)
        return data.cards[0]
    } catch (error) {
        console.log("Error catched", error)
    }

}

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

