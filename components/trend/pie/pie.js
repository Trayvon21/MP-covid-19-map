import echarts from '../../../ec-canvas/echarts'
var pieConfirmed = null
var pieSuspected = null
var pieCures = null
var pieDeath = null
// components/trend/pieConfirmed.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pie1: {
      onInit: function (canvas, width, height) {
        pieConfirmed = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(pieConfirmed);
        return pieConfirmed;
      }
    },
    pie2: {
      onInit: function (canvas, width, height) {
        pieSuspected = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(pieSuspected);
        return pieSuspected;
      }
    },
    pie3: {
      onInit: function (canvas, width, height) {
        pieCures = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(pieCures);
        return pieCures;
      }
    },
    pie4: {
      onInit: function (canvas, width, height) {
        pieDeath = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(pieDeath);
        return pieDeath;
      }
    },
    deafult: {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}({d}%)'
      },
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
      series: [{
        label: {
          normal: {
            formatter: '{b}({d}%)',
            fontSize: 12,
            rich: {}
          }
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    },
    allList: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setpieData() {
      // 确诊
      pieConfirmed.setOption(this.data.deafult)
      pieConfirmed.setOption({
        series: {
          data: this.data.allList.pie1
        }
      })

      // 疑似
      pieSuspected.setOption(this.data.deafult)
      pieSuspected.setOption({
        series: {
          data: this.data.allList.pie2
        }
      })

      // 治愈
      pieCures.setOption(this.data.deafult)
      pieCures.setOption({
        series: {
          data: this.data.allList.pie3
        }
      })

      // 死亡
      pieDeath.setOption(this.data.deafult)
      pieDeath.setOption({
        series: {
          data: this.data.allList.pie4
        }
      })
    }

  },
  ready: function () {
    let info = this.properties.data
    let allList = {
      pie1: [{
          name: "湖北",
          value: info.area[0].confirmedCount
        },
        {
          name: "成都",
          value: info.area[10].confirmedCount
        },
        {
          name: "其他",
          value: info.diagnosed - info.area[0].confirmedCount - info.area[10].confirmedCount
        }
      ],
      pie2: [{
          name: "湖北",
          value: info.area[0].suspectedCount
        },
        {
          name: "成都",
          value: info.area[10].suspectedCount
        },
        {
          name: "其他",
          value: info.suspect - info.area[0].suspectedCount - info.area[10].suspectedCount
        }
      ],
      pie3: [{
          name: "湖北",
          value: info.area[0].curedCount
        },
        {
          name: "成都",
          value: info.area[10].curedCount
        },
        {
          name: "其他",
          value: info.cured - info.area[0].curedCount - info.area[10].curedCount
        }
      ],
      pie4: [{
          name: "湖北",
          value: info.area[0].deadCount
        },
        {
          name: "成都",
          value: info.area[10].deadCount
        },
        {
          name: "其他",
          value: info.death - info.area[0].deadCount - info.area[10].deadCount
        }
      ]
    }
    this.setData({
      allList: allList
    })
    setTimeout(() => {
      this.setpieData()
    }, 500)

  },
})