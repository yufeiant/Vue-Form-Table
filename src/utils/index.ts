export const $SEl = async (el: string) => {
    return document.querySelector(el) as HTMLElement
}
export default {
    $SEl
} as {
    $SEl(el: string): any
}

export const getTableYHeight = (reduce: number = 0) => {
    //浏览器渲染区域高度
    const innerHeight = window.innerHeight;
    //获取表格的元素
    const tableElement = document.querySelector("table");
    //表格的距离顶部的高度
    const tableTopHeight = tableElement?.getBoundingClientRect().top || 0;
    return innerHeight - tableTopHeight - reduce;
}

export function isHaveDataArray(array: any) {
    return Array.isArray(array) && array.length > 0;
}

//判断是否为空
export function isEmptyValue(value: any) {
    return (value === null || value === undefined || value === '')
}

//判断是否为空
export function isNotEmptyValue(value: any) {
    return !(value === null || value === undefined || value === '')
}

//column.title + index
export const getKeyIndex=(key,index)=>{
    return key+"_"+index
}

// 去除空children
export const deleteChildren = (arr: any,childrenKey:string = 'childList') => {
    let childs = arr
    for (let i = childs.length; i--; i > 0) {
        if (childs[i][childrenKey]) {
            if (childs[i][childrenKey].length) {
                deleteChildren(childs[i][childrenKey])
            } else {
                delete childs[i][childrenKey]
            }
        }
    }
    return arr
}

//动态计算 字符串 占用的宽度
export function getActualWidthOfChars(text: string, options: any = {}) {
    const {size = 14, family = "Microsoft YaHei"} = options;
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    ctx.font = `${size}px ${family}`;
    const metrics = ctx.measureText(text);
    const actual =
        Math.abs(metrics.actualBoundingBoxLeft) +
        Math.abs(metrics.actualBoundingBoxRight);
    return Math.max(metrics.width, actual);
}

// 获取来源表
// 如果cate = 0, 使用src
// 如果cate = 1, 使用org
// 如果cate = 2, 使用org
export function getTableCode(rowData: any) {
    let value;
    if (rowData.cate === 0) {
        value = rowData.srcTableCode
    } else if (rowData.cate === 1 || rowData.cate === 2) {
        value = rowData.originTableCode
    } else {
        value = '-'
    }
    return value ? value : '-'
}

//获取来源字段
export function getFieldCode(rowData: any) {
    let value;
    if (rowData.cate === 0) {
        value = rowData.srcFieldCode
    } else if (rowData.cate === 1 || rowData.cate === 2) {
        value = rowData.originFieldCode
    } else {
        value = '-'
    }
    return value ? value : '-'
}

//获取来源字段
export function getFieldName(rowData: any) {
    let value;
    if (rowData.cate === 0) {
        value = rowData.srcFieldName
    } else if (rowData.cate === 1 || rowData.cate === 2) {
        value = rowData.originFieldName
    } else {
        value = '-'
    }
    return value ? value : '-'
}