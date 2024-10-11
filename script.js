// be gay do crime

// vars
let height = 100; //defaults to 100, max 500
let width = 0;
let seed = 0;
let greenSeed = 0;
let blueSeed = 0;
updateRatio();
updateWidth();
rollSeed();
updateSeed();

makeGrid();
randomizeColors();

// grab the user's window resolution ratio and store it in a variable
function updateRatio(){
    userScreenRatio = window.innerWidth / window.innerHeight;
    console.log("Screen ratio is set to",userScreenRatio);
}

//width = height * userScreenRatio, but trimming off 25% of that number
function updateWidth(){
    width = Math.floor((height * userScreenRatio) - 0.25*(height * userScreenRatio));
    console.log("Width is set to",width);
    document.getElementById("canvasWidth").innerHTML = width;
}

function rollSeed(){
    // make the seed is a number between 9x10^100 and -9x10^100
    seed = (Math.random() * 2 - 1) * 9e10;


    document.getElementById("seed").value = seed;
    document.getElementById("seed").innerHTML = seed;
    updateSeed();
}

function updateSeed(){
    seed = document.getElementById("seed").value;
    // don't let seed be less than 100 or greater than 99999   
    
    greenSeed = Math.floor(seededRandom(seed) * 99999) + 100;
    blueSeed = Math.floor(seededRandom(greenSeed) * 99999) + 100;

    document.getElementById("seed").innerHTML = seed;
    randomizeColors();
}

function updateCanvas(){
    height = document.getElementById("canvasHeight").value;
    if (height > 500){
        height = 500;
        document.getElementById("canvasHeight").value = 500;
    } else if (height < 1){
        height = 1;
        document.getElementById("canvasHeight").value = 1;
    }
    updateWidth();
    document.getElementById("canvas").innerHTML = "";
    makeGrid();
    updateSeed();
    randomizeColors();
}

//create the grid, and assign each cell an id from "0" to whatever the total number of cells is
function makeGrid(){
    for (let i = 0; i < height; i++){
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < width; j++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = i * width + j;
            row.appendChild(cell);
        }
        document.getElementById("canvas").appendChild(row);
    }
}

//seed based random number generator, generates between 0 and 1
function seededRandom(seed){
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}


//random color generator, based on the seed multiplied by the id of the cell
function randomColor(i){
    let r = Math.floor(seededRandom(seed*i) * 256);
    let g = Math.floor(seededRandom(greenSeed*i) * 256);
    let b = Math.floor(seededRandom(blueSeed*i) * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
//randomly color all the cells
function randomizeColors(){
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++){
        cells[i].style.backgroundColor = randomColor(i);
    }
}

    //resize the grid when the window is resized
    window.onresize = function(){
        updateRatio();
        updateWidth();
        document.getElementById("canvas").innerHTML = "";
        makeGrid();
        randomizeColors();
    }

// toggle between visible style and hidden style for the info div
function toggleInfo(){
    let info = document.getElementById("info");
    if (info.style.visibility == "hidden"){
        info.style.visibility = "visible";
    } else {
        info.style.visibility = "hidden";
    }
}