//This script takes a csv and cleans the data into a JS array

var table
//cleanData will hold the JS objects we intend to use
var cleanData = []

const csvFile = './assets/elden_ring_weapon.csv'

//Vi vil kun bruge 1000 rækker når vi skal tegne dem på skærmen
const maxRows = 1000

function preload() {
    //loadTable er en p5 funktion der henter et table fra en fil
    table = loadTable(csvFile, 'csv', 'header')
    console.log('Data tabel loaded', table)
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

//Kan jeg, ved brug af KNN, forudsige hvilken våben type i Elden Ring, ved hjælp af gennemsnit skaden og vægten? 
function setup() {
    console.log("Rå data kolonner: ", table.columns)
    var xValue = "totalDmg"
    var yValue = "Wgt"
    var labelValue = "Type"

    //map retunerer et nyt array med de dimentioner vi vil have
    cleanData = table.rows.map(row => {
        //Calculate the total damage of the weapons
        var totalDmg =
            damageValue(row, "Phy") +
            damageValue(row, "Mag") +
            damageValue(row, "Fir") +
            damageValue(row, "Lit") +
            damageValue(row, "Hol");

        var x = row.get(xValue)
        var y = row.get(yValue)
        var returnObj = {
            totalDmg: totalDmg,
            [yValue]: Number(y)
        }
        if (labelValue) {
            returnObj.label = row.get(labelValue)
        }
        return returnObj
    })
    //Vi filtrerer så lige arrayet så vi er sikre på at alle de dimensioner vi skal bruge er 
    cleanData = cleanData.filter(row => {
        //Valid er true hvis begge felter er et TAL
        var valid = !isNaN(row[xValue]) && !isNaN(row[yValue])
        //Men vi skal også tjekke om label er noget hvis vi har et label
        if (labelValue && !row.label) {
            valid = false
        }
        return valid
    })

    //bland data vilkårligt med en p5 funktion
    cleanData = shuffle(cleanData)

    cleanData = cleanData.slice(0, maxRows)

    console.log('Så har vi renset data:', cleanData)

    select('#status').html(`Vi har nu renset data skåret ned til max 1000 rækker - kig i konsolen!`)
}


