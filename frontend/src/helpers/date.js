import {parse, formatISO, parseISO, format} from 'date-fns';
import { es } from 'date-fns/locale';

export function convertToIso(strDate){
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date());
    // console.log(strDate);
    // console.log(formatISO(newDate));

    return formatISO(newDate)
}

export function isoToString(isoDate){
    const newDate = parseISO(isoDate);
    const formattedDate = format(newDate, 'PPPP', {
        locale: es
    })

    return formattedDate
}