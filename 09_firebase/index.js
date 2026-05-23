//lav en ref til din collection
var quotesRef = db.collection('quotes_data')
console.log('oprettet reference til test')
var edit_id = ''
var edit_div = ''

//P5 setup() bliver kaldt EN gang før siden vises 
function setup() {
    //NU KOMMER DET GENIALE: ONSNAPSHOT 
    quotesRef.onSnapshot(snap => {
        select('#quotes').html('')
        console.log('Modtog snap', snap.size)
        //ryd quotes div og sæt de nye quotes ind
        snap.forEach(doc => {
            var d = doc.data()
            console.log(d)
            var qDiv = createDiv(d.text)
            qDiv.mousePressed(() => {
                qDiv.attribute('contenteditable', 'true')
                edit_id = doc.id
                edit_div = qDiv
            })
            // Opret quote kort med knapper
            select('#quotes').child(
                createDiv().addClass('card').child(
                    qDiv
                ).child(
                    createDiv(d.timestamp.toDate().toLocaleDateString("da-DK", {
                        month: "short",
                        weekday: "long"
                    })).addClass('date')
                ).child(
                    createImg('./assets/delete.svg')
                        .addClass('delete')
                        .mousePressed(() => {
                            if (confirm("ER du nu sikker på at du vil slette - permanent og uopretteligt - dit quote: " + d.text)) {
                                quotesRef.doc(doc.id).delete()
                            }
                        })
                )
            )
        })
    })
}

//key pressed er en indbygget p5.js funktion 
function keyPressed() {
    //console.log(key)
    if (key == "Enter") {
        if (edit_id != '') {
            quotesRef.doc(edit_id).update({text: edit_div.html()})
            .then(()=>{
                edit_div = ''
                edit_id = ''
                console.log('quote opdateret')
            })
        } else {
            //hent teksten fra input feltet
            var q = select('#newQuote').value()
            if (q == "") {
                confirm('skriv venligst noget FØR DU TRYKKER ENTER')
                return
            }
            //nu skal vi gemme det nye quote i firestore
            //funktionen add() på en collectionref 
            //OPRETTER en ny collection hvis den IKKE findes 
            quotesRef.add({
                text: q,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                //.then kaldes asynkront NÅR add er færdig
            }).then(
                console.log('Quote gemt i databasen', q)
            )
            select('#newQuote').html('')
        }

    }
}