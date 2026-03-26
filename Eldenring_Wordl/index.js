var currentPage = '#page2'
var table
var wpns = []

function preload() {
    // Indlæs data fil før programmet starter
    table = loadTable('./asstes/elden_ring_weapon.csv', 'csv', 'header')
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

//Function for getting the damage type from the coulmn name
function type(row, columnName) {
    //Take all rows and get their column name
    let value = row.get(columnName);
    //if value is not "-" return coulmnName
    if (columnName == "Phy" || "Mag" || "Fir" || "Lit" || "Hol") {
        if (value !== "-") {
            return columnName
        } else {
            return ""
        }
    }
}

function scalingValue(row, columnName) {
    let value = row.get(columnName);

    if (value !== "-") {
        return value
    } else {
        return ""
    }
}

//Function for getting the value of the columns in the CSV file
function wpnValue(row, columnName) {
    let value = row.get(columnName);
    return value;
}

//P5 setup() bliver kaldt en gang før siden vises
function setup() {
    console.log('Ba- ba- ball')
    shiftPage(currentPage)

    //Input field clear and shiii
    var guess = select('#guess')
    select('#guessBtn').mousePressed(() => {
        guess.value("")
    })

    shuffleWpns()

    //select('#playBtn').mousePressed(()=>{shiftPage('#page2')})



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
                () => shiftPage('#' + page.attribute('id'))
            )
            //sæt a tagget ind i sideabar
            select('.sidebar').child(menuItem)
        }
    )
}

function shuffleWpns() {
    wpns = table.rows.map(row => {
        wpn = wpnValue(row, 'Name')
        wpnType = wpnValue(row, 'Type')
        var dmg =
            damageValue(row, "Phy") +
            damageValue(row, "Mag") +
            damageValue(row, "Fir") +
            damageValue(row, "Lit") +
            damageValue(row, "Hol");

        var damageType = [
            type(row, "Phy"),
            type(row, "Mag"),
            type(row, "Fir"),
            type(row, "Lit"),
            type(row, "Hol")
        ]

        var damageType = damageType.filter((word) => word.length > 1)
        //console.log(damageType)

        //console.log(damageType[0])

        var dT = damageType.map((value) => {

            if (value == "Phy") {
                return "Physical";
            }else if (value == "Mag") {
                return "Magic";
            }else if (value == "Fir") {
                return "Fire";
            }else if (value == "Lit") {
                return "Lightning";
            }else if (value == "Hol") {
                return "Holy";
            }
        });
        //console.log(dT)

        scaling = [
            scalingValue(row, "Str"),
            scalingValue(row, "Dex"),
            scalingValue(row, "Int"),
            scalingValue(row, "Fai"),
            scalingValue(row, "Arc")
        ];

        var scaling = scaling.filter((word) => word.length > 0);

        var scalingType = [
            type(row, "Str"),
            type(row, "Dex"),
            type(row, "Int"),
            type(row, "Fai"),
            type(row, "Arc")
        ]

        var scalingType = scalingType.filter((word) => word.length > 0)
        //console.log(scalingType)

        var sT = scalingType.map((value) => {
            if (value == "Str") {
                return "Strength";
            }else if (value == "Dex") {
                return "Dexterity";
            }else if (value == "Int") {
                return "Inteligence";
            }else if (value == "Fai") {
                return "Faith";
            }else if (value == "Arc") {
                return "Arcane";
            }
        })
        //console.log(sT)

        wgt = wpnValue(row, "Wgt")
        smith = wpnValue(row, "Upgrade")


        var weaponData = {
            wpn,
            wpnType,
            dmg,
            dT,
            scaling,
            sT,
            wgt,
            smith
        }
        return weaponData
    })
    wpns = shuffle(wpns)
    console.log(wpns)
}

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage

}
