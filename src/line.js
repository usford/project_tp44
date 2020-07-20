export default function line(lineChar)
{
    let nameLine = "";
    switch(lineChar)
    {
        case "panelA1":
        {
            nameLine = "Линия A";
            break;
        }
        case "panelB1":
        {
            nameLine = "Линия B";
            break;
        }
        case "panelC1":
        {
            nameLine = "Линия C";
            break;
        }
    }
    let doc = document.getElementById('svgObject').contentDocument;
    doc.getElementById("panelLine").style.display = "block";

    // Настройка панели

    // Название линии
    doc.getElementById("text29-__1").innerHTML = nameLine;

    // Режим управления
    // doc.getElementById("1kn04-002.1").addEventListener('click', (e) => {
    //     doc.getElementById("txtB1-4").innerHTML = "РУЧНОЙ";
    // });

    // doc.getElementById("1kn04-003.1").addEventListener('click', (e) => {
    //     doc.getElementById("txtB1-4").innerHTML = "АВТОМАТ.";
    // });

    // Ручной режим
    // doc.getElementById("1kn04-005.1").addEventListener('click', (e) => {
    //     doc.getElementById("txtC1-4-8").innerHTML = "ВКЛ";
    // });

    // doc.getElementById("1kn04-006.1").addEventListener('click', (e) => {
    //     doc.getElementById("txtC1-4-8").innerHTML = "ВЫКЛ";
    // });
}