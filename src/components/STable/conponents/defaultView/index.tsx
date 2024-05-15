/**
 * 默认数据的展示
 */
import styles from './.module.css'
import {NEllipsis} from 'naive-ui'

export default function defaultView({ rowData, index, element, searchValue }) {
    let value = rowData[element.key] || '-'
    value = value || value === 0 ? value : '-'
    return (
        <NEllipsis lineClamp={1} >
            <span class={styles.text_color}>
               {value}
            </span>
        </NEllipsis>
    )
}