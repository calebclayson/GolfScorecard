let data;
let http = new XMLHttpRequest();

const fetchData = new Promise(
    () => {
        http.open('GET', '../data/test.json');
        http.send();
    }
);

http.onreadystatechange = () => {
    if(http.readyState == XMLHttpRequest.DONE) {
        data = JSON.parse(http.response);
    }
}

function displayDataToPage() {
    displayTees();
    displayHoles();
    displayHandicap();
    displayPar();
    displayYardage();
}

function displayTees() {
    let tees = data.course.tee_types;
    for(let i = 0; i < tees.length; i++) {
        let teeName = tees[i].tee_type;
        let teeOption = `<option value="${teeName}">${teeName}</option>`;
        $('#tees').append(teeOption);
    }
}

let teeIndex = () => {
    if($('#tees').val() === 'pro') {
        return 0;
    }else if ($('#tees').val() === 'champion') {
        return 1;
    }else if($('#tees').val() === 'men') {
        return 2;
    }else if($('#tees').val() === 'women') {
        return 3;
    }
};

function displayHoles() {
    let holes = data.course.holes;
    for(let i = 0; i < holes.length; i++) {
        let holeDiv = `<div class="hole">${holes[i].hole_num}</div>`;
        $('.hole-row').append(holeDiv);
    }
}

function displayHandicap() {
    let holes = data.course.holes;
    for(let i = 0; i < holes.length; i++) {
        let hcp = holes[i].tee_boxes[teeIndex()].hcp;
        let hcpDiv = `<div class="hcp">${hcp}</div>`;
        $('.handicap-row').append(hcpDiv);
    }
}

function displayPar() {
    let holes = data.course.holes;
    for(let i = 0; i < holes.length; i++) {
        let par = holes[i].tee_boxes[teeIndex()].par;
        let parDiv = `<div class="par">${par}</div>`;
        $('.par-row').append(parDiv);
    }
}

function displayYardage() {
    let holes = data.course.holes;
    for(let i = 0; i < holes.length; i++) {
        let yardage = holes[i].tee_boxes[teeIndex()].yards;
        let yardDiv = `<div class="yard">${yardage}</div>`;
        $('.yardage-row').append(yardDiv);
    }
}