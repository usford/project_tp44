
export default function lineC1()
{
    var doc = document.getElementById('svgObject').contentDocument;
    doc.getElementById("panelC1").style.display = "none";

    //Кнопка закрыть на панели с линией C1
    doc.getElementById("btnC1-20").addEventListener('click', (e) => {
        doc.getElementById("panelC1").style.display = "none";
      });
}