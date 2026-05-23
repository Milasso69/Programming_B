// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0

//Room Timers
var room1Timer
var room2Timer
var room3Timer

//Audios
const click = new Audio('assets/click.mp3')
const swordSwing = new Audio('assets/Sword-Hit.mp3')
const muda = new Audio('assets/muda.mp3')
const splat = new Audio('assets/splat.mp3')
const deathSplat = new Audio('assets/death-splat.mp3')
const portal = new Audio('assets/portal.mp3')

// Counters 
var symbolsFound = 0
var devil1Clicks = 0
var devil2Clicks = 0

// Firestore reference
var scoresRef = db.collection('highscores')

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage(currentPage)
    loadHighScores()

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        click.play()
        startGame()
    })

    // ---- SCENE 1: Melina ----
    document.onkeydown = () => {
        click.play()
        select('#s1t1').hide()
        select('#s1t2').show()
        document.onkeydown = () => {
            click.play()
            select('#s1t2').hide()
            select('#s1t3').show()
        }
    }

    select('#accept1').mousePressed(() => {
        click.play()
        portal.play()
        shiftPage('#room1')
    })

    select('#decline1').mousePressed(() => {
        click.play()
        select('#textBox1').html('<p>Too bad so sad! Your comming along with me anyway!</p>')

        var proceedButton = createButton('Proceed')
        proceedButton.class('scene1Button')
        proceedButton.id('proceed1')
        select('#textBox1').child(proceedButton)

        select('#proceed1').mousePressed(() => {
            click.play()
            shiftPage('#room1')
            portal.play()
        })
    })

    // ---- RUM 1: Hotspots ----
    select('#room1 #dot1').mousePressed(() => { findSymbol('#room1 #dot1'); swordSwing.play() })
    select('#room1 #dot2').mousePressed(() => { findSymbol('#room1 #dot2'); swordSwing.play() })
    select('#room1 #dot3').mousePressed(() => { findSymbol('#room1 #dot3'); swordSwing.play() })
    select('#room1 #dot4').mousePressed(() => { findSymbol('#room1 #dot4'); swordSwing.play() })
    select('#room1 #dot5').mousePressed(() => { findSymbol('#room1 #dot5'); swordSwing.play() })
    select('#room1 #dot6').mousePressed(() => { findSymbol('#room1 #dot6'); swordSwing.play() })
    select('#room1 #dot7').mousePressed(() => { findSymbol('#room1 #dot7'); swordSwing.play() })
    select('#room1 #dot8').mousePressed(() => { findSymbol('#room1 #dot8'); swordSwing.play() })
    select('#room1 #dot9').mousePressed(() => { findSymbol('#room1 #dot9'); swordSwing.play() })
    select('#room1 #dot10').mousePressed(() => { findSymbol('#room1 #dot10'); swordSwing.play() })


    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        click.play()
        saveHighScore()
    })

    select('#btn-restart').mousePressed(() => {
        click.play()
        resetGame()
    })
}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage

    if (currentPage == '#room1') {
        //VI er endt i room1, start timeren med 15 sekunder
        var room1Seconds = 20
        room1Timer = setInterval(() => {
            room1Seconds--;
            select('#room1Timer').html(room1Seconds)
            if (room1Seconds === 0) {
                shiftPage('#lost');
                clearInterval(room1Timer); // Stop intervallet, når betingelsen er opfyldt
            }
        }, 1000);

        //===========================================
        // DOTS — vis og skjul dot-elementer i room1
        //===========================================
        // Array med alle dot-elementerne
        const dots = [];
        for (let i = 1; i <= 10; i++) {
            dots.push({
                element: document.getElementById(`dot${i}`),
            });
        }

        // Funktion til at vise og skjule en dot
        function showDot(index) {
            // Hvis index er ugyldigt, stop
            if (index < 0 || index >= dots.length) return;

            // Vis den aktuelle dot
            dots[index].element.style.display = "block";
            dots[index].hidden = false;
            console.log(`Viser dot${index + 1}`);

            // Skjul den igen efter 1 sekund
            setTimeout(() => {
                if (!dots[index].hidden) { // Kun skjul, hvis den stadig er synlig
                    dots[index].element.style.display = "none";
                    dots[index].hidden = true;
                    console.log(`Skjuler dot${index + 1}`);
                }

                // Gå videre til næste dot (eller start forfra)
                const nextIndex = (index + 1) % dots.length;
                setTimeout(() => showDot(nextIndex), 1000); // Vent 1 sekund før næste dot
            }, 1000);
        }

        // Vent 1 sekund inden den første dot vises
        setTimeout(() => {
            showDot(0);
        }, 1000);

    } else if (currentPage == '#room2') {
        //Vi er endt i room2, start timeren med 10 sekunder
        var room2Seconds = 10
        select('#diavolo').mousePressed(() => {
            muda.play()
            clearInterval(room2Timer);
            setTimeout(() => {
                portal.play()
                shiftPage('#room3')
            }, 2690) 
        })
        room2Timer = setInterval(() => {
            room2Seconds--
            select('#room2Timer').html(room2Seconds)
            if (room2Seconds === 0) {
                shiftPage('#lost')
                clearInterval(room2Timer) // Stop intervallet, når betingelsen er opfyldt
            }
        }, 1000)
    } else if (currentPage == '#room3') {
        var room3Seconds = 5
        room3Timer = setInterval(() => {
            room3Seconds--
            select('#room3Timer').html(room3Seconds)
            if (room3Seconds === 0) {
                shiftPage('#lost')
                clearInterval(room3Timer) // Stop intervallet, når betingelsen er opfyldt
            }
        }, 1000)

        //===========================================
        // Devils - klik på djævelerne i room3 
        //===========================================

        select('#devil1').mousePressed(() => {
            splat.play()
            devil1Clicks++
            console.log('Devil 1 clicks:', devil1Clicks)
            if (devil1Clicks === 5) {
                deathSplat.play()
                select('#devil1').hide()
                console.log('Devil 1 is dead!')
            }

            if (devil1Clicks === 5 && devil2Clicks === 5) {
                clearInterval(room3Timer)
                portal.play()
                shiftPage('#scene2')
            }
        })

        select('#devil2').mousePressed(() => {
            splat.play()
            devil2Clicks++
            console.log('Devil 2 clicks:', devil2Clicks)
            if (devil2Clicks === 5) {
                deathSplat.play()
                select('#devil2').hide()
                console.log('Devil 2 is dead!')
            }

            if (devil1Clicks === 5 && devil2Clicks === 5) {
                clearInterval(room3Timer)
                portal.play()
                shiftPage('#scene2')
            }
        })

    }
}

// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
function startTimer() {
    seconds = 0
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}

// ============================================
// START SPIL
// ============================================
function startGame() {
    gameState = 0
    symbolsFound = 0
    startTimer()
    shiftPage('#scene1')

}

// ============================================
// RUM 1: FIND SYMBOLER I JUNGLEN
// ============================================
function findSymbol(id) {
    select(id).hide()
    symbolsFound++
    select('#room1-found').html('Clicked: ' + symbolsFound + ' / 10')

    if (symbolsFound === 10) {
        gameState = 1
        shiftPage('#room2')
        clearInterval(room1Timer);
        portal.play()
    }
}

// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}

function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', seconds, 'sek')
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    // Udkommenter linjen herunder når firebase.js er sat op:
    /*scoresRef.add({ name: name, seconds: seconds }).then(() => {
        select('#btn-save').attribute('disabled', true)
        select('#btn-save').html('Gemt!')
    })*/
}

// ============================================
// RESET
// ============================================
function resetGame() {
    select('#timer').html('0 sek')

    // Nulstil rum 1
    select('#room1-found').html('Fundet: 0 / 15')
    select('#room1-hint').html('Find de 3 skjulte symboler i junglen...')

    // Nulstil rum 3
    devil1Clicks = 0
    devil2Clicks = 0
    select('#devil1').show()
    select('#devil2').show()

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage('#start')
}

