
export default function lineC1()
{
    var doc = document.getElementById('svgObject').contentDocument;
    doc.getElementById("panelC1").style.display = "none";


    //Линия C
    doc.getElementById("btn44-5").addEventListener('click', (e) => {
        var state = (doc.getElementById("txt44-13").innerHTML == "ВКЛ") ? "ВЫКЛ" : "ВКЛ";
        doc.getElementById("txt44-13").innerHTML = state;

        doc.getElementById("panelA1").style.display = "none";
        doc.getElementById("panelB1").style.display = "none";
        doc.getElementById("panelC1").style.display = "block";
      });

    //Кнопка закрыть на панели с линией C1
    doc.getElementById("btnC1-20").addEventListener('click', (e) => {
        doc.getElementById("panelC1").style.display = "none";
      });
}