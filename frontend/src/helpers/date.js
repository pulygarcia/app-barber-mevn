import {parse, formatISO} from 'date-fns';

export function convertToIso(strDate){
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date());
    // console.log(strDate);
    // console.log(formatISO(newDate));

    return formatISO(newDate)
}