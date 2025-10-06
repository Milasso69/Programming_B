var currentPage = '#page5'

//P5 setup() bliver kaldt en gang før siden vises
function setup(){
    console.log('Ba- ba- ball')
    //sæt event listeners op på menu
    select('#menuPage1').mousePressed(
        function(){
            shiftPage('#page1')
        }
    )
    select('#menuPage2').mousePressed(
        function(){
            shiftPage('#page2')
        }
    )
    select('#menuPage3').mousePressed(
        function(){
            shiftPage('#page3')
        }
    )
    select('#menuPage4').mousePressed(
        function(){
            shiftPage('#page4')
        }
    )
    select('#menuPage5').mousePressed(
        function(){
            shiftPage('#page5')
        }
    )
}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
