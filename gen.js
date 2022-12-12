async function getData(url) {
    const response = await fetch(url);
  
    return response.json();
  }
  

async function genTest(ID) {
    data = await getData("./questions.json");
    data = data.questions;

    secA = [];
    secB = [];
    secC = [];
    secD = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].section === "a") secA.push(data[i]);
        else if (data[i].section === "b") secB.push(data[i]);
        else if (data[i].section === "c") secC.push(data[i]);
        else secD.push(data[i]);
    } //for

    secA = shuffle(secA,ID);
    secB = shuffle(secB,ID);
    secC = shuffle(secC,ID);
    secD = shuffle(secD,ID);

    console.log(secA);
    console.log(secB);
    console.log(secC);
    console.log(secD);

    curr = new Date();
    due = new Date();
    due.setMinutes(curr.getMinutes() + 180);
    exam = "MATH 2260 Final Exam\nID: " + ID + "\nTimestamp: " + curr + "\n";
    exam += "Due Time: " + due;
    exam += "\n\n---\nSection A:\n\n" + secA[0].question + "\n\n" + secA[1].question;
    exam += "\n\n---\nSection B:\n\n" + secB[0].question + "\n\n" + secB[1].question;
    exam += "\n\n---\nSection C:\n\n" + secC[0].question + "\n\n" + secC[1].question;
    //exam += "\n\nSection D: " + secD[0].question + "\n" + secD[1].question;
    
    var blob = new Blob([exam], {
        type: "text/plain;charset=utf-8",
     });
     
     var blobUrl = URL.createObjectURL(blob);
     var link = document.createElement("a"); // Or maybe get it from the current document
    link.href = blobUrl;
    link.download = "2260ID" + ID;
    link.innerHTML = "Download Your Exam File";
    document.body.appendChild(link); // Or append it whereever you want
     // Create and save the file using the FileWriter library

}

//Credit to Ulf Aslak for modifying Mike Bostock's implementation of the Fisher–Yates algorithm

function shuffle(array, seed) {                
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(random(seed) * m--);       
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed                                    
    }
  
    return array;
  }
  
function random(seed) {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
  }
  