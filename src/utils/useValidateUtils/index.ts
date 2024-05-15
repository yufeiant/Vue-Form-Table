import {commonRules} from "./commonRules";
import {PromiseFunction, TParam} from "./type";

/**
 * 使用参考
 * validator: async (rule: FormItemRule, value: string) => {
 *       const {add,validate} = useValidateUtils();
 *       add({ rule:'isEmpty', errMsg:"请输入表英文名"});
 *       add({rule:"enNumberLine"});
 *       add({rule:"validator",validate:()=>{
 *           if (props.schemaOptions.length > 0) {
 *             //如果任务所属名称存在 才会进行检查
 *             return new Promise<void>((resolve, reject) => {
 *               const findNode = props.schemaOptions.find((item: any) => item.value === value)
 *               if (findNode) {
 *                 reject('当前数据库下有重名表!');
 *               } else {
 *                 resolve();
 *               }
 *             })
 *           } else {
 *             return Promise.resolve();
 *           }
 *         }})
 *         return await validate(value);
 *     }
 */

export default function () {
    const cacheRules: Array<TParam> = [];

    const add = (param: TParam) => {
        cacheRules.push(param);
    }
    const validate: PromiseFunction = (value: any) => {
        const promiseResult = new Promise((resolve, reject) => {
            const validationPromises: Promise<string | undefined>[] = [];
            for (const item of cacheRules) {

                if (item.rule === 'validator') {
                    validationPromises.push(commonRules[item.rule](item, value))
                } else {
                    // @ts-ignore
                    const result = commonRules[item.rule](item, value);
                    if (result) {
                        reject(result)
                        return;
                    }
                }
            }
            //如果没有异步验证的promise 那么直接判断成功
            if (validationPromises.length === 0) {
                resolve('')
                return;
            }
            // 所有验证完成后处理结果
            Promise.all(validationPromises)
                .then((results) => {
                    const validationErrors = results.filter((result) => result !== undefined);
                    if (validationErrors.length > 0) {
                        reject(validationErrors[0]);
                    } else {
                        resolve('');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        })
        return promiseResult;
    }
    return {
        cacheRules,
        add,
        validate,
    }
}

