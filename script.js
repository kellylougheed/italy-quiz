let provinceDisplay = document.querySelector("#province")
let score = document.querySelector("#score")
let timer = document.querySelector("#timer")

let provinces = ["Valle d'Aosta", "Piemonte", "Liguria", "Lombardia", "Trentino Alto Adige", "Fruili Venezia Giulia", "Veneto", "Emilia Romagna", "Toscana", "Umbria", "Le Marche", "Abruzzo", "Lazio", "Molise", "Campania", "Basilicata", "Puglia", "Calabria", "Sicilia", "Sardegna"]

let count = 0
let seconds = 60

init()

// Update the timer every second to count down
let interval = setInterval(function() {
  if (seconds > 9) {
    timer.innerHTML = "00:" + seconds
  } else if (seconds > 0) {
    timer.innerHTML = "00:0" + seconds
    timer.style.color = "red"
  } else {
    timer.innerHTML = "00:00"
    lose()
  }
  seconds--
}, 1000)

// Fills in provinces that have been correctly clicked on and updates score
window.addEventListener("click", e => {
  // Strips punctuation and white space out of answers to compare it to HTML id
  let answer = provinces[count].toLowerCase().replace(/[\s']/g, "")
  if (e.target.id.toLowerCase() == answer) {
    // Fills province with red, green, or grey randomly (Italian colors)
    let colors = ["#aadd77", "#ff6961", "#dddddd"]
    e.target.style.fill = colors[Math.floor(Math.random() * colors.length)]
    count++
    display()
    if (count == provinces.length) {
      win()
    }
  }
})

function init() {
  shuffle(provinces)
  display()
}

// Display a new province and update the score
function display() {
  provinceDisplay.innerHTML = provinces[count]
  score.innerHTML = count + " / " + provinces.length
}

// Stop the timer and display win message
function win() {
  clearInterval(interval)
  provinceDisplay.innerHTML = "You win!"
}

// Stop the timer and display lose message
function lose() {
  clearInterval(interval)
  timer.style.color = "red"
  provinceDisplay.innerHTML = "Sorry, out of time!"
}

// Array shuffle algorithm from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
