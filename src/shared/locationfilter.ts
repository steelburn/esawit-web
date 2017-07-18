import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterlocation'
    //pure: false
})

export class FilterLocation implements PipeTransform {
    transform(items:any[], args:string[]):any[] 
    {
        if (typeof items === 'object') {
            var resultArray = [];
            if (args.length === 0) {
                resultArray = items;
            }

            else {
                for (let item of items) {
                    if
                    (                       
                        (item.registration_no != null && item.registration_no.match(new RegExp(''+args, 'i')))
                    ) 
                    {
                        resultArray.push(item);
                    }
                }
            }

            return resultArray;
        }
        else {
            return null;
        }

    }

}