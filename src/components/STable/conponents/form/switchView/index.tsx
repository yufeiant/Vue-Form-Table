/**
 * switch 选择框
 */
import {getKeyIndex} from "@utils";
import {NFormItem,NSwitch} from 'naive-ui'
export default function switchView({rowData, index, element, map}) {
    const key_index = getKeyIndex(element.key, index)

    const onUpdateValue = (value: boolean) => {
        const isChecked = value ? 1 : 0;
        rowData[element.key] = isChecked
        map?.set(key_index, isChecked)
    }
    let value = map?.get(key_index)
    if (typeof value !== "boolean") {
        value = value === 1
    }
    return (
        <NFormItem path={key_index}>
            <NSwitch id={key_index} value={value} onUpdateValue={onUpdateValue}>
                {{
                    checked: () => '是',
                    unchecked: () => '否'
                }}
            </NSwitch>
        </NFormItem>
    )
}