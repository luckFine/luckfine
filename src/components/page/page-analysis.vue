<style scoped>
.lego{
    width: 100%;
    height: 60px;
    background: rgb(84, 92, 100)
}
.content{
  width: 100%;
  height: 100%;
  position: fixed;
  margin-left: 170px;
}
.add{
  background: rgb(84, 92, 100);
  font-size: 15px;
  height: 30px;
  width: 70px;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  line-height:30px;
  margin:20px;
}
.awit{
    font-size: 40px;
    height: 400px;
    line-height: 400px;
    text-align: center
}
.analysistitle{
  height: 100px;
  margin: 20px;
}
.kcharts{
  width: 100%;margin-top: 50px;
  height:800px;
}
</style>

<template>
<div>
    <div class="lego"></div>
    <page-frame :page='"analysis"'>
      <div class="content" slot="main">
        <!-- <p class="awit">
            静等惊喜~
        </p> -->
        <div class="analysistitle">
          <el-col :span="12">
            查找专题
            <el-autocomplete
              class="inline-input"
              clearable
              v-model="title"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>          
        </div>

        <div class="kcharts" ref="kcharts"></div>
      </div>
    </page-frame>
</div>
</template>

<script>
import pageFrame from './../base/page-frame'
import echarts from 'echarts'
export default { 
  data() {
    return {
      chart:'',
      restaurants: [],
      title: '',
      builderJson:{
          'all': 10887,
          'charts': {
            '2019-6-16': 3237,
            '2019-6-15': 2164,
            '2019-6-14': 7561,
            '2019-6-13': 7778,
            '2019-6-12': 7355,
            '2019-6-11': 2405,
            '2019-6-10': 1842,
            '2019-6-9': 2090,
            '2019-6-8': 1762,
            '2019-6-7': 1593,
            '2019-6-6': 2060,
            '2019-6-5': 1537,
            '2019-6-4': 1908,
            '2019-6-3': 2107,
            '2019-6-2': 1692,
            '2019-6-1': 1568
          },
          'ie': 9743
        },
      downloadJson:{
          '火狐': 17365,
          '谷歌': 4079,
          'IE': 6929,
          'Safair': 14890
        }
    };
  },
  methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "新手引导专题", "address": "长宁区新渔路144号" },
          { "value": "擒龙十九大", "address": "上海市长宁区淞虹路661号" },
          { "value": "不惧暴跌 敢于亮剑", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "涨停特训营", "address": "天山西路438号" },
          { "value": "vip圈子", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "端午节", "address": "上海市长宁区金钟路633号" },
          { "value": "新年大礼包", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "新手大礼包", "address": "上海市普陀区同普路1435号" },
          { "value": "5.1活动专题", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "新手大礼包", "address": "上海市嘉定区新郁路817号" },
          { "value": "搜集手机号", "address": "嘉定区曹安路1611号" }
        ];
      },
      handleSelect(item) {
        // console.log(item);
        this.draw(this.builderJson,this.downloadJson)
      },
      draw(builderJson,downloadJson){
        
        let option = '';
        var waterMarkText = '金融界';

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = 100;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.08;
        ctx.font = '20px Microsoft Yahei';
        ctx.translate(50, 50);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(waterMarkText, 0, 0);
        option={
            backgroundColor: {
                type: 'pattern',
                image: canvas,
                repeat: 'repeat'
            },
            tooltip: {},
            title: [{
                text: '运营数据',
                subtext: '总计 ' + builderJson.all,
                x: '25%',
                textAlign: 'center'
            }, {
                text: '浏览器',
                subtext: '总计 ' + Object.keys(downloadJson).reduce(function (all, key) {
                    return all + downloadJson[key];
                }, 0),
                x: '75%',
                textAlign: 'center'
            }],
            grid: [{
                top: 50,
                width: '50%',
                bottom: '45%',
                left: 10,
                containLabel: true
            }, {
                top: '55%',
                width: '50%',
                bottom: 0,
                left: 10,
                containLabel: true
            }],
            xAxis: [{
                type: 'value',
                max: builderJson.all,
                splitLine: {
                    show: false
                }
            }],
            yAxis: [{
                type: 'category',
                data: Object.keys(builderJson.charts),
                axisLabel: {
                    interval: 0,
                    rotate: 30
                },
                splitLine: {
                    show: false
                }
            }],
            series: [{
                type: 'bar',
                stack: 'chart',
                z: 3,
                label: {
                    normal: {
                        position: 'right',
                        show: true
                    }
                },
                data: Object.keys(builderJson.charts).map(function (key) {
                    return builderJson.charts[key];
                })
            }, {
                type: 'bar',
                stack: 'chart',
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#eee'
                    }
                },
                data: Object.keys(builderJson.charts).map(function (key) {
                    return builderJson.all - builderJson.charts[key];
                })
            }, {
                type: 'pie',
                radius: [0, '30%'],
                center: ['75%', '25%'],
                data: Object.keys(downloadJson).map(function (key) {
                    return {
                        name: key.replace('.js', ''),
                        value: downloadJson[key]
                    }
                })
            }]
          }
          this.chart.setOption(option)
      }
  },
  components:{
      pageFrame
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.chart = echarts.init(this.$refs.kcharts)
    this.draw(this.builderJson,this.downloadJson)

  }
};
</script>

<style scoped>
</style>
