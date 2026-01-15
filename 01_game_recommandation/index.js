var currentPage = '#page1'
var videoButton, theVideo
var videoPlaying = true

//P5 setup() bliver kaldt en gang før siden vises
function setup(){
    console.log('Ba- ba- ball')
    shiftPage(currentPage)

    //Videon
    //theVideo = select('#theVideo')

    //Video controll button
    //videoButton = select('#videoButton')
    //videoButton.mousePressed(()=>{
        //console.log('button pressed')
        //if(videoPlaying){
            //theVideo.pause()
            //videoPlaying = false  
        //}else{
            //theVideo.play()
            //videoPlaying = true
        //}
    //})

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

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
