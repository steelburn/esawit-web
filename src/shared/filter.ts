import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterData'
    //pure: false
})

export class FilterData implements PipeTransform {
    transform(items:any[], args:string[]):any[] 
    {
        if (typeof items === 'object') {
            var resultArray = [];
            if (args.length === 0) {
                resultArray = items;
            }

            else {
                for (let item of items) {
                    if(
                        
                        (item.Location != null && item.Location.match(new RegExp(''+args, 'i')))
                        ||
                    (item.bunch_ts != null && item.bunch_ts.match(new RegExp(''+args, 'i')))
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