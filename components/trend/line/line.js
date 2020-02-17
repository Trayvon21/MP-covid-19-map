import echarts from '../../../ec-canvas/echarts'
// const app = getApp();
var lineConfirmed = null
var lineCures = null
// components/qushi/confirmed/confirmed.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    List: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    line1: {
      onInit: function (canvas, width, height) {
        lineConfirmed = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(lineConfirmed);
        return lineConfirmed;
      }
    },
    line2: {
      onInit: function (canvas, width, height) {
        lineCures = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(lineCures);
        return lineCures;
      }
    },
    //相同的设置
    deafult: {
      color: ["#37A2DA", "#67E0E3"],
      legend: {
        top: 30,
        left: 'center',
        backgroundColor: 'white',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        // confine:true,
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = {
            top: 60
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        }
      },
      //X轴
      xAxis: {
        type: 'category',
        boundaryGap: false,
        nameTextStyle: {
          fontSize: 14
        }
      },
      textStyle: {
        fontSize: 14
      },
      //y轴
      yAxis: {
        x: 'center',
        type: 'value',
        nameTextStyle: {
          fontSize: 14
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      //数据


    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setLineData() { 
      lineCures.setOption(this.data.deafult);
      lineCures.setOption({
        legend: {
          data: ['治愈人数', '死亡人数'],
        },
        xAxis: {
          data: this.properties.List.date,
        },
        series: [{
          name: '治愈人数',
          type: 'line',
          smooth: true,
          data: this.properties.List.curesList
        }, {
          name: '死亡人数',
          type: 'line',
          smooth: true,
          data: this.properties.List.deathsList
        }]
      })
      lineConfirmed.setOption(this.data.deafult);
      lineConfirmed.setOption({
         legend: {
          data: ['确诊人数', '疑似人数'],},
          xAxis: {
            data: this.properties.List.date
          },
          series: [{
            name: '确诊人数',
            type: 'line',
            smooth: true,
            data: this.properties.List.confirmedList
          }, {
            name: '疑似人数',
            type: 'line',
            smooth: true,
            data: this.properties.List.suspectedList
          }]
      })
    },
  },
  ready: function () {
    setTimeout(() => {
      this.setLineData()
      // this.setLineCures()
    }, 500)

  },
})