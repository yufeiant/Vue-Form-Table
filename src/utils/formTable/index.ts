import {getKeyIndex} from "@utils";

/**
 * 用于form 和 table 的场景
 * 把数组的数据都转换到map里面 并不会全部放进去 而是只放需要编辑的字段
 * 因为这个生产的map 会对应的生产出 校验的对象
 * const column = [
 *      {
 *          title:'英文名',
 *          key:'code',
 *          render:'inputView'
 *      },
 *      {
 *          title:'中文名',
 *          key:'name',
 *           render:'inputView'
 *      }
 * ]
 * const data = [
 *      {
 *          code:'dws',
 *          name:'dws'
 *      },
 *      {
 *          code:'dim',
 *          name:'dim'
 *      }
 * ]
 *
 * 数据转换存储------
 * const map = {
 *     code_0:dws,
 *     name_0:dws,
 *     code_1:dim,
 *     name_1:dim
 * }
 *
 * 然后根据 map的 key 生成对应的校验对象
 *
 * @param array 采购的数组
 * @param keys 要拼接的字段
 * @param idKey 传过来自己要设置的key的字段 从数组的 item中取
 * 
 */
export const disposeArrayToMap = (array: any, keys: Array<string>,idKey?:string) => {
    const map = new Map();
    //把数组的数据转换成Map
    array.forEach((item:any, index:number) => {
        keys.forEach(key => {
            const key_index = getKeyIndex(key, index)
            map.set(key_index, item[key])
        })
    })
    return map;
}