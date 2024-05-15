/**
 * input 输入框
 */
import {NFormItem,NInput} from "naive-ui";
import {getKeyIndex} from "@utils";
export default function inputView({rowData, index, element, map}) {
    const key_index = getKeyIndex(element.key,index)

    const onUpdateValue = (value:string)=>{
        rowData[element.key] = value
        map?.set(key_index,value)
    }
    const value = map?.get(key_index)
    return (
        <NFormItem  path={key_index} >
            <NInput id={key_index} value={value} onUpdateValue={onUpdateValue} placeholder="请输入" />
        </NFormItem>
    )
}