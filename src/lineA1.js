
export default function lineA1()
{
    var doc = document.getElementById('svgObject').contentDocument;

    //Кнопка закрыть на панели с линией A1
    doc.getElementById("1kn04-021.1").addEventListener('click', (e) => {
        doc.getElementById("panelLine").style.display = "none";
      });
}