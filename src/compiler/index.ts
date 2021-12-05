
import {parse} from './parse'


export function compiler(template:HTMLTemplate):void{
    const ast = parse(template)
    console.log('ast',ast);
}
