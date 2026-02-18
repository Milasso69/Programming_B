// ------------------------------------------------------------------
// UNDERVISNINGS-MANUSKRIPT: ML & KNN (Chart.js Version)
// ------------------------------------------------------------------
// MÅL FOR TIMEN:
// 1. Indlæse data fra CSV
// 2. Rense data og konvertere til objekter
// 3. Visualisere data med Chart.js (Scatter plot)
// 4. Implementere KNN algoritmen (Afstand, Sortering, Afgørelse)
// ------------------------------------------------------------------

// -------------------------------------------------------------
// TRIN 1: GLOBALE VARIABLER OG INDSTILLINGER
// (Start her: Vi skal definere hvad vores program skal kunne huske)
// -------------------------------------------------------------
var table           // Her gemmer vi den rå CSV fil fra p5's loadTable
var data = []       // Her gemmer vi vores rensede data (objekter med x, y, label)
var myChart         // Her gemmer vi selve graf-objektet fra Chart.js

// INDSTILLINGER FOR DATA
var filename = 'assets/elden_ring_weapon.csv'
var colX = 'totalDmg'     // X-aksen: Variabel 1 (input)
var colY = 'Wgt'      // Y-aksen: Variabel 2 (input)
var colLabel = 'Type' // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "Burnout Risk Predictor"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "Angiv den totale skade og vægten af våbenet:"
var sectionTitle2 = "2. Se Resultat i Grafen"

// Farver til vores grupper (Labels) - Chart.js bruger disse
var colorList = ['red', 'green', 'blue', 'orange', 'purple', 'cyan', 'magenta', 'teal', 'DarkGoldenRod', 'Crimson', 'DarkOliveGreen', 'DarkRed', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'BurlyWood', 'Chartreuse', 'CornflowerBlue', 'Fuchsia', 'GoldenRod', 'HotPink', 'IndianRed', 'indigo', 'Khaki', 'Lavender', 'LemonChiffon', 'LightGoldenRodYellow', 'LightSalmon', 'LightSlateGray', 'Lime', 'MediumOrchid']
console.log('Her er dine fuckass farver', colorList)
function preload() {
    // Indlæs data fil før programmet starter
    table = loadTable(filename, 'csv', 'header')
}

//This function converts damage values correctly. If the value is "-" it should count as 0.
function damageValue(row, columnName) {
    let value = row.get(columnName);
    //If the CSV contains "-", treat it as 0
    if (value === "-") {
        return 0;
    }
    //Otherwise convert it to a number
    return Number(value);
}

function setup() {
    // 0. SÆT TITLER I HTML
    select('#main-header').html(mainTitle)
    select('#section-1-title').html(sectionTitle1)
    select('#instruction-text').html(instructionText)
    select('#section-2-title').html(sectionTitle2)
    select('#label-x').html(colX)
    select('#label-y').html(colY)

    // -------------------------------------------------------------
    // TRIN 2: RENS DATA
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------
    var rows = table.rows
    //rows = shuffle(rows).slice(0, 1000) // Vi begrænser til 1000 punkter for hastighedens skyld

    data = rows.map(row => {
        var totalDmg =
            damageValue(row, "Phy") +
            damageValue(row, "Mag") +
            damageValue(row, "Fir") +
            damageValue(row, "Lit") +
            damageValue(row, "Hol");

        // Hent værdier fra de kolonner vi valgte i toppen
        // HUSK: Alt fra CSV er tekst, så vi bruger Number() til tallene
        var x = totalDmg
        var y = Number(row.get(colY))
        var label
        var l = row.get(colLabel)
        if(l=="Glintstone Staff" || l=="Sacred Seal" ){
            label ="Spellcasting"
        }else if(l=="Colossal Sword" || l=="Colossal Weapon" ){
            label ="Large Strength Weapons"
        }else if(l=="Bow" || l=="Light Bow" || l=='Crossbow' ){
            label ="Bows"
        }else if(l=="Greatsword"||l=="Greataxe"||l=="Greatbow"||l=="Curved Greatsword"||l=="Great Spear"){
            label ="Great Weapons"
        }else if (l=="Thrusting Sword"||l=="Whip") {
            label="Medium Dex Weapon"
        }else if (l=="Curved Sword"||l=="Flail"||l=="Heavy Thrusting Sword"||l=="Spear"||l=="Katana"||l=="Twinblade"||l=="Reaper") {
            label="Large Dex Weapon"
        }else if (l=="Hammer"||l=="Fist"||l=="Straight Sword"||l=="Axe") {
            label="Small Strength Weapon"
        }else if (l=="Halberd"||l=="Warhammer"||l=="Ballista") {
            label="Medium Strength Weapon"
        }else if (l=="Torch"||l=="Dagger"||l=="Claw") {
            label="Small Dex Weapons"
        }else{
            label = l
        }
 
        // Tjek om data er gyldig (ikke NaN og har en label)
        if (!isNaN(x) && !isNaN(y) && label) {
            return { x, y, label }
        }
    }).filter(p => p) // Fjern tomme pladser i arrayet

    console.log("Data klar:", data.length, "punkter")
    console.log("Her er dit fuck ass data", data)

    //nu skal vi forberede data til at blive vist med chart.js  
    //vi skal have fat i de unikke labels i hver gruppe i data
    var uniqueLabels = []
    data.map(point => {
        //Vi kigger på punktets label. Hvis vi ikke har set det label før, så må det være et unikt nyt et.
        if (!uniqueLabels.includes(point.label)) {
            uniqueLabels.push(point.label)
        }
    })
    console.log("Her er dine fuck ass labels", uniqueLabels)
    var datasets = uniqueLabels.map((label, index) => {
        //filter funktionen giver os en gruppe med et bestemt label
        var groupData = data.filter(point => {
            return point.label == label
        })
        var color = colorList[index]

        //retuner den færdige gruppe med alle datapunkterne for hvert label med datasets
        return {
            label: label,
            data: groupData,
            backgroundColor: color,
            pointRadius: 5,
            pointHoverRadius: 8
        }
    })
    console.log("Her er dine fuck ass datasets", datasets)

    //Vi vil nu oprette grafen med chart.js
    const canvasChart = document.getElementById('chartCanvas')
    myChart = new Chart(canvasChart, {
        type: 'scatter',
        data: { datasets: datasets },
        options: {
            //scales styre hvad x og y akserne hedder
            scales: {
                x: { title: { display: true, text: colX } },
                y: { title: { display: true, text: colY } }
            }
        }
    })
}

