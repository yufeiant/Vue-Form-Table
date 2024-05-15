import {Ref} from "vue";

type TParam = {
    setLoading?: Function,
    cancelLoading?: Function,
    loading?: Ref,
    time?: number
}

/**
 * 开始以后开始计数  三秒以后才开始loading
 */
export default function useLoading({setLoading, cancelLoading, loading, time = 3000}: TParam) {

    const loadingRef = ref(false);

    const timeout = setTimeout(() => {
        loadingRef.value = true;
        setLoading && setLoading();
        if (loading) {
            loading.value = true;
        }
    }, time);

    const cancel = () => {
        loadingRef.value = false;
        if (timeout) {
            clearTimeout(timeout)
        }
        if (loading) {
            loading.value = false;
        }
        cancelLoading && cancelLoading()
    }
    return {loadingRef, cancel}
}