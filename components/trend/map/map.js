// components/trend/map/map.js
import pinyin from '../../../lib/pinyin/index'
import echarts from '../../../ec-canvas/echarts'
import api from '../../../http/api';
var mapShow = null
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    area: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    map: {
      onInit: function (canvas, width, height) {
        mapShow = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(mapShow);
        return mapShow;
      }
    },
    position: "全国",
    areaMsg: {},
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openShow() {
      this.setData({
        isShow: true
      })
    },
    selects(e) {
      let areaMsg = this.properties.area.filter(item => {
        item.provinceName === e.currentTarget.dataset.item
      })[0]
      e.currentTarget.dataset.item
      this.setData({
        position: e.currentTarget.dataset.item,
        isShow: false
      })
      this.getMap()
    },
    setMapData() {
      let temp = pinyin.getFullChars(this.data.position).toLowerCase()
      mapShow.setOption({
        tooltip: {
          formatter: '{b}:{c}',
          trigger: 'item',
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            return [pos[0] - 10, pos[1] - 10];
          }
        },
        visualMap: {
          type: 'piecewise',
          left: 0,
          top: 0,
          orient: 'horizontal',
          pieces: [{
              min: 1000,
              label: '>1000'
            },
            {
              min: 500,
              max: 999,
              label: '500-999'
            },
            {
              min: 100,
              max: 499,
              label: '100-499'
            },
            {
              min: 10,
              max: 99,
              label: '10-99'
            },
            {
              min: 1,
              max: 9,
              label: '1-9'
            }
          ]
        },
        series: [{
          type: 'map',
          mapType: temp,
          label: {
            normal: {
              fontSize: 8,
              show: true,
              rich: {}
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#389BB7',
              areaColor: '#fff',
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            },
          },
          animation: false,
          data: this.data.areaMsg
        }],
      })
    },
    getMap() {
      let val = pinyin.getFullChars(this.data.position).toLowerCase()
      let arr = this.properties.area
      let msg = []
      let position = "china"
      console.log(this.data.position);
      console.log(arr);
      if (val !== 'quanguo') {
        arr = arr.filter(item => item.provinceName === this.data.position)[0].cities
        console.log(arr);
        arr.map(item => {
          if (!item.cityName.includes('区') && !item.cityName.includes('市')) {
            item.cityName = item.cityName + "市"
          }
          msg.push({
            value: item.confirmedCount,
            name: item.cityName
          })
        })
        position = 'province/' + pinyin.getFullChars(val).toLowerCase()
      } else {
        arr.map(item => {
          msg.push({
            value: item.confirmedCount,
            name: item.provinceName
          })
        })
      }
      console.log(msg);
      this.setData({
        areaMsg: msg
      })
      api.getMaps(position).then(res => {
        if (res.UTF8Encoding) {
          echarts.registerMap(pinyin.getFullChars(val).toLowerCase(), res);
          this.setMapData()
        }
      })
    }
  },
  ready: function () {
    this.getMap()
  },
})