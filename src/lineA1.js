
export default function lineA1()
{
    var doc = document.getElementById('svgObject').contentDocument;
    doc.getElementById("panelA1").style.display = "none";


    //Линия А
    // doc.getElementById("btn44-3").addEventListener('click', (e) => {
    //     //var state = (doc.getElementById("txt44-1").innerHTML == "ВКЛ") ? "ВЫКЛ" : "ВКЛ";
    //     //doc.getElementById("txt44-1").innerHTML = state;

    //     doc.getElementById("panelA1").style.display = "block";
    //     doc.getElementById("panelB1").style.display = "none";
    //     doc.getElementById("panelC1").style.display = "none";
    //   });

    //Кнопка закрыть на панели с линией A1
    doc.getElementById("btnA1-20").addEventListener('click', (e) => {
        doc.getElementById("panelA1").style.display = "none";
      });
}