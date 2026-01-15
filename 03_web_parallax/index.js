var currentPage = '#page3'

var mouseX = 0
var mouseY = 0

//P5 setup() bliver kaldt en gang før siden vises
function setup(){
    console.log('Ba- ba- ball')
    shiftPage(currentPage)

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

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    //console.log(mouseX, mouseY)

    screenWidth = window.innerWidth
    screenHeight = window.innerHeight

    document.querySelectorAll('.parallaxMouse').forEach((elem) => {
        elem.style.transform = `translate(${mouseX - screenWidth/2}px, ${mouseY - screenHeight/2}px)`
    })
})