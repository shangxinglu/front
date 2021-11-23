
// import {VNode} from 'src/type/vnode'
// import {createVNode} from 'src/core/vdom/vnode'
import {HTMLTemplate} from 'src/type/compiler'

// DOCTYPE标签
const doctypeReg = /^<!DOCTYPE [^>]+>/i

// 开始标签开放正则
const startTagOpenReg = /^<([\w\-]+)/

// 属性正则
const attributeReg = /^[\s]+[(\w\-]+[\s]*=[\s]*\"([^"]*?)\"/

// 开始标签闭合正则
const startTagCloseReg = /^[\s]*>/

// 结束标签
const endTagReg = /^<\/[\w\-]+>/

// 注释
const commentReg = /^<!--[\s\S]*?-->/

// 文本
const textReg = /^[\s\S]*?[^<]/

type MatchType = Array<string>


export function parseHTML(html:HTMLTemplate):void{
    let startIndex:number,endIndex:number,index:number=0
    
    while(html){
        // DOCTYPE标签
        if(doctypeReg.test(html)){
            const match = (html.match(doctypeReg)) as MatchType
            crop(match[0])
           
            
            continue
            
        }

        // 注释
        if(commentReg.test(html)){
            const match = (html.match(commentReg.source)) as MatchType
            crop(match[0])
            continue
        }

        // 开始标签
        if(startTagOpenReg.test(html)){
           const match = (html.match(startTagOpenReg)) as MatchType
             crop(match[0])

             parseTagAttr()
                continue
        }

        // 闭合标签
        if(startTagCloseReg.test(html)){
            const match = (html.match(startTagCloseReg)) as MatchType
            crop(match[0])
            continue
        }

        // 文本
        if(textReg.test(html)){
            const match = (html.match(textReg)) as MatchType
            crop(match[0])
            continue
        }

    }

    // 匹配标签属性
    function parseTagAttr(){
        if(attributeReg.test(html)){
            const match = (html.match(attributeReg)) as MatchType
            crop(match[0])
        }

        parseTagClose()
    }

    // 匹配结束闭合
    function parseTagClose(){
        if(endTagReg.test(html)){
            const match = (html.match(startTagCloseReg)) as MatchType
            crop(match[0])
        }
    }

    
    // 剪裁html中已经匹配的字符串
    function crop(str:string){
        console.log(str);
        
        const len = str.length
        html = html.substring(len)
        startIndex = index
        index+=len
        endIndex = index
    console.log(startIndex,endIndex,index);


    }
}

