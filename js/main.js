var w;
function startWorker() {
    if(typeof(Worker) != "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker('./js/worker.js');
            w.onmessage = event => {
                console.log(event.data);
            };
        }
    }
}

startWorker();