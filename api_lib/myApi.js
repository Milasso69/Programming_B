// Dine genbrugelige API-funktioner kommer her.


//toastDiv: Demands an HTML element with id="toast", or send a custom ID name  
//txt : the text the toast will display
//timeout: how long the toast will show in ms, defaults to 2000
//type: choose between notify and warning 
function showToast(txt, timeout=2000, type="notify"){
    var toast  
    try {
        toast = select('#toast')
    }catch(err){
        console.log('Couldnt select element with id: ' , toastDiv, err)
        return
    }

    toast.html(txt)
    toast.addClass(type)
    toast.addClass('toastShow')
    setTimeout(()=>{
        toast.removeClass(type)
        toast.removeClass('toastShow')
    }, timeout)
}


//Kaldes med newPageId - og toggler klassen show på den side som har det nye id 
var currentPage
function shiftPage(newPageId){
    if(select('#currentPage')) select("#currentPage").removeClass('show')
    select(newPageId).addClass('show')
    currentPage = newPageId
}

//Tager alle div'er med klassen .page 
//Der SKAL være div'er med klassen .page 
//De SKAL have et selvstændigt id 
//For hver af dem opretter den et link med mousePressed til den pågældende side  
//Og så sætter den de links ind i menuDivId
function createMenu(menuDivId){
    var allPages = selectAll('.page')
    allPages.map( p => {
        var a = createElement('a')
        if(p.attribute('title')){
            a.html( p.attribute('title') )
        }else{
            a.html( p.attribute('id') )
        }
        a.mousePressed( ()=>{ shiftPage(p.attribute('id'))} )

    } )
}

//Funktion der henter og returnerer JSON fra et API
async function getJSON( endpoint ){
    //Vi starter med at kontakte serveren med et request
    var res 
    try{
        res = await fetch( endpoint )
    }catch(err){
        console.log(err)
    }
    //Hvis response er ok, henter vi json data 
    var json = await res.json()
    console.log('Hentede poster fra fetchJSON', json)
    return json 
}


function createCard(title = "", text = "", image = ""){
    var card = createDiv().addClass('card')
    card.child(createImg(image))
    card.child(createElement('h2', title))
    card.child(createElement('p', text))
    return card
}