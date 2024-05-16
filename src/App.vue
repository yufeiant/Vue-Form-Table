<script lang="tsx" setup>
import STable from './components/STable/index.vue'
import {tableColumn} from "@components/STable/types"
import {getFormRules, VALIDATE_KEYS} from './types'
import type {GlobalThemeOverrides,NButton,NConfigProvider,NForm} from "naive-ui"
import {ref,computed} from 'vue'
import {disposeArrayToMap} from "@utils/formTable";
type TItem = {
    age:number|null,
    name:string,
    graduate:1|0,
    school:string|undefined,
    describe:string
}

const formRef = ref();
//表格的数据
const dataRef =  ref<TItem[]>([]);
//表格数据对应的map数据
const dataMapRef = ref(new Map())
//基于map生成的 表单校验的数据
const formRules = computed(() => {
    return getFormRules(dataMapRef.value)
})

const validate = () => {
    return new Promise((resolve, reject) => {
        formRef.value?.validate(async (errors: any) => {
            if (!errors) {
                resolve('success')
            } else {
                reject('error')
                const err = errors[0]
                return {errors, err}
            }
        })
    })
}

const add =()=>{
    const obj:TItem = {age: null, describe: "", graduate: 1, name: "", school:undefined}
    dataRef.value.push(obj)
    dataMapRef.value = disposeArrayToMap(dataRef.value,VALIDATE_KEYS)
}
const columns: Array<tableColumn> = [
    {
        title: "序号",
        key: "id",
        width: 60,
        align: 'center',
        render(rowData, index) {
            return index + 1
        }
    },
    {
        key: "name",
        renderType: 'inputView',
        resizable: true,
        width:200,
        title() {
            return (
                <div>
                    <span style="color:red">*</span>
                    中文名
                </div>
            )
        }
    },
    {
        key: "age",
        renderType: 'inputNumberView',
        resizable: true,
        width:200,
        title() {
            return (
                <div>
                    <span style="color:red">*</span>
                    年龄
                </div>
            )
        }
    },
    {
        key: "graduate",
        renderType: 'switchView',
        title() {
            return (
                <div>
                    <span style="color:red">*</span>
                    是否毕业
                </div>
            )
        }
    },
    {
        key: "school",
        renderType: 'selectView',
        width:200,
        selectOptions:[{label:"清华",value:'1'},{label: "北大",value:'0'}],
        title() {
            return (
                <div>
                    <span style="color:red">*</span>
                    哪个学校
                </div>
            )
        }
    },
    {
        title: "描述",
        key: "describe",
        renderType:'inputView',
        resizable:true,
    },
    {
        title: "操作",
        key: "dispose",
        width: 70,
        render(rowData,index) {
            /**
             * 当点击删除的时候
             * 01-删除选中的数据
             * 02-基于新的值 生成map
             *
             * 数据的保存实际 data和map是同步的 所以我们这里并不需要单独删除map中的数据
             * 直接基于data重新生成就好
             */
            const onClickDelete = () => {
                const array = dataRef.value.filter((item,i)=>i !== index)
                dataRef.value = array;
                dataMapRef.value = disposeArrayToMap(dataRef.value,VALIDATE_KEYS)
            }
            return (
                <NButton style="padding-left: 8px;padding-right: 8px" quaternary type="info"
                         onClick={onClickDelete}>删除</NButton>
            )
        }
    }
];

const formValue = ref({})
const config:GlobalThemeOverrides = {
    Form: {
        feedbackHeightSmall: 0,
        feedbackHeightMedium: 0,
        feedbackHeightLarge: 0
    },
    DataTable: {
        tdPaddingSmall: "4px 8px",
        tdPaddingMedium: "4px 8px",
        tdPaddingLarge: "4px 8px",
    }
};

</script>

<template>
    <div class="table_container">
        <div class="flex_row">
            <NSpace>
                <NButton @click="add" >新增</NButton>
                <NButton @click="validate" type="info">保存</NButton>
            </NSpace>
        </div>
        <NConfigProvider :theme-overrides="config">
            <NForm
                ref="formRef"
                :model="formValue"
                :rules="formRules"
                label-placement="left"
            >
                <STable
                    :columns="columns"
                    :data="dataRef"
                    :map="dataMapRef"
                />
            </NForm>
        </NConfigProvider>
    </div>
</template>
<style scoped>
.table_container{
    width :100%
}
.flex_row {
    display :flex;
    flex-direction: row-reverse;
}
:deep(.n-form-item.n-form-item--top-labelled){
    --n-label-height:0
}
</style>

