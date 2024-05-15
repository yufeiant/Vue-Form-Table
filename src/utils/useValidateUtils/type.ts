// 定义可能的验证规则类型
export type TValueRule = 'isEmpty' | 'enNumberLine' | 'enCnNumberLine' | 'aenNumberLine' | 'CnnumberLine' |'isFirstOrLastLine'|'calculation'|'noNumber';
export type TValueLengthRule = 'min' | 'max';
export type TValuePatternRule = 'pattern';
export type TValueValidateRule = 'validator';

export type TValue = {
    rule: TValueRule,
    errMsg?: string
}
export type TValueLength = {
    rule: TValueLengthRule,
    length: number,
    errMsg?: string
}
export type TValuePattern = {
    rule: TValuePatternRule,
    pattern: RegExp,
    errMsg?: string
}
export type TValueValidate = {
    rule: TValueValidateRule,
    validate: PromiseFunction
    errMsg?: string,
}

//获取我们可以提供的验证规则
export type TParam = TValue | TValueLength | TValuePattern | TValueValidate

export type PromiseFunction<T = any> = (value: any, ...args: any) => Promise<T>;