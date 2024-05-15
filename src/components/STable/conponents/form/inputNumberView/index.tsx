/**
 * input 输入框
 */
import {NFormItem, NInputNumber} from "naive-ui";
import {getKeyIndex} from "@utils";
export default function inputNumberView({rowData, index, element, map}) {
    const key_index = getKeyIndex(element.key,index)

    const onUpdateValue = (value:string)=>{
        rowData[element.key] = value
        map?.set(key_index,value)
    }
    const value = map?.get(key_index)
    return (
        <NFormItem  path={key_index} >
            <NInputNumber id={key_index} min={1}  max={100} value={value} onUpdateValue={onUpdateValue} placeholder="请输入" />
        </NFormItem>
    )
}