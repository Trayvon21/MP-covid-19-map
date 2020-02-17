import fly from './index'
export default {
    getChart(){
        return fly.get("/api?version=epidemic&appid=26584921&appsecret=E7kpOM2n")
    },
    getMaps(position){
        return fly.get(`https://unpkg.zhimg.com/echarts@3.6.2/map/json/${position}.json`)
    }
}