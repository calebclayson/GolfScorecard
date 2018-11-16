var mycourses;
var mycourse;
let currentTeeIndex;
let numplayers = 1;
let p1score = 0;
let p1in = 0;
let p1out = 0;
let p2score = 0;
let p2in = 0;
let p2out = 0;
let p3score = 0;
let p3in = 0;
let p3out = 0;
let p4score = 0;
let p4in = 0;
let p4out = 0;
let totalBoxUp = false;

(function () {
    $.ajax({
        url: 'https://golf-courses-api.herokuapp.com/courses',
        type: 'GET',
        success: response => {
            mycourses = response.courses;
            loadDoc();
        }
    })
})();

function loadDoc() {
    for (let i = 0; i < mycourses.length; i++) {
        $('.courses').append(`<option value="${mycourses[i].id}"> ${mycourses[i].name}</option>`);
    }
}

function loadCourse(courseId) {
    $.ajax({
        url: `https://golf-courses-api.herokuapp.com/courses/${courseId}`,
        type: 'GET',
        success: response => {
            mycourse = response.data;
            displayHoleColumns();
            totalBox();
            
            $('.tees').html('');
            let teeArray = mycourse.holes[0].teeBoxes;
            for (let i = 0; i < teeArray.length; i++) {
                $('.tees').append(`<option value="${i}">${teeArray[i].teeType}</option>`)
            }
        }
    })
    $('.tees').css('display', 'inline');
}

function chooseTee(e) {
    currentTeeIndex = Number(e);
    addHoles();
}

function displayHoleColumns() {
    $('.grid-container').html('');
    for (let i = 0; i < mycourse.holes.length; i++) {
        $('.grid-container').append(`
            <div id="col${i + 1}" class="column"><div class="hole-label">Hole ${i + 1}<div></div>
        `);
    }
}

function addYards() {
    for (let i = 0; i < mycourse.holes.length; i++) {
        $(`#col${i + 1}`).append(`
            <div class="yard-label">${mycourse.holes[i].teeBoxes[currentTeeIndex].yards} yrds</div>
        `);
    }
}

function addPar() {
    for (let i = 0; i < mycourse.holes.length; i++) {
        $(`#col${i + 1}`).append(`
            <div class="par-label">Par is ${mycourse.holes[i].teeBoxes[currentTeeIndex].par}</div>
        `);
    }
}

function addHCP() {
    for (let i = 0; i < mycourse.holes.length; i++) {
        $(`#col${i + 1}`).append(`
            <div class="hcp-label">Handicap ${mycourse.holes[i].teeBoxes[currentTeeIndex].hcp}</div>
        `);
    }
}

function addHoles() {
    for (let p = 1; p <= numplayers; p++) {
        for (let h = 0; h <= mycourse.holes.length; h++) {
            $(`#col${h + 1}`).html('');
        }
    }
    for (let i = 0; i < mycourse.holes.length; i++) {
        $(`#col${i + 1}`).append(`
            <div class="hole-label">Hole ${i + 1}<div>
        `);
    }
    for (let p = 1; p <= numplayers; p++) {
        for (let h = 0; h <= mycourse.holes.length; h++) {
            $(`#col${h + 1}`).append(`
                <label class="player-wrapper">
                    <span class="name${p}">Player ${p}</span><i class="fas fa-pen" onclick="changeName(this)"></i><input onchange="totals(this)" type="text" id="p${p}h${h + 1}"/>
                </label>`);
        }
    }
    for (let h = 0; h <= mycourse.holes.length; h++) {
        $(`#col${h + 1}`).append(`<div>Info</div>`);
    }
    addYards();
    addPar();
    addHCP();
    $('.addPlayer').css('display', 'inline');
}

function addPlayer() {
    if(numplayers < 4) {
        numplayers += 1;
        p1score = 0;
        p2score = 0;
        p3score = 0;
        p4score = 0;
        addHoles();
    }
}

function totalBox() {
    if(!totalBoxUp) {
        let totalBox = `<div class="totals">
        <div class="total-label">Total Score</div>
        <div class="total-par"></div>
        <div class="total-p1"></div>
        <div class="total-p2"></div>
        <div class="total-p3"></div>
        <div class="total-p4"></div>
    </div>`;
    $('.grid-container').append(totalBox);
    totalboxUp = true;
    } else {
        console.log('you thought');
    }
}

function totalBoxUpdate() {
    let pars = [];
    for(let i = 1; i < $('.grid-container').children().length; i++) {
        let par = $(`#col${i}`).find('.par-label').html().charAt(7);
        pars.push(par);
    }
    let totalPar = 0;
    for(let i = 0; i < pars.length; i++){
        totalPar += Number(pars[i]);
    }
    $('.total-par').html(`The total par is ${totalPar}`);
    if(p1score > 0) {
        $('.total-p1').html('');
        $('.total-p1').append(`Player 1 score: in: ${p1in} out: ${p1out} total: ${p1score}`);
    } else {
        $('.total-p1').html('');
    }
    if(p2score > 0) {
        $('.total-p2').html('');
        $('.total-p2').append(`Player 2 score: in: ${p2in} out: ${p2out} total: ${p2score}`);
    } else {
        $('.total-p2').html('');
    }
    if(p3score > 0) {
        $('.total-p3').html('');
        $('.total-p3').append(`Player 3 score: in: ${p3in} out: ${p3out} total: ${p3score}`);
    } else {
        $('.total-p3').html('');    
    }
    if(p4score > 0) {
        $('.total-p4').html('');
        $('.total-p4').append(`Player 4 score: in: ${p4in} out: ${p4out} total: ${p4score}`);
    } else {
        $('.total-p4').html('');
    }
}

function totals(e) {
    console.log($(e).parent().parent().index());
    if($(e).attr('id').charAt(1) == '1') {
        if($(e).parent().parent().index() < mycourse.holes.length/2) {
            p1score += Number($(e).val());
            p1in += Number($(e).val());
        } else {
            p1score += Number($(e).val());
            p1out += Number($(e).val());
        }
    } else if($(e).attr('id').charAt(1) == '2') {
        if($(e).parent().parent().index() < mycourse.holes.length/2) {
            p2score += Number($(e).val());
            p2in += Number($(e).val());
        } else {
            p2score += Number($(e).val());
            p2out += Number($(e).val());
        }
    } else if ($(e).attr('id').charAt(1) == '3') {
        if($(e).parent().parent().index() < mycourse.holes.length/2) {
            p3score += Number($(e).val());
            p3in += Number($(e).val());
        } else {
            p3score += Number($(e).val());
            p3out += Number($(e).val());
        }
    } else if ($(e).attr('id').charAt(1) == '4') {
        if($(e).parent().parent().index() < mycourse.holes.length/2) {
            p4score += Number($(e).val());
            p4in += Number($(e).val());
        } else {
            p4score += Number($(e).val());
            p4out += Number($(e).val());
        }
    } else {
        console.log('an error has occured with scoring');
    }
    totalBoxUpdate();
}

function changeName(e) {
    let newName = prompt('what do you want for your new name?');
    let nameLabel = $(e).parent().find("span");
    $(`.${nameLabel.attr("class")}`).html(newName);
}