var btnSave = document.querySelector("#btnSave")
var QuizzRegisters = []

btnSave.addEventListener("click", function (event) {
    event.preventDefault();
    var formQuizzObj = new Object();
    
    // Salva os dados do formulário do quizz
    var formQuizz = document.querySelector("#quizz");

    formQuizzObj.q1 = formQuizz.q1.value
    formQuizzObj.q2 = []
    for(let i = 0; i < formQuizz.q2.length; i++){
        if (formQuizz.q2[i].checked) {
            formQuizzObj.q2[i] = formQuizz.q2[i].value;
        } else continue
    }

    formQuizzObj.q2 = formQuizzObj.q2.filter(function (i) {return i != null})
    formQuizzObj.q3 = formQuizz.q3.value;
    formQuizzObj.currentDate = new Date(Date.now()).toLocaleDateString();
    formQuizzObj.currentTime = new Date(Date.now()).toLocaleTimeString();

    console.log(formQuizzObj.valueOf());


    //Cria o elemento/linha tr
    var quizzSubmit = document.createElement("tr");

    // Cria os elementos/colunas td
    var quizzQ1 = document.createElement("td");
    var quizzQ2 = document.createElement("td");
    var quizzQ3 = document.createElement("td");

    var quizzDate = document.createElement("td");
    var quizzTime = document.createElement("td")

    // Adiciona o conteúdo do form em cada célula
    quizzQ1.textContent = formQuizzObj.q1
    quizzQ2.textContent = formQuizzObj.q2
    quizzQ3.textContent = formQuizzObj.q3
    quizzDate.textContent = formQuizzObj.currentDate
    quizzTime.textContent = formQuizzObj.currentTime

    // Referenciando a tabela pelo id
    var tableQuizz = document.querySelector("#quizzItems").querySelector("tbody")

    // Coloca as células dentro da linha
    quizzSubmit.appendChild(quizzQ1);
    quizzSubmit.appendChild(quizzQ2);
    quizzSubmit.appendChild(quizzQ3);
    quizzSubmit.appendChild(quizzDate);
    quizzSubmit.appendChild(quizzTime);

    tableQuizz.appendChild(quizzSubmit)

    updateNewQuizz(formQuizzObj)
    formQuizzObj = {}
    
})

function updateNewQuizz(currentFormData) {
    QuizzRegisters.push(currentFormData)
    console.log(QuizzRegisters)
}




function guardaFormulario() {
    localStorage.setItem('QuizzRegisters', JSON.stringify(QuizzRegisters));



    var textToWrite = localStorage.getItem('QuizzRegisters')
    var textFileAsBlob = new Blob([textToWrite], {
        type: 'text/plain'
    });
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        //downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}
