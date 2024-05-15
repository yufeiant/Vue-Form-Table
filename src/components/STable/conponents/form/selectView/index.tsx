/**
 * select选择框
 */
import {NFormItem,NSelect} from "naive-ui";
import {getKeyIndex} from "@utils";

export default function selectView({rowData, index, element, map}) {
    const key_index = getKeyIndex(element.key, index)
    const onUpdateCallback = element.itemData && element.itemData.onUpdateValue
    const onUpdateValue = (value: string) => {
        rowData[element.key] = value
        map?.set(key_index, value)
        //如果数据更新的时候 需要做一些额外的操作 可以设置 element.itemData.onUpdateValue
        onUpdateCallback && onUpdateCallback({value, rowData, index, element, map, key_index})
    }
    const value = map?.get(key_index)
    const options = typeof element.selectOptions === "function" ? element.selectOptions(rowData, index, element) : element.selectOptions
    return (
        <NFormItem  path={key_index} >
            <NSelect id={key_index} options={options} value={value} onUpdateValue={onUpdateValue} placeholder="请选择" />
        </NFormItem>
    )
}