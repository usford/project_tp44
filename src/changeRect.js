import rect0701904220631 from './rects/0701904220631.svg'; //Красный прямоугольник
import rect0701904220632 from './rects/0701904220632.svg'; //Зелёный прямоугольник

import rect0701804220631 from './rects/0701804220631.svg'; //Красный прямоугольник
import rect0701804220632 from './rects/0701804220632.svg'; //Зелёный прямоугольник

import rect0700104220631 from './rects/0700104220631.svg'; //Красный прямоугольник
import rect0700104220632 from './rects/0700104220632.svg'; //Зелёный прямоугольник

import rect0700204220631 from './rects/0700204220631.svg'; //Красный прямоугольник
import rect0700204220632 from './rects/0700204220632.svg'; //Зелёный прямоугольник

import rect0700304220631 from './rects/0700304220631.svg'; //Красный прямоугольник
import rect0700304220632 from './rects/0700304220632.svg'; //Зелёный прямоугольник

import rect0700404220631 from './rects/0700404220631.svg'; //Красный прямоугольник
import rect0700404220633 from './rects/0700404220633.svg'; //Зелёный прямоугольник

import rect0700504220631 from './rects/0700504220631.svg'; //Красный прямоугольник
import rect0700504220632 from './rects/0700504220632.svg'; //Зелёный прямоугольник

import rect0700604220631 from './rects/0700604220631.svg'; //Красный прямоугольник
import rect0700604220632 from './rects/0700604220632.svg'; //Зелёный прямоугольник

import rect0700704220631 from './rects/0700704220631.svg'; //Красный прямоугольник
import rect0700704220632 from './rects/0700704220632.svg'; //Зелёный прямоугольник

import rect0700804220631 from './rects/0700804220631.svg'; //Красный прямоугольник
import rect0700804220633 from './rects/0700804220633.svg'; //Зелёный прямоугольник

import rect0700904220631 from './rects/0700904220631.svg'; //Красный прямоугольник
import rect0700904220633 from './rects/0700904220633.svg'; //Зелёный прямоугольник

import rect0701004220631 from './rects/0701004220631.svg'; //Красный прямоугольник
import rect0701004220633 from './rects/0701004220633.svg'; //Зелёный прямоугольник

import rect0701104220631 from './rects/0701104220631.svg'; //Красный прямоугольник
import rect0701104220632 from './rects/0701104220632.svg'; //Зелёный прямоугольник

import rect0701204220631 from './rects/0701204220631.svg'; //Красный прямоугольник
import rect0701204220632 from './rects/0701204220632.svg'; //Зелёный прямоугольник

import rect0701304220631 from './rects/0701304220631.svg'; //Красный прямоугольник
import rect0701304220632 from './rects/0701304220632.svg'; //Зелёный прямоугольник

import rect0701404220631 from './rects/0701404220631.svg'; //Красный прямоугольник
import rect0701404220632 from './rects/0701404220632.svg'; //Зелёный прямоугольник

import rect0701504220631 from './rects/0701504220631.svg'; //Красный прямоугольник
import rect0701504220632 from './rects/0701504220632.svg'; //Зелёный прямоугольник

import rect0701604220631 from './rects/0701604220631.svg'; //Красный прямоугольник
import rect0701604220632 from './rects/0701604220632.svg'; //Зелёный прямоугольник

import rect0701704220631 from './rects/0701704220631.svg'; //Красный прямоугольник
import rect0701704220632 from './rects/0701704220632.svg'; //Зелёный прямоугольник

import rect0702004220631 from './rects/0702004220631.svg'; //Красный прямоугольник
import rect0702004220632 from './rects/0702004220632.svg'; //Зелёный прямоугольник

import rect0702104220631 from './rects/0702104220631.svg'; //Красный прямоугольник
import rect0702104220632 from './rects/0702104220632.svg'; //Зелёный прямоугольник

import rect0702204220631 from './rects/0702204220631.svg'; //Красный прямоугольник
import rect0702204220632 from './rects/0702204220632.svg'; //Зелёный прямоугольник

const list = [
    rect0701904220631,
    rect0701904220632,
    
    rect0701804220631,
    rect0701804220632,

    rect0700104220631,
    rect0700104220632,

    rect0700204220631,
    rect0700204220632,

    rect0700304220631,
    rect0700304220632,

    rect0700404220631,
    rect0700404220633,

    rect0700504220631,
    rect0700504220632,

    rect0700604220631,
    rect0700604220632,

    rect0700704220631,
    rect0700704220632,

    rect0700804220631,
    rect0700804220633,

    rect0700904220631,
    rect0700904220633,

    rect0701004220631,
    rect0701004220633,

    rect0701104220631,
    rect0701104220632,

    rect0701204220631,
    rect0701204220632,

    rect0701304220631,
    rect0701304220632,

    rect0701404220631,
    rect0701404220632,

    rect0701504220631,
    rect0701504220632,

    rect0701604220631,
    rect0701604220632,

    rect0701704220631,
    rect0701704220632,

    rect0702004220631,
    rect0702004220632,

    rect0702104220631,
    rect0702104220632,

    rect0702204220631,
    rect0702204220632
]

export function changeRect(id, doc)
{
    var url;
    var change = {
        url,
        id
    }

    if (doc.getElementById(id) == null)
    {
        //alert('Не найден');
        var lastSymb = id[id.length-1];
        var truncWord = id.substring(0, id.length - 1);

        if (lastSymb == "1")
        {
            lastSymb = "2";
        }
        var check = false;
        list.forEach((item) => 
        {
            var findID = item.toString().split('/')[3].split('.')[0];
            var transID = truncWord + lastSymb;
            if (findID == transID)
            {
                check = true;
            }
        });

        if (!check) lastSymb = "3";
        list.forEach((item) => 
        {
            var findID = item.toString().split('/')[3].split('.')[0];
            if (findID == id)
            {
                change.url = item;
            }
        });

        change.id = truncWord + lastSymb;
        
    }else
    {
       // alert('Найден');
       change.url = 0;
       change.id = "0";
    }
    // if (id == "0701904220631")
    // {
    //     change.url = rect0701904220631;
    //     change.id = "0701904220632";
    // }else if (id == "0701904220632")
    // {
    //     change.url = rect0701904220632;
    //     change.id = "0701904220631";
    // }

    // if (id == "0701804220631")
    // {
    //     change.url = rect0701804220631;
    //     change.id = "0701804220632";
    // }else if (id == "0701804220632")
    // {
    //     change.url = rect0701804220632;
    //     change.id = "0701804220631";
    // }

    // if (id == "0700104220631")
    // {
    //     change.url = rect0700104220631;
    //     change.id = "0700104220632";
    // }else if (id == "0700104220632")
    // {
    //     change.url = rect0700104220632;
    //     change.id = "0700104220631";
    // }

    // if (id == "0700204220631")
    // {
    //     change.url = rect0700204220631;
    //     change.id = "0700204220632";
    // }else if (id == "0700204220632")
    // {
    //     change.url = rect0700204220632;
    //     change.id = "0700204220631";
    // }

    // if (id == "0700304220631")
    // {
    //     change.url = rect0700304220631;
    //     change.id = "0700304220632";
    // }else if (id == "0700304220632")
    // {
    //     change.url = rect0700304220632;
    //     change.id = "0700304220631";
    // }

    // if (id == "0700404220631")
    // {
    //     change.url = rect0700404220631;
    //     change.id = "0700404220633";
    // }else if (id == "0700404220633")
    // {
    //     change.url = rect0700404220633;
    //     change.id = "0700404220631";
    // }

    // if (id == "0700504220631")
    // {
    //     change.url = rect0700504220631;
    //     change.id = "0700504220632";
    // }else if (id == "0700504220632")
    // {
    //     change.url = rect0700504220632;
    //     change.id = "0700504220631";
    // }

    // if (id == "0700604220631")
    // {
    //     change.url = rect0700604220631;
    //     change.id = "0700604220632";
    // }else if (id == "0700604220632")
    // {
    //     change.url = rect0700604220632;
    //     change.id = "0700604220631";
    // }

    // if (id == "0700704220631")
    // {
    //     change.url = rect0700704220631;
    //     change.id = "0700704220632";
    // }else if (id == "0700704220632")
    // {
    //     change.url = rect0700704220632;
    //     change.id = "0700704220631";
    // }

    // if (id == "0700804220631")
    // {
    //     change.url = rect0700804220631;
    //     change.id = "0700804220633";
    // }else if (id == "0700804220633")
    // {
    //     change.url = rect0700804220633;
    //     change.id = "0700804220631";
    // }

    // if (id == "0700904220631")
    // {
    //     change.url = rect0700904220631;
    //     change.id = "0700904220633";
    // }else if (id == "0700904220633")
    // {
    //     change.url = rect0700904220633;
    //     change.id = "0700904220631";
    // }

    // if (id == "0701004220631")
    // {
    //     change.url = rect0701004220631;
    //     change.id = "0701004220633";
    // }else if (id == "0701004220633")
    // {
    //     change.url = rect0701004220633;
    //     change.id = "0701004220631";
    // }

    // if (id == "0701104220631")
    // {
    //     change.url = rect0701104220631;
    //     change.id = "0701104220632";
    // }else if (id == "0701104220632")
    // {
    //     change.url = rect0701104220632;
    //     change.id = "0701104220631";
    // }

    // if (id == "0701204220631")
    // {
    //     change.url = rect0701204220631;
    //     change.id = "0701204220632";
    // }else if (id == "0701204220632")
    // {
    //     change.url = rect0701204220632;
    //     change.id = "0701204220631";
    // }

    // if (id == "0701304220631")
    // {
    //     change.url = rect0701304220631;
    //     change.id = "0701304220632";
    // }else if (id == "0701304220632")
    // {
    //     change.url = rect0701304220632;
    //     change.id = "0701304220631";
    // }

    // if (id == "0701404220631")
    // {
    //     change.url = rect0701404220631;
    //     change.id = "0701404220632";
    // }else if (id == "0701404220632")
    // {
    //     change.url = rect0701404220632;
    //     change.id = "0701404220631";
    // }

    // if (id == "0701504220631")
    // {
    //     change.url = rect0701504220631;
    //     change.id = "0701504220632";
    // }else if (id == "0701504220632")
    // {
    //     change.url = rect0701504220632;
    //     change.id = "0701504220631";
    // }

    // if (id == "0701604220631")
    // {
    //     change.url = rect0701604220631;
    //     change.id = "0701604220632";
    // }else if (id == "0701604220632")
    // {
    //     change.url = rect0701604220632;
    //     change.id = "0701604220631";
    // }

    // if (id == "0701704220631")
    // {
    //     change.url = rect0701704220631;
    //     change.id = "0701704220632";
    // }else if (id == "0701704220632")
    // {
    //     change.url = rect0701704220632;
    //     change.id = "0701704220631";
    // }

    // if (id == "0702004220631")
    // {
    //     change.url = rect0702004220631;
    //     change.id = "0702004220632";
    // }else if (id == "0702004220632")
    // {
    //     change.url = rect0702004220632;
    //     change.id = "0702004220631";
    // }

    // if (id == "0702104220631")
    // {
    //     change.url = rect0702104220631;
    //     change.id = "0702104220632";
    // }else if (id == "0702104220632")
    // {
    //     change.url = rect0702104220632;
    //     change.id = "0702104220631";
    // }

    // if (id == "0702204220631")
    // {
    //     change.url = rect0702204220631;
    //     change.id = "0702204220632";
    // }else if (id == "0702204220632")
    // {
    //     change.url = rect0702204220632;
    //     change.id = "0702204220631";
    // }
    return change;
}