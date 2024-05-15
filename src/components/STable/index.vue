<script lang="tsx" setup>
import { Config, tableColumn} from './types'

type TProps = {
    columns: Array<tableColumn>,
    searchValue?: string,
    map?: Map<string, string>,
}

const props = defineProps<TProps>()
const getDisposeColumns = () => {
    return props.columns.map((element: tableColumn) => {
        if (!element.render) {
            element.render = (rowData: any, index: number) => {
                if (element.renderType) {
                    return Config[element.renderType]({ map: props.map, rowData, index, element, searchValue: props.searchValue })
                }
                return Config.defaultView({ rowData, index, element, searchValue: props.searchValue })
            }
        }
        return element;
    });
}
</script>
<template>
    <NDataTable :remote="true"
         :columns="getDisposeColumns()"
         :single-line="true"
         :bordered="false"  flex-height
      >
    </NDataTable>
</template>
