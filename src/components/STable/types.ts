import type {DataTableBaseColumn} from 'naive-ui'
import defaultView from './conponents/defaultView'
import buttonView from './conponents/buttonView'
import inputView from './conponents/form/inputView'
import selectView from './conponents/form/selectView'
import {InternalRowData} from "naive-ui/es/data-table/src/interface"
import switchView from "./conponents/form/switchView"
import inputNumberView from './conponents/form/inputNumberView'

export type renderType =
    "default"
    | "button"
    | 'inputView'
    | 'selectView'
    | 'switchView'
    | 'inputNumberView'

export type tableColumn<T = InternalRowData> = {
    renderType?: renderType,   //用哪个组件渲染
    buttonCallback?: (value: string, rowData: any, element: tableColumn) => void,//按钮的点击回调
    required?: boolean          //是否是必填
    selectOptions?: any         //传入selectOptions
    itemData?: any //传递给子组件的数据
} & DataTableBaseColumn<T>

export interface IProps {
    columns: Array<tableColumn>,
    data: any
}

export const Config = {
    defaultView,
    buttonView,
    //表单输入 input 框
    inputView,
    //表单输入 select 框
    selectView,
    //表单输入 switch 框
    switchView,
    //表单输入 数字输入框
    inputNumberView,
}

export type ICallback = (rowData: any, index: number, element: any, searchValue: string) => any
export type TParam = { page: number, pageSize: number }
export type TOrderItem = {
    ascOrDesc: 'ascend' | 'descend',
    fieldName: string //排序字段
}
export type TOrder = TOrderItem[]

export type renderViewParam = {
    rowData: any,
    index: number,
    element: any,
    map: Map<string, string>
}