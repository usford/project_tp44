
export default function lineB1()
{
    var doc = document.getElementById('svgObject').contentDocument;
    doc.getElementById("panelB1").style.display = "none";


    //Линия B
    doc.getElementById("btn44-4").addEventListener('click', (e) => {
        var state = (doc.getElementById("txt44-12").innerHTML == "ВКЛ") ? "ВЫКЛ" : "ВКЛ";
        doc.getElementById("txt44-12").innerHTML = state;

        doc.getElementById("panelA1").style.display = "none";
        doc.getElementById("panelB1").style.display = "block";
        doc.getElementById("panelC1").style.display = "none";
        console.log(doc.getElementById("panelB1").style.opacity);
      });

    //Кнопка закрыть на панели с линией B1
    doc.getElementById("btnB1-20").addEventListener('click', (e) => {
        doc.getElementById("panelB1").style.display = "none";
      });
}