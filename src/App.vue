<script lang="tsx" setup>
import STable from './components/STable/index.vue'
import {tableColumn} from "@components/STable/types"
import {getFormRules} from './types'
import type {GlobalThemeOverrides,NButton,NConfigProvider,NForm} from "naive-ui"
import {ref,computed} from 'vue'
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
        key: "code",
        renderType: 'inputView',
        width: 250,
        resizable: true,
        fixed: 'left',
        title() {
            return (
                <div>
                    <span style="color:red">*</span>
                    姓名
                </div>
            )
        }
    },
    {
        key: "name",
        renderType: 'inputNumberView',
        width: 250,
        resizable: true,
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
        renderType: 'switchView',
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
        key: "descrip",
        renderType:'inputView',
        resizable:true,
    },
    {
        title: "操作",
        key: "dispose",
        fixed: 'right',
        width: 70,
        render(rowData) {
            /**
             * 当点击删除的时候
             * 01-删除选中的数据
             * 03-删除map中的值
             */
            const onClickDelete = () => {

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

const formRef = ref();
const dataRef =  ref([]);
const dataMapRef = ref(new Map())
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

</script>

<template>
    <div class="table_container">
        <div class="flex_row">
            <NButton @click="validate" type="info">保存</NButton>
            <NButton @click="validate" type="primary">新增</NButton>
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

