// ============================================
// STATE
// ============================================
var currentPage = '#start'
var timerInterval = null
var seconds = 0

//Room Timers
var room1Timer
var room2Timer
var room3Timer
var room4Timer

//Audios
const click = new Audio('assets/click.mp3')
const swordSwing = new Audio('assets/Sword-Hit.mp3')
const muda = new Audio('assets/muda.mp3')
const splat = new Audio('assets/splat.mp3')
const deathSplat = new Audio('assets/death-splat.mp3')
const portal = new Audio('assets/portal.mp3')
const death = new Audio('assets/death.mp3')
const dojyan = new Audio('assets/dojyan.mp3')
const PEW = new Audio('assets/PEW.mp3')

// Counters 
var symbolsFound = 0
var devil1Clicks = 0
var devil2Clicks = 0
var dinosFound = 0

// Firestore reference
const firebaseConfig = {
    apiKey: "AIzaSyBhyZm9GViTO00TzmeFVryr93dsN-RX09k",
    authDomain: "prog-aasproeve.firebaseapp.com",
    projectId: "prog-aasproeve",
    storageBucket: "prog-aasproeve.firebasestorage.app",
    messagingSenderId: "888903294583",
    appId: "1:888903294583:web:c984ef74f9e7c18aaf7072",
    measurementId: "G-PFPT4E2ZS7"
};

//Opret forbindelse til firebase
firebase.initializeApp(firebaseConfig)
console.log("Firebase Startede med: ", firebaseConfig.projectId)

//Vi får nu et firestore object som vi kan bruge til at komunikere til databasen firestore
var db = firebase.firestore()
console.log("forbindelse til firestore oprettet")
var scoresRef = db.collection('highscores')



// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage(currentPage)
    loadHighScores()
}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage

    // ---- SCENE 1: Melina ----
    if (currentPage == '#scene1') {
        document.onkeydown = () => {
            click.play()
            select('#s1t1').hide()
            select('#s1t2').show()
            document.onkeydown = () => {
                document.onkeydown = null
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
            select('#textBox1').html('<p>Too bad so sad! Your coming along with me anyway!</p>')

            var proceedButton = createButton('Proceed')
            proceedButton.class('sceneButton')
            proceedButton.id('proceed1')
            select('#textBox1').child(proceedButton)

            select('#proceed1').mousePressed(() => {
                click.play()
                shiftPage('#room1')
                portal.play()
            })
        })

        // ---- RUM 1: Margit the Fell Omen ----
    } else if (currentPage == '#room1') {
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

        // ---- RUM 2: Diavolo ----
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
                death.play()
                shiftPage('#lost')
                clearInterval(room2Timer) // Stop intervallet, når betingelsen er opfyldt
            }
        }, 1000)

        // ---- RUM 3: Devil May Cry ----
    } else if (currentPage == '#room3') {
        var room3Seconds = 5
        room3Timer = setInterval(() => {
            room3Seconds--
            select('#room3Timer').html(room3Seconds)
            if (room3Seconds === 0) {
                death.play()
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
        // ---- Scene 2: Father Pucci ----
    } else if (currentPage == '#scene2') {
        document.onkeydown = () => {
            click.play()
            select('#s2t1').hide()
            select('#pucci').show()
            select('#s2t2').show()
            document.onkeydown = () => {
                click.play()
                select('#s2t2').hide()
                select('#s2t3').show()
                document.onkeydown = () => {
                    click.play()
                    select('#s2t3').hide()
                    select('#s2t4').show()
                    document.onkeydown = () => {
                        document.onkeydown = null
                        click.play()
                        select('#s2t4').hide()
                        select('#s2t5').show()
                    }
                }
            }
        }

        select('#accept2').mousePressed(() => {
            click.play()
            death.play()
            select('#s2lost').show()
            select('#pucci').hide()
            select('#textbox2').hide()
            setTimeout(() => {
                shiftPage('#lost')
            }, 5825)
        })

        select('#decline2').mousePressed(() => {
            click.play()
            select('#madeInHeaven').show()
            select('#madeInHeaven').play()
            select('#pucci').hide()
            select('#textbox2').hide()
            setTimeout(() => {
                shiftPage('#scene3')
                select('#madeInHeaven').hide()
            }, 16068)
        })

        // ---- Scene 3: Arizona Desert ----
    } else if (currentPage == '#scene3') {
        document.onkeydown = () => {
            click.play()
            select('#s3t1').hide()
            select('#s3t2').show()
            document.onkeydown = () => {
                click.play()
                select('#s3t2').hide()
                select('#s3t3').show()
                document.onkeydown = () => {
                    click.play()
                    select('#s3t3').hide()
                    select('#s3t4').show()
                    select('#accept3').mousePressed(() => {
                        click.play()
                        select('#jesus').hide()
                        select('#s3t4').hide()
                        select('#s3t5a').show()
                        document.onkeydown = () => {
                            click.play()
                            select('#s3t5a').hide()
                            select('#s3t6a').show()
                            document.onkeydown = () => {
                                click.play()
                                select('#s3t6a').hide()
                                select('#s3t7a').show()
                                document.onkeydown = () => {
                                    click.play()
                                    select('#s3t7a').hide()
                                    select('#s3t8a').show()
                                    document.onkeydown = () => {
                                        click.play()
                                        shiftPage('#room4')
                                    }
                                }
                            }
                        }

                    })
                    select('#decline3').mousePressed(() => {
                        click.play()
                        dojyan.play()
                        setTimeout(() => {

                            select('#s3t4').hide()
                            select('#valentine').show()
                            select('#s3t5b').show()
                            document.onkeydown = () => {
                                click.play()
                                select('#s3t5b').hide()
                                select('#s3t6b').show()
                                document.onkeydown = () => {
                                    click.play()
                                    select('#s3t6b').hide()
                                    select('#s3t7b').show()
                                    document.onkeydown = () => {
                                        death.play()
                                        select('#s3lost').show()
                                        select('#textBox3').hide()
                                        select('#valentine').hide()
                                        select('#jesus').hide()
                                        setTimeout(() => {
                                            shiftPage('#lost')
                                        }, 5825)
                                    }
                                }
                            }
                        })
                    }, 1581)
                }
            }
        }
    }

    if (currentPage == '#room4') {
        document.onkeydown = () => {
            click.play()
            select('#r4t1').hide()
            select('#r4t2').show()
            select('#diego').show()
            document.onkeydown = () => {
                click.play()
                select('#r4t2').hide()
                select('#r4t3').show()
                document.onkeydown = () => {
                    document.onkeydown = null // Deaktiver yderligere key presses
                    click.play()
                    select('#room4Timer').removeClass('hidden')
                    select('#textBox4').hide()
                    select('#room4-found').removeClass('hidden')
                    select('#dino1').show()
                    select('#dino2').show()
                    select('#dino3').show()
                    select('#dino4').show()
                    select('#dino5').show()
                    select('#dino6').show()

                    select('#dino1').mousePressed(() => { findDino('#dino1'); PEW.play() })
                    select('#dino2').mousePressed(() => { findDino('#dino2'); PEW.play() })
                    select('#dino3').mousePressed(() => { findDino('#dino3'); PEW.play() })
                    select('#dino4').mousePressed(() => { findDino('#dino4'); PEW.play() })
                    select('#dino5').mousePressed(() => { findDino('#dino5'); PEW.play() })
                    select('#dino6').mousePressed(() => { findDino('#dino6'); PEW.play() })

                    var room4Seconds = 10
                    room4Timer = setInterval(() => {
                        room4Seconds--
                        select('#room4Timer').html(room4Seconds)
                        console.log('Room 4 seconds left:', room4Seconds)
                        if (room4Seconds === 0) {
                            death.play()
                            shiftPage('#lost')
                            clearInterval(room4Timer) // Stop intervallet, når betingelsen er opfyldt
                        }
                    }, 1000)
                }
            }
        }
    } else if (currentPage == '#lost') {
        select('#btn-try-again').mousePressed(() => {
            click.play()
            resetGame()
            shiftPage('#start')
        })
    } else if (currentPage == '#win') {
        // ---- SLUTSIDE ----
        select('#btn-save').mousePressed(() => {
            click.play()
            saveHighScore()
        })

        select('#btn-restart').mousePressed(() => {
            click.play()
            resetGame()
        })
    } else if (currentPage == '#start') {
        // ---- STARTSIDE ----
        select('#btn-start').mousePressed(() => {
            click.play()
            select('#timer').show()
            startGame()
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
        shiftPage('#room2')
        clearInterval(room1Timer);
        portal.play()
    }
}

function findDino(id) {
    select(id).hide()
    dinosFound++
    select('#room4-found').html('Clicked: ' + dinosFound + ' / 6')

    if (dinosFound === 6) {
        select('#diego').style('cursor', 'pointer')
        select('#diego').mousePressed(() => {
            PEW.play()
            clearInterval(room4Timer);
            shiftPage('#win')
            stopTimer()
            select('#final-time').html('Your time: ' + seconds + ' sek')
        })
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
    scoresRef.add({ name: name, seconds: seconds }).then(() => {
        select('#btn-save').attribute('disabled', true)
        select('#btn-save').html('Gemt!')
    })
}

// ============================================
// RESET
// ============================================
function resetGame() {
    /*select('#timer').html('0 sek')
    select('#timer').hide()

    // Nulstil scene 1
    select('#s1t1').show()
    select('#s1t3').hide()

    // Nulstil rum 1
    select('#room1-found').html('Fundet: 0 / 10')
    select('#room1Timer').html('20')
    symbolsFound = 0

    // Nulstil rum 2:
    select('#room2Timer').html('10')

    // Nulstil rum 3
    devil1Clicks = 0
    devil2Clicks = 0
    select('#devil1').show()
    select('#devil2').show()
    select('#room3Timer').html('5')

    //Nulstil scene 2
    select('#s2t1').show()
    select('#s2t5').hide()
    select('#textbox2').show()

    //Nulstil scene 3
    select('#s3t1').show()
    select('#jesus').show()
    select('#s3t8a').hide()
    select('#s3t7b').hide()
    select('#textBox3').show()

    //Nulstil rum 4
    select('#r4t1').show()
    select('#diego').hide()
    select('#room4-found').html('Fundet: 0 / 6')
    select('#room4Timer').html('10')
    dinosFound = 0
    select('#textBox4').show()

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage('#start')*/

    window.location.reload();
}



