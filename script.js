window.onload = init;

/* Store the cat images in an array for later use */

var catImages = [
    "images/motion-study-cat-o_f01.gif",
    "images/motion-study-cat-o_f02.gif",
    "images/motion-study-cat-o_f03.gif"
];

/***********

1. Make the seer poster clickable
    a) At init, grab the seer and store it in a variable
    b) Set wasClicked to false, since it has not been clicked yet, and I only want to append the cat image once
    c) set the onclick function to the seer

***********/

function init() {
    
    var seer = document.getElementById("seer_img");
    seer.wasClicked = false;
    seer.onclick = catAppear;
        
}

/***********

2. Run through the function one time
    a) When the function is called, the code will only run if .wasClicked is false
    b) Change .wasClicked to true so the code cannot run again

3. Create the cat slideshow
    a) Create a new image element
    b) Set the source to the FIRST cat image, which is in the 0 position
    c) Set .moveRight to TRUE, since I want to move FORWARD in the array when the cat is clicked
    d) Set the onclick to catIncrease function

4. Add event listener for mousemove

5. onmouseout will call the catReset function

6. Append the new image to the slideshow div

***********/


function catAppear() {
    
    if (this.wasClicked == false) {
    
        var singleCatImg = document.createElement("img");
        singleCatImg.src = catImages[0];
        singleCatImg.moveRight = true;
        singleCatImg.onclick = catIncrease;

        singleCatImg.addEventListener("mousemove", 
        function(event) {
            mouseDirection(event);
        });

        singleCatImg.onmouseout = catReset;

        var slideshow = document.getElementById("slideshow");
        slideshow.appendChild(singleCatImg);

        this.wasClicked = true;
        
    }
}

/***********

7. Create the oldX variable and set it to 0
    This will track the value of x in order to determine right and left
    
8. Create the mouseDirection function
    The code inside the function will only run if x is divisible by 10 - for every 10px
    a) Store the value of clientx from the mousemove event listener in var x
    b) Compare the value of x to oldx
        If oldx is less than x, .moveRight will be true
        and the catIncrease function will be called
        If oldx is greater than x .moreRight will be false
        and the catIncrease function will be called

9. Each time through the function, oldX will be set to x
    This way I can compare the old and new x values

***********/


var oldX = 0;

function mouseDirection(e) {

    var x = e.clientX;
    
    if ( (x % 10) == 0 ) {
    
        if ( oldX < x ) {
            this.moveRight = true;
            catIncrease();
        } else if ( oldX > x ) {
            this.moveRight = false;
            catIncrease();
        }
        
        oldX = x;
    }
}

/***********

10. Create the carIncrease function
    The counter is set to 0, since the slideshow will always start with 0 in the array
    a) Grab the slideshow image
    b) if .moveRight is true, the counter will increase
    c) if .moveRight is false, the counter will decrease, in order to move backwards in the catImages array
    d) the slideshow image will update each time through the function, using the counter variable

***********/


var counter = 0;

function catIncrease() {
    var catImageMouseover = document.querySelector("#slideshow img");
    
    if (this.moveRight == true) {
        
        if ( counter < catImages.length - 1 ) {
            counter += 1;
        } else {
            counter = 0;
        }
                
    } else if ( this.moveRight == false ) {
        
        if ( counter == 0 ) {
            counter = catImages.length - 1;
        } else {
            counter -= 1;
        }         
    }
    
    catImageMouseover.src = catImages[counter];
}


/***********

11. Reset the image source of the slideshow div onmouseout

***********/

function catReset() {
    this.src = catImages[0];
}



