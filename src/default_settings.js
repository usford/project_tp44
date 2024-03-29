import {clickRect} from './App.js';


const listID = [
    {id: "0701904220631"},
    {id: "0701904220632"},

    {id: "0701804220631"},
    {id: "0701804220632"},

    {id: "0701704220631"},
    {id: "0701704220632"},

    {id: "0700104220631"},
    {id: "0700104220632"},

    {id: "0700204220631"},
    {id: "0700204220632"},

    {id: "0700304220631"},
    {id: "0700304220632"},

    {id: "0700404220631"},
    {id: "0700404220633"},

    {id: "0700504220631"},
    {id: "0700504220632"},

    {id: "0700604220631"},
    {id: "0700604220632"},

    {id: "0700704220631"},
    {id: "0700704220632"},

    {id: "0700804220631"},
    {id: "0700804220633"},

    {id: "0700904220631"},
    {id: "0700904220633"},

    {id: "0701004220631"},
    {id: "0701004220633"},

    {id: "0701104220631"},
    {id: "0701104220632"},

    {id: "0701204220631"},
    {id: "0701204220632"},

    {id: "0701304220631"},
    {id: "0701304220632"},

    {id: "0701404220631"},
    {id: "0701404220632"},

    {id: "0701504220631"},
    {id: "0701504220632"},

    {id: "0701604220631"},
    {id: "0701604220632"},

    {id: "0702004220631"},
    {id: "0702004220632"},

    {id: "0702104220631"},
    {id: "0702104220632"},

    {id: "0702204220631"},
    {id: "0702204220632"},
]

export default function changeAllElements(doc)
{
    var docG = doc.querySelectorAll("g");
    var count = 1;

    for (var item of listID)
    {
        for (var item2 of docG)
        {
            if (item.id == item2.getAttribute("id"))
            {
                //console.log(item.getAttribute("id"));
                //clickRect(item2.id);
                setTimeout(clickRect, count * 100, item.id);
            }
        }
        count++;
    }
}

export function changeElements(doc, list)
{
    var docG = doc.querySelectorAll("g");
    var count = 1;

    for (var item of list.elements)
    {
        setTimeout(clickRect, count * 100, item);
        count++;
        console.log(count);
    }
}