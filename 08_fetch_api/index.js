var currentPage = '#page1'

//P5 setup() bliver kaldt en gang før siden vises
function setup(){
    console.log('Ba- ba- ball')
    shiftPage(currentPage)

    getDeck()

    select("#getCardBtn").mousePressed(()=>{
        getCard()
    })
    //Fetch er en asynkron fuction som kan hente data ude i byen

    //sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //løb listen iggennem en for en
    allPages.map(
        page => {
            //lav et nyt <a> element
            var menuItem = createElement('a')
            //Sæt s tagget til html titel
            menuItem.html(page.attribute('title'))
            //set eventlistener på a tagget
            menuItem.mousePressed(
                ()=>shiftPage('#' + page.attribute('id'))
            )
            //sæt a tagget ind i sideabar
            select('.sidebar').child(menuItem)
        }
    )
}

async function getDeck() {
    try{
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    console.log("Response objektet",response)
    if(response.ok){
        const data = await response.json()
        console.log("Data vi får tilbage", data)
        deck = data
    }
    }catch (error){
        console.log(error)
    }
}

async function getCard(){
    var cardDiv = select("#card")
    try{
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
        const data = await response.json()
        console.log(data)
        var cardImg = createImg()
    }catch(error){
        console.log("Error Catched", error)
    }
}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
