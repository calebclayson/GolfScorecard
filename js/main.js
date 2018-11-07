var mycourses;
var mycourse;
let currentTeeIndex;
let numplayers = 1;

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
            <div class="yard-label">Par is ${mycourse.holes[i].teeBoxes[currentTeeIndex].par}</div>
        `);
    }
}

function addHCP() {
    for (let i = 0; i < mycourse.holes.length; i++) {
        $(`#col${i + 1}`).append(`
            <div class="yard-label">Handicap ${mycourse.holes[i].teeBoxes[currentTeeIndex].hcp}</div>
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
            $(`#col${h + 1}`).append(`<label class="player-wrapper"><span class="name${p}">Player ${p}</span><i class="fas fa-pen" onclick="changeName(this)"></i><input type="text" id="p${p}h${h + 1}"/></label>`);
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
    numplayers += 1;
    addHoles();
}

function totals() {

}

function changeName(e) {
    let newName = prompt('what do you want for your new name?');
    let nameLabel = $(e).parent().find("span");
    $(`.${nameLabel.attr("class")}`).html(newName);
}