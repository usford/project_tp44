
export default function lineB1()
{
    var doc = document.getElementById('svgObject').contentDocument;
    doc.getElementById("panelB1").style.display = "none";

    //Кнопка закрыть на панели с линией B1
    doc.getElementById("btnB1-20").addEventListener('click', (e) => {
        doc.getElementById("panelB1").style.display = "none";
      });
}