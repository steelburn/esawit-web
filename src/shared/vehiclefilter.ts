import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filtervehicle'
    //pure: false
})

export class FilterVehicle implements PipeTransform {
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
                        (item.name != null && item.name.match(new RegExp(''+args, 'i')))
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