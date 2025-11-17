var currentPage = '#page5'

//P5 setup() bliver kaldt en gang før siden vises
function setup(){
    console.log('Ba- ba- ball')
    shiftPage(currentPage)

    //buttons
    var theButton = select('#theButton')
    theButton.mousePressed( ()=>{
        if( confirm('~Nya~ Er du sikker Senpai?') ){
            theButton.html('~Nya~, thank you Senpai')
        }else{
            theButton.html('Aww dangit ~Nya~')
        }
    })

    //P5 button
    var myButton = createButton('Button created with JavaScript')
    //læg den ind i #page5
    select('#page5').child(myButton)
    //lav en evetn listener
    myButton.mousePressed(()=>{
        shiftPage('#page1')
    })

    //Drop Downs
    var theSelect = select('#theSelect')
    //Even listener: changed
    theSelect.changed( ()=>{
        select('#page2').style('background-color', theSelect.value())
    })

    //Inout field
    var theInput = select('#theInput')
    var theInputButton = select('#theInputBotton')
    var theInputTitle = select('#theInputTitle')
    theInputButton.mousePressed( ()=>{
        var title = theInput.value()
        theInput.hide()
        theInputButton.hide()
        theInputTitle.html(title)
    })

    //Checkboxes
    var ck=select('#ck1')
    ck.changed(()=>{
        ck.hide()
        select('#ckl').hide()
        select('#rebel').html("打倒叛乱!!!")
    })















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
