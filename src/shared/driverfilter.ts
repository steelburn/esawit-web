import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterdriver'
    //pure: false
})

export class FilterDriver implements PipeTransform {
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
                        (item.fullname != null && item.fullname.match(new RegExp(''+args, 'i')))
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