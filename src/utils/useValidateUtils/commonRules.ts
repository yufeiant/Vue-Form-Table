import {TValue, TValueLength, TValuePattern, TValueValidate} from "./type";

export const commonRules = {
    //判断是否为空
    isEmpty: ({errMsg}: TValue, value: any) => {
        let isEmptyValue = false;
       
        switch (typeof value){
            case 'string':
                const _value =  value.trim()
                isEmptyValue = _value === null || _value === undefined || _value === ''
                break;
            case 'number':
                isEmptyValue = Number.isNaN(value)    
                break;
            case 'object':
                if (value === null) {
                     isEmptyValue = true;
                } else if (Array.isArray(value)) {
                    isEmptyValue = value.length === 0;
                } else if (value instanceof Date) {
                    isEmptyValue = Number.isNaN(value.getTime());
                } else {
                    isEmptyValue = Object.keys(value).length === 0 && value.convalueuctor === Object;
                }
                break;
            case "undefined":
                isEmptyValue = true;
        }
        if(isEmptyValue){
            return errMsg || "数据不能为空!"
        }
    },
    //最小值
    min: ({errMsg, length}: TValueLength, value: any) => {
        if (value && value.length < length) {
            return errMsg || `数据不能小于最小值 ${length}`
        }
    },
    //最大值
    max: ({errMsg, length}: TValueLength, value: any) => {
        if (value && value.length > length) {
            return errMsg || `数据最多可以输入${length}位`
        }
    },
    //不能用下划线开头,结尾
    isFirstOrLastLine:({errMsg}: TValue, value: any) => {
        if (value.startsWith('_') ) {
            return errMsg || `数据不能以下_开头`
        }
        if (value.endsWith('_') ) {
            return errMsg || `数据不能以下_结尾`
        }
    },
    //用户只能输入 字母
    english: ({errMsg}: TValue, value: any) => {
        if (!(/^[a-zA-Z\s]+$/.test(value))) {
            return errMsg || `数据只能包含英文`
        }
    },
    //用户只能输入 字母,数字和下划线
    enNumberLine: ({errMsg}: TValue, value: any) => {
        if (!(/^[a-zA-Z0-9_\s]+$/.test(value))) {
            return errMsg || `数据只能包含英文、数字和下划线`
        }
    },
    //用户不能输入纯数字
    noNumber:({errMsg}: TValue, value: any)=>{
        if ((/^\d+$/.test(value))) {
            return errMsg || `数据不能由纯数字组成`
        }
    },

    //英文字母开头，只能包含英文、数字和下划线
    aenNumberLine: ({errMsg}: TValue, value: any) => {
        if (!(/^[A-Za-z][A-Za-z0-9_]*$/.test(value))) {
            return errMsg || `英文字母开头，只能包含英文、数字和下划线`
        }
    },
    ae_nNumberLine: ({errMsg}: TValue, value: any) => {
        if (!(/^[A-Za-z][A-Za-z0-9]*$/.test(value))) {
            return errMsg || `英文字母开头，只能包含英文、数字`
        }
    },
    //用户输入中文,字母,数字和下划线
    enCnNumberLine: ({errMsg}: TValue, value: any) => {
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9_\s]+$/.test(value))) {
            return errMsg || `数据只能包含中文、英文、数字和下划线`
        }
    },
    //用户输入中文,字母,数字和下划线
    CnnumberLine: ({errMsg}: TValue, value: any) => {
        if (!(/^[\u4e00-\u9fa50-9_\s]+$/.test(value))) {
            return errMsg || `数据只能包含中文、数字和下划线`
        }
    },
    //正则表达式
    pattern: ({pattern, errMsg}: TValuePattern, value: any) => {
        if (!(pattern.test(value))) {
            return errMsg
        }
    },
    //用户只能输入 + - * / ()
    calculation: ({errMsg}: TValue, value: any) => {

        if (/\(\)/.test(value)){return errMsg || `括号中至少维护一个运算公式`}
        // 错误情况，( 后面是运算符
        if (/\([\+\-\*\/]/.test(value)) {
            return '运算公式配置不正确'
        }
        // 错误情况，) 前面是运算符
        if (/[\+\-\*\/]\)/.test(value)) {
            return '运算公式配置不正确'
        }
        // 错误情况，( 前面不是运算符 或 空
        if (/[^\+\-\*\/\(\s]\(/.test(value)) {
            return '运算公式配置不正确'
        }
        // 错误情况，) 后面不是运算符 或 空
        if (/\)[^\+\-\*\/\)\s]/.test(value)) {
            return '运算公式配置不正确'
        }
        // 错误情况，运算符号不能在首末位
        if (/^[\+\-\*\/.]|[\+\-\*\/.]$/.test(value)) {
            return '运算符号不能在首末位'
        }
        // 错误情况，运算符连续
        if (/[\+\-\*\/]{2,}/.test(value)) {
            return '运算符连续'
        }
        // 错误情况，#{}后面不是 运算符或 ) 或 ''
        if (/#\{.+\}[^\+\-\*\/\)\s]/.test(value)) return '运算公式配置不正确'
        // 错误情况，#{}前面不是 运算符或 ( 或 ''
        if (/[^\+\-\*\/\(\s]#\{.+\}/.test(value)) return '运算公式配置不正确'
    },
    //自定义验证
    validator: ({validate}: TValueValidate, value: any) => {
        return validate?.(value)
    }
}