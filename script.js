const container = document.querySelector('.container');

const seats = document.querySelectorAll('.row .seat:not(.occupied)');


const count = document.getElementById('count');

const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//console.log(ticketPrice);


// Save selected movie Index and Count

function setMovieData(movieIndex,moviePrice){

    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMovieProce',moviePrice);
}

// Update Total and count

function updateSelectedCount(){

    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const seatsIndex = [...selectedSeats].map(seat =>{
        return [...seats].indexOf(seat);
    });

    // console.log(seatsIndex);

    // Adding something to the local storage

    localStorage.setItem('name','Brad');

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

    total.innerText = selectedSeatsCount*ticketPrice;
}

// Getting data from UI and populating UI

function populateUI(){

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if(selectedSeats != null && selectedSeats.length>0){

        seats.forEach((seat,index) => {

            if(selectedSeats.indexOf(index)> (-1)){

                seat.classList.add('selected');
            }
        }) 
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex != null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}



// EVENT LISTENERS



// Movie Select Event

movieSelect.addEventListener('change', e=> {

    ticketPrice = +e.target.value;

    // console.log(e.target.selectedIndex,e.target.value);

    setMovieData(e.target.selectedIndex,e.target.value);

    updateSelectedCount();
})

// Seat Clcik Event

container.addEventListener('click', (e) => {
  
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // console.log(e.target);

        e.target.classList.toggle('selected');


        updateSelectedCount();
    }
})

// Initial Count and Total Price
updateSelectedCount();