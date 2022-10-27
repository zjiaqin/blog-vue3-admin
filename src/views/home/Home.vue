<template>
  <div class="home">
    <h2 class="title">数据统计</h2>
    <el-row :gutter="40">
      <el-col
        :lg="6"
        v-for="(item, index) in analysisList"
        :key="item.description"
      >
        <div
          class="panel"
          :class="activeIndex == index ? 'active' : ''"
          @click="activeChange(index)"
        >
          <div
            class="icon"
            :style="{ backgroundColor: activeIndex == index ? item.color : '' }"
          >
            <el-icon
              :style="{ color: activeIndex != index ? item.color : '#fff' }"
              ><component class="icons" :is="item.icon"></component
            ></el-icon>
          </div>
          <div class="info">
            <div class="description">{{ item.description }}</div>
            <count-to
              :style="{ color: item.color }"
              class="num"
              :startVal="0"
              :endVal="item.numTotal"
              :duration="3000"
            ></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="line-panel">
      <div class="header">
        <div class="currrent-date">
          <p>当前日期选择：</p>
          <p class="time-text">
            {{
              dateArr[0] === dateArr[1]
                ? dateArr[0]
                : `${dateArr[0]}至${dateArr[1]}`
            }}
          </p>
        </div>
        <div class="select-data">
          <el-radio-group
            v-model="timeActive"
            size="medium"
            style="margin-right: 40px"
            @change="radioChange"
            v-show="dateArr[0] === dateArr[1]"
          >
            <el-radio-button
              :label="item.value"
              v-for="item in timeArr"
              :key="item.value"
              >{{ item.name }}
            </el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            unlink-panels
            range-separator="至"
            :clearable="false"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled-date="disabledDate"
            @change="timeChange"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="content">
        <el-row>
          <el-col :lg="18">
            <div class="content-charts">
              <h4 class="header-title">
                {{ analysisList[activeIndex].description }}
              </h4>
              <BaseEcharts
                style="width: 100%; height: 400px"
                :option="lineAnalysisOption"
              >
              </BaseEcharts>
            </div>
          </el-col>
          <el-col :lg="6">
            <div class="content-list">
              <div class="rank-header">
                <h4 class="header-title">{{ rankObj.title }}</h4>
              </div>
              <div class="list-rank">
                <p>排名</p>
                <p>{{ rankObj.info }}</p>
                <p>数量</p>
              </div>
              <div class="list-data">
                <el-scrollbar style="height: 100%">
                  <ul>
                    <li :key="item._id" v-for="(item, index) in rankList">
                      <div
                        :class="
                          index < 3 ? 'rank-active rank-index' : 'rank-index'
                        "
                      >
                        {{ index + 1 }}
                      </div>
                      <span>{{ item._id }}</span>
                      <span>{{ item.count }}</span>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CountTo } from 'vue3-count-to'
import BaseEcharts from '@/components/BaseEcharts.vue'
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()
const activeIndex = ref('0')
const activeChange = (index) => {
  if (index != activeIndex.value) {
    activeIndex.value = index
    radioChange()
  }
}
const currentDay = proxy.$utils.currentDay

const dateArr = ref([currentDay('day'), currentDay('day')])
const analysisList = reactive([
  {
    numTotal: 0,
    icon: 'Avatar',
    color: '#40C9C6',
    description: '访客数量'
  },
  {
    numTotal: 0,
    icon: 'UserFilled',
    color: '#FFAA5C',
    description: '用户数量'
  },
  {
    numTotal: 0,
    icon: 'Tickets',
    color: '#38A2F7',
    description: '文章总数'
  },
  {
    numTotal: 0,
    icon: 'ChatDotSquare',
    color: '#8543E0',
    description: '留言总数'
  }
])

// 时间选择
const timeSelect = ref(false)
const timeActive = ref('day')
const timeArr = [
  {
    name: '天',
    value: 'day'
  },
  {
    name: '周',
    value: 'week'
  },
  {
    name: '月',
    value: 'month'
  },
  {
    name: '年',
    value: 'year'
  }
]
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

// 获取总数
const getCountTotal = async () => {
  const data = await proxy.$api.getCountTotal()
  analysisList[0].numTotal = data.accessUserTotal
  analysisList[1].numTotal = data.userTotal
  analysisList[2].numTotal = data.articleTotal
  analysisList[3].numTotal = data.messageTotal
}
onMounted(() => {
  getCountTotal()
  accessLineChart()
  accessRankList()
})
// 折线图echarts
const lineAnalysisOption = reactive({
  grid: {
    left: '2%',
    top: '10%',
    bottom: '3%',
    right: '5%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    padding: [10, 20, 10, 15],
    axisPointer: {
      lineStyle: {
        color: analysisList[activeIndex.value].color,
        width: 2
      }
    },
    formatter: '小时：{b} </br>{a0}：{c0} 人'
  },
  xAxis: {
    show: true,
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#C0C4CC'
      }
    },
    axisLabel: {
      color: '#707378'
    },
    data: []
  },
  yAxis: {
    show: true,
    axisTick: {
      show: false
    },
    minInterval: 1,
    max: function (value) {
      return value.max * 2
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#C0C4CC'
      }
    },
    axisLabel: {
      color: '#707378'
    },
    splitLine: {
      lineStyle: {
        type: 'dotted',
        color: 'rgba(150,150,150,.2)'
      }
    }
  },
  series: [
    {
      name: '访客人数',
      type: 'line',
      symbol: 'circle',
      symbolSize: 5,
      markPoint: {
        data: [{ type: 'max', name: '最大值' }]
      },
      lineStyle: {
        normal: {
          width: 3
        }
      },
      itemStyle: {
        normal: {
          color: analysisList[activeIndex.value].color
        },
        emphasis: {
          borderColor: '#fff',
          borderWidth: 2
        }
      },
      data: []
    }
  ]
})

// 图表数据接口请求
const accessLineChart = () => {
  proxy.$api
    .accessUserCount({
      type: timeSelect.value ? 'timeSelect' : timeActive.value,
      startTime: dateArr.value[0],
      endTime: dateArr.value[1]
    })
    .then((res) => {
      console.log(res)
      chartShow(res)
    })
}
const userLineChart = () => {
  proxy.$api
    .userCount({
      type: timeSelect.value ? 'timeSelect' : timeActive.value,
      startTime: dateArr.value[0],
      endTime: dateArr.value[1]
    })
    .then((res) => {
      chartShow(res)
    })
}
const articleLineChart = () => {
  proxy.$api
    .articleCount({
      type: timeSelect.value ? 'timeSelect' : timeActive.value,
      startTime: dateArr.value[0],
      endTime: dateArr.value[1]
    })
    .then((res) => {
      chartShow(res)
    })
}
const messageLineChart = () => {
  proxy.$api
    .messageCount({
      type: timeSelect.value ? 'timeSelect' : timeActive.value,
      startTime: dateArr.value[0],
      endTime: dateArr.value[1]
    })
    .then((res) => {
      chartShow(res)
    })
}

// 坐标渲染
const chartShow = (res) => {
  let type = timeSelect.value ? 'timeSelect' : timeActive.value
  let timeObj = proxy.$utils.timeDataArr(
    type,
    dateArr.value[0],
    dateArr.value[1]
  )
  let seriesData = timeObj.baseArr
  if (res.length > 0) {
    let dataArr = res
    seriesData.forEach((item) => {
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i]._id === item.name) {
          item.value = dataArr[i].count
          break
        }
      }
    })
  }
  if (seriesData.length > 0) {
    let seriesName = '访客人数'
    let formatter = ''
    let unitName = ''
    if (activeIndex.value === 0) {
      seriesName = '访客人数'
      unitName = '人'
    } else if (activeIndex.value === 1) {
      seriesName = '用户人数'
      unitName = '人'
    } else if (activeIndex.value === 2) {
      seriesName = '文章数量'
      unitName = '篇'
    } else if (activeIndex.value === 3) {
      seriesName = '留言数量'
      unitName = '条'
    }
    if (!timeSelect.value) {
      if (timeActive.value === 'day') {
        formatter =
          `时间：${dateArr.value[0]} </br>` +
          '小时：{b} </br>{a0}：{c0} ' +
          unitName
      } else if (timeActive.value === 'week') {
        formatter = '时间：{b} </br>{a0}：{c0} ' + unitName
      } else if (timeActive.value === 'month') {
        formatter = '时间：{b} </br>{a0}：{c0} ' + unitName
      } else if (timeActive.value === 'year') {
        formatter =
          `年份：${dateArr.value[0].split('-')[0]} </br>` +
          '月份：{b} </br>{a0}：{c0} ' +
          unitName
      }
    } else {
      formatter = '时间：{b} </br>{a0}：{c0} ' + unitName
    }
    lineAnalysisOption.tooltip.formatter = formatter
    lineAnalysisOption.series[0].name = seriesName
  }
  lineAnalysisOption.xAxis.axisLine.show = true
  lineAnalysisOption.xAxis.data = timeObj.xArr
  lineAnalysisOption.tooltip.axisPointer.lineStyle.color =
    analysisList[activeIndex.value].color
  lineAnalysisOption.series[0].itemStyle.normal.color =
    analysisList[activeIndex.value].color
  lineAnalysisOption.series[0].data = seriesData
}

// 排行图
const rankList = ref()
const rankObj = reactive({
  title: '访客访问量排名',
  type: 'day',
  info: '小时'
})
// 时间范围切换
const timeChange = (val) => {
  if (val.length > 0) {
    if (val[0] === val[1]) {
      timeSelect.value = false
      if (timeActive.value === 'day') {
        rankObj.type = 'day'
        rankObj.info = '小时'
      } else if (timeActive.value === 'week') {
        rankObj.type = 'week'
        rankObj.info = '星期'
      } else if (timeActive.value === 'month') {
        rankObj.type = 'week'
        rankObj.info = '星期'
      } else if (timeActive.value === 'year') {
        rankObj.type = 'month'
        rankObj.info = '月份'
      }
    } else {
      timeSelect.value = true
      rankObj.type = 'week'
      rankObj.info = '星期'
    }
    radioChange()
  }
}
// 天周月年时间类型切换
const radioChange = (value) => {
  if (value) {
    if (value === 'day') {
      rankObj.type = 'day'
      rankObj.info = '小时'
    } else if (value === 'week') {
      rankObj.type = 'week'
      rankObj.info = '星期'
    } else if (value === 'month') {
      rankObj.type = 'week'
      rankObj.info = '星期'
    } else if (value === 'year') {
      rankObj.type = 'month'
      rankObj.info = '月份'
    }
  }
  if (activeIndex.value == 0) {
    rankObj.title = '访客访问量排名'
    accessLineChart()
    accessRankList()
  } else if (activeIndex.value == 1) {
    rankObj.title = '用户创建排名'
    userLineChart()
    userRankList()
  } else if (activeIndex.value == 2) {
    rankObj.title = '文章创建排名'
    articleLineChart()
    articleRankList()
  } else if (activeIndex.value == 3) {
    rankObj.title = '留言创建排名'
    messageLineChart()
    messageRankList()
  }
}

// 排名展示
const accessRankList = () => {
  let type = rankObj.type
  proxy.$api
    .accessUserRank({
      type
    })
    .then((data) => {
      let rkList = data
      if (rkList.length > 0 && type === 'week') {
        rkList.forEach((item) => {
          item._id = proxy.$utils.constant.weekArr[parseInt(item._id)]
        })
      }
      rankList.value = rkList
    })
}
const userRankList = () => {
  let type = rankObj.type
  proxy.$api
    .userListRank({
      type
    })
    .then((data) => {
      let rkList = data
      if (rkList.length > 0 && type === 'week') {
        rkList.forEach((item) => {
          item._id = proxy.$utils.constant.weekArr[parseInt(item._id)]
        })
      }
      rankList.value = rkList
    })
}
const articleRankList = () => {
  let type = rankObj.type
  proxy.$api
    .articleRank({
      type
    })
    .then((res) => {
      let rkList = res.data
      if (rkList.length > 0 && type === 'week') {
        rkList.forEach((item) => {
          item._id = proxy.$utils.constant.weekArr[parseInt(item._id)]
        })
      }
      rankList.value = rkList
    })
}
const messageRankList = () => {
  let type = rankObj.type
  proxy.$api
    .messageRank({
      type
    })
    .then((res) => {
      let rkList = res.data
      if (rkList.length > 0 && type === 'week') {
        rkList.forEach((item) => {
          item._id = proxy.$utils.constant.weekArr[parseInt(item._id)]
        })
      }
      rankList.value = rkList
    })
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
}

.title {
  margin-bottom: 30px;
  font-size: 20px;
}

.panel {
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  margin-bottom: 30px;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 16px rgb(0 0 0 / 8%);
  transition: all 0.3s ease-in-out;

  &.active {
    transform: translateY(-6px);
    box-shadow: 0 6px 16px rgb(0 0 0 / 22%);
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 16px rgb(0 0 0 / 22%);
  }

  .icon {
    width: 76px;
    height: 76px;
    border-radius: 8px;

    .el-icon {
      width: 100%;
      height: 100%;
      font-size: 55px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;

    .description {
      font-size: 18px;
    }

    .num {
      font-size: 30px;
    }
  }
}

.line-panel {
  background-color: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 16px rgb(0 0 0 / 8%);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-shadow: 0 3px 0 -2px rgb(0 0 0 / 8%);

    .currrent-date {
      display: flex;
      align-items: center;

      .time-text {
        color: var(--el-color-info-light-3);
      }
    }

    .select-data {
      display: flex;
      align-items: center;
    }
  }

  .header-title {
    font-size: 18px;
  }

  .content {
    padding: 20px;
    margin-top: 20px;
  }

  .content-list {
    .rank-header {
      margin-bottom: 30px;
    }

    .list-rank {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      &:first-child {
        width: 40px;
        height: 20px;
      }
    }

    .list-data {
      height: 350px;
      /* stylelint-disable-next-line selector-class-pattern */
      :deep(.el-scrollbar__wrap) {
        overflow-x: hidden;
      }

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin-top: 30px;

        .rank-index {
          width: 20px;
          height: 20px;
          text-align: center;
          background-color: var(--el-color-info-light-8);
          border-radius: 50%;
          line-height: 20px;
        }

        .rank-active {
          // color: var(--el-color-white);
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
