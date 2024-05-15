import type {Ref} from "vue";

/**
 * 获取表格纵向轴Y的高度
 * @param reduce 变量调整
 * 通过clientHeight
 */

const defaultReduce = 0;

export const getTableYHeight = (id = "", reduce = defaultReduce) => {
    //浏览器渲染区域高度
    const innerHeight = window.innerHeight;
    //获取表格的元素
    const tableElement =
        (id && document.getElementById(id)) || document.querySelector("table");
    //表格的距离顶部的高度
    const tableTopHeight = tableElement?.getBoundingClientRect().top || 0;
    return innerHeight - tableTopHeight - reduce;
};

/**
 * 在 resize 中添加一个执行的事件
 */
type TCallback = () => void;

export const optimizedResize = (function () {
    type TFun = TCallback[];
    let callbacks: TFun | null = [];
    let running = false;

    // run the actual callbacks
    function runCallbacks() {
        (callbacks as TFun).forEach(function (callback: TCallback) {
            callback();
        });
        running = false;
    }

    // adds callback to loop
    function addCallback(callback: TCallback) {
        if (callback) {
            (callbacks as TFun).push(callback);
        }
    }

    // fired on resize event
    function resize() {
        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }
    }

    return {
        // public method to add additional callback
        add: function (callback: TCallback) {
            if (!(callbacks as TFun).length) {
                window.addEventListener("resize", resize);
            }
            addCallback(callback);
        },
        remove: function () {
            if (!(callbacks as TFun).length) {
                window.removeEventListener("resize", resize);
                callbacks = null;
            }
        },
    };
})();

/**
 * 获取表格的 scroll Y的高度
 * @param reduce 要减去的变量
 */
type TFun = (reduce?: number, id?: string) => Ref

const useTableScrollY: TFun = (reduce = defaultReduce, id = "") => {

    const yHeightRef = ref(0);

    //初始化的时候获取一次table表格的 YHeight
    onMounted(() => {
        //第一次获取
        setTimeout(() => {
            const yHeight = getTableYHeight(id, reduce);
            yHeightRef.value = yHeight
        }, 100);

        //当屏幕的高度发生变化的时候
        optimizedResize.add(() => {
            const yHeight = getTableYHeight(id, reduce);
            yHeightRef.value = yHeight
        });
    })

    onBeforeUnmount(() => {
        optimizedResize.remove();
    })

    return yHeightRef
};
export default useTableScrollY;
