import styles from './.module.css'
import {NEllipsis} from 'naive-ui'

export default function buttonView({rowData, element, searchValue}) {

    const onClick = () => {
        element.buttonCallback && element.buttonCallback(value,rowData,element)
    }
    const value = rowData[element.key];
    if (value) {
        return (
            <div class={styles.table_table_view} onClick={onClick}>
                <NEllipsis lineClamp={1} class={styles.table_table_text_color}>
                    {rowData[element.key]}
                </NEllipsis>
            </div>
        )
    } else {
        return <span>-</span>
    }
}