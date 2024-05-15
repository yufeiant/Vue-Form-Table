import {ECharts} from "echarts";

/**
 * 监听屏幕的变化 触发组件的更新
 */
export default function useEchartsResize(echarts: ECharts) {
    const handleResize = () => {
        echarts && echarts.resize();
    }

    window.addEventListener('resize', handleResize);

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize)
    })
}