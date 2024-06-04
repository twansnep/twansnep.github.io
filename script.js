const biertje = document.querySelector('#biertje')
const willem = document.querySelector('#willem')
const hoed = document.querySelector ('#hoed')
const feest = document.querySelector ('#feest')
const video = document.querySelector('#achtergrondVideo')
const rondje = document.querySelector('#rondje')

let plaatjesArray = ['img/beer/bier1.png', // Array met paden naar de biertjesafbeeldingen
                    'img/beer/bier2.png',
                    'img/beer/bier3.png',
                    'img/beer/bier4.png',
                    'img/beer/bier5.png',
                    'img/beer/bier6.png',
                    'img/beer/bier7.png',
                    'img/beer/tap.png']
let hoedenArray = ['img/illustratie_willem.png', // Array met paden naar de hoedenafbeeldingen
            'img/hoeden/hoed1.png',
            'img/hoeden/hoed2.png',
            'img/hoeden/hoed3.png']

let biertjeIndex = 0 // Houdt de huidige index bij voor de biertjesafbeeldingen
let hoedIndex = 0 // Houdt de huidige index bij voor de hoedenafbeeldingen
let rondjeCounter = 0 // Teller om bij te houden hoe vaak rondjeBetaald is uitgevoerd
let audioFeest = new Audio ("vidaud/music.mp3") //https://www.youtube.com/watch?v=hg9gvz5n614//
let rondjeAudio = new Audio ("vidaud/Bell.mp3") //https://www.youtube.com/shorts/h-AytDAZphg//

function bierKnop (){
    // ChatGPT
    //hoe kan ik er bij de js code voor zorgen dat wanneer alle elementen uit plaatjesAray zijn geweest de array weer opnieuw begint
    biertjeIndex = (biertjeIndex + 1) % plaatjesArray.length //modulo operator: toont het verschil tussen hoeveelheid biertjeIndex en lengte van array. Wanneer length evengroot is als biertjeIndex -> biertjeIndex = 0  
    biertjeAfbeelding = plaatjesArray[biertjeIndex] // Verkrijgt de huidige afbeelding uit 'plaatjesArray'
    biertje.src = biertjeAfbeelding // Wijzigt de bron van het 'biertje' element naar de huidige afbeelding
    console.log(biertjeIndex)
    if (biertjeIndex == 6) {
        dronkenWillem ()
    }
}

function dronkenWillem (){
    willem.src = 'img/hoeden/hoed1.png' // Wijzigt de bron van het 'willem' element naar de eerste hoed afbeelding
}

function hoedKnop (){
    hoedIndex = (hoedIndex + 1) % hoedenArray.length
    hoedAfbeelding = hoedenArray[hoedIndex]
    willem.src = hoedAfbeelding
    console.log(hoedIndex)
}

function feestKnop (){ //ChatGPT prompt: Hoe zorg ik er bij deze code voor dat er bij het drukken op de knop met id #feest de achtergrond veranderd in een video van 5 seconden en daarna weer terug veranderd in de huidige achtergrond? Doe het netjes volgens de regels //
    video.style.display = 'block' // maakt video zichtbaar door style naar 'block' te veranderen
    video.play() // Speel de video af
    playFeest ()  // Speel het feestgeluid af
    document.body.style.backgroundImage = 'none' // verwijderd de huidige achtergrond
  // Start een timer van 5 seconden waarna de video niet meer zichtbaar is en de oude achtergrond terugkomt
    setTimeout(() => { 
        video.style.display = 'none'
        document.body.style.backgroundImage = 'url("img/background.png")'
    }, 5000); 
}

function playFeest (){
    audioFeest.play() //speelt het feestgeluid af
}

function rondjeBetaald (){
    rondjeAudio.play () // Speel het rondjegeluid af

    let intervalBier = setInterval(() => { // Stel een interval in dat elke 500 milliseconden wordt uitgevoerd
        biertjeIndex = (biertjeIndex + 1) % plaatjesArray.length;
        biertje.src = plaatjesArray[biertjeIndex]
        // Als de 'biertjeIndex' gelijk is aan de laatste index van 'plaatjesArray'
            if (biertjeIndex === plaatjesArray.length - 1) {
            //Dan stopt de interval zodat de afbeeldingen niet opnieuw beginnen
                clearInterval(intervalBier)}
            }, 500);
    rondjeCounter = rondjeCounter + 1 // Telt 1 op rondjeCounter na drukken op button const rondje

    // voert bij 3e rondje feestKnop uit
    if (rondjeCounter == 3) { 
        feestKnop () 
    }
}

biertje.addEventListener('click', bierKnop)
hoed.addEventListener('click', hoedKnop)
feest.addEventListener('click', feestKnop)
rondje.addEventListener('click', rondjeBetaald)