import rect0701904220631 from './rects/0701904220631.svg'; //Красный прямоугольник
import rect0701904220632 from './rects/0701904220632.svg'; //Зелёный прямоугольник

export function changeRect(id)
{
    if (id == "0701904220631")
    {
        url = rect0701904220632;
    }else if (id == "0701904220632")
    {
        url = rect0701904220631;
    }

    var url;
    return url;
}