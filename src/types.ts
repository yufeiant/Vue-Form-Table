//表单规则
import {FormRules} from "naive-ui"
import useValidateUtils from "@utils/useValidateUtils"
//校验的字段 和 下面的 校验配置要保持同步
//同时会用于生成map的字段 
export const VALIDATE_KEYS = ['age', 'name','graduate','school']

const age = (map:Map<string,string>, key:string) => {
    return {
        required: true,
        trigger: ["blur", "input"],
        type: "string",
        validator: async () => {
            const value = map.get(key)
            const {add, validate} = useValidateUtils();
            add({rule: "isEmpty", errMsg: "请输入年龄"});
            return await validate(value);
        },
    }
}

const name = (map:Map<string,string>, key:string) => {
    return {
        required: true,
        trigger: ["blur", "input"],
        type: "string",
        validator: async () => {
            const value = map.get(key)
            const {add, validate} = useValidateUtils();
            add({rule: "isEmpty", errMsg: "请输入姓名"});
            return await validate(value);
        },
    }
}

//是否毕业
const graduate = (map:Map<string,string>, key:string) => {
    return {
        required: true,
        trigger: ["blur", "input"],
        type: "string",
        validator: async () => {
            const value = map.get(key)
            const {add, validate} = useValidateUtils();
            add({rule: "isEmpty", errMsg: "请选择"});
            return await validate(value);
        },
    }
}

//毕业学校
const school = (map:Map<string,string>, key:string) => {
    return {
        required: true,
        trigger: ["blur", "input"],
        type: "string",
        validator: async () => {
            const value = map.get(key)
            const {add, validate} = useValidateUtils();
            add({rule: "isEmpty", errMsg: "请选择"});
            return await validate(value);
        },
    }
}

const formObj: any = {
    age,
    name,
    graduate,
    school
}

/**
 *
 * 通过遍历map的key值 拿到数组拼接以后存储到map中的key 也就是  key+"_"+index
 * 把key 对应的校验规则函数找到 利用闭包的特性,把key_index传入进去 ,在触发表单校验的时候,可以通过key_index
 * 从 Map 中拿到对应的输入框的值 就可以正确的进行数据校验了
 * @param map
 */
export const getFormRules = (map:Map<string,string>)=>{
    const formRules:FormRules = {}
    for(const [key_index,value] of map){
        const splitKey = key_index.split('_')[0]
        const formItem = formObj[splitKey]
        if(formItem){
            formRules[key_index] = formItem(map,key_index)
        }
    }
    return formRules
}
