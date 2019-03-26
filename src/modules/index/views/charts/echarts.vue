<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="8">
                <div id="chartColumn" style="width:100%; height:320px;"></div>
            </el-col>
            <el-col :span="16">
                <div id="chartBar" style="width:100%; height:320px;"></div>
            </el-col>

        </el-row>
        <el-row>
            <el-col :span="8">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="16">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <!--<el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </el-col>-->
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import axios from 'axios';
    import  'echarts/theme/macarons.js';
    import  'echarts/theme/infographic.js';
    import  'echarts/theme/roma.js';
    import  'echarts/theme/shine.js';


    export default {
        data() {
            return {
                sexScatterChart: null,
                nianLingQuJianFenBuBar: null,
                chartLine: null,
                chartPie: null
            }
        },
        mounted: function () {
            var _this = this;
            //基于准备好的dom，初始化echarts实例
            this.sexScatterChart = echarts.init(document.getElementById('chartColumn'),'shine');
            this.nianLingQuJianFenBuBar = echarts.init(document.getElementById('chartBar'),'shine');
            this.chartLine = echarts.init(document.getElementById('chartLine'),'shine');
            this.chartPie = echarts.init(document.getElementById('chartPie'),'shine');

            /**
             * 男女占比
             * */
            axios.get('http://localhost:8089/echart/get_xingbei_info')
                .then((response) => {
                    let data = response.data;
                    const echartsOption = {
                        title: {
                            text: '2019年全村男女占比',
                            subtext: '截至2019-01',
                            left: '10'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            // orient: 'vertical',
                            x: 'right',
                            bottom: '15',
                            data: ['男', '女']
                        },
                        series: [
                            {
                                name: '男女比例',
                                startAngle: 150,
                                type: 'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                        backgroundColor: '#eee',
                                        borderColor: '#aaa',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        // shadowBlur:3,
                                        // shadowOffsetX: 2,
                                        // shadowOffsetY: 2,
                                        // shadowColor: '#999',
                                        // padding: [0, 7],
                                        rich: {
                                            a: {
                                                color: '#999',
                                                lineHeight: 22,
                                                align: 'center'
                                            },
                                            // abg: {
                                            //     backgroundColor: '#333',
                                            //     width: '100%',
                                            //     align: 'right',
                                            //     height: 22,
                                            //     borderRadius: [4, 4, 0, 0]
                                            // },
                                            hr: {
                                                borderColor: '#aaa',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            b: {
                                                fontSize: 12,
                                                lineHeight: 33
                                            },
                                            per: {
                                                color: '#eee',
                                                backgroundColor: '#334455',
                                                padding: [2, 4],
                                                borderRadius: 2
                                            }
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true
                                    }
                                },
                                data: [
                                    /*{value:335, name:'男'},
                                    {value:310, name:'女'}*/
                                ]
                            }
                        ]
                    }

                    data.forEach(function (child) {
                        const optionChildData = {value: child.sum, name: child.xing_bei}
                        echartsOption.series[0].data.push(optionChildData);
                        echartsOption.legend.data.push(child.xing_bei);
                    });

                    this.sexScatterChart.setOption(echartsOption);
                })
                .catch(function (error) {
                    console.log(error);
                });

            /**
             * 年龄区间人数分布
             */
            axios.get('http://localhost:8089/echart/get_nianling_fenbu')
                .then((response) => {
                    let data = response.data;
                    const echartsOption = {
                        title: {
                            text: '按年龄段人口分布',
                            subtext: ''
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: ['总数', '男', '女']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: [],
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01],
                        },
                        tooltip: {
                            show: true,
                            // formatter:'人口年龄分布<br/>{b}:{c}人'
                        },
                        series: [
                            {
                                name: '总数',
                                type: 'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        /*textBorderColor: '#333',*/
                                        textBorderWidth: 2,
                                        position: 'top',
                                        formatter: '{c}人'
                                    }
                                },
                                data: []
                            },
                            {
                                name: '男',
                                type: 'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        /*textBorderColor: '#333',*/
                                        textBorderWidth: 2,
                                        position: 'top',
                                        formatter: '{c}人'
                                    }
                                },
                                data: []
                            },
                            {
                                name: '女',
                                type: 'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        /*textBorderColor: '#333',*/
                                        textBorderWidth: 2,
                                        position: 'top',
                                        formatter: '{c}人'
                                    }
                                },
                                data: []
                            }
                        ]
                    }

                    const dataZong = data["总"];
                    dataZong.forEach(function (child) {
                        echartsOption.series[0].data.push(child.sum);
                        echartsOption.xAxis.data.push(child.sign);
                    });

                    const dataMan = data["男"];
                    dataMan.forEach(function (child) {
                        echartsOption.series[1].data.push(child.sum);
                    });

                    const dataWomen = data["女"];
                    dataWomen.forEach(function (child) {
                        echartsOption.series[2].data.push(child.sum);
                    });

                    this.nianLingQuJianFenBuBar.setOption(echartsOption);

                })
                .catch(function (error) {
                    console.log(error);
                });

            /**
             * 按人口家庭数
             */
            axios.get('http://localhost:8089/echart/get_jia_ting_shu')
                .then((response) => {
                    let data = response.data;
                    const echartsOption = {
                        title: {
                            text: '深圳月最低生活费组成（单位:元）',
                            subtext: 'From ExcelHome',
                            sublink: 'http://e.weibo.com/1341556070/AjQH99che'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                var tar = params[1];
                                return tar.name + ' : ' + tar.value;
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            splitLine: {show: false},
                            axisLabel: {
                                rotate: 30
                            },
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '辅助',
                                type: 'bar',
                                stack: '总量',
                                itemStyle: {
                                    normal: {
                                        barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                    },
                                    emphasis: {
                                        barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                    }
                                },
                                data: [0, 1700, 1400, 1200, 300, 0]
                            },
                            {
                                name: '生活费',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{c}户'
                                    }
                                },
                                data: [2900, 1200, 300, 200, 900, 300]
                            }
                        ]
                    }

                    const seriesFirDataArr = [];
                    const seriesSedDataArr = [];
                    const xAxisDataArr = [];
                    let zongHuShu = data[0].jia_ting_shu;
                    data.forEach(function (child, index) {

                        const jiaTingShu = child.jia_ting_shu
                        const jiaTingRenShu = child.ren_kou_shu
                        xAxisDataArr.push(jiaTingRenShu);
                        seriesFirDataArr.push(jiaTingShu);
                        if (index == 0) {
                            seriesSedDataArr.push(0);
                        } else {
                            zongHuShu = zongHuShu - jiaTingShu;
                            seriesSedDataArr.push(zongHuShu);
                        }

                    });

                    echartsOption.xAxis.data = xAxisDataArr;
                    echartsOption.series[0].data = seriesSedDataArr;
                    echartsOption.series[1].data = seriesFirDataArr;

                    this.chartLine.setOption(echartsOption);

                })
                .catch(function (error) {
                    console.log(error);
                });


            axios.get('http://localhost:8089/echart/get_ren_kou_shu_an_dui')
                .then((response) => {
                    let dataList = response.data;
                    const option = {
                        xAxis: {
                            type: 'category',
                            data: []
                        },
                        yAxis: {
                            type: 'value',
                            max:400
                        },
                        legend: {},
                        tooltip: {},
                        dataset: {
                            source: [
                                ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                                ['男'],
                                ['女'],
                                /*   ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                                   ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]*/
                            ]
                        },
                        series: [{
                            name: '总人数',
                            data: [],
                            type: 'bar',
                            barWidth: 48,
                            itemStyle: {
                                // color: '#a94442'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c}人'
                                }
                            }

                        }, {
                            type: 'pie',
                            radius: ['30', '50'],
                            label: {
                                show: true,
                                position: 'inside',
                                formatter:function(a,b,c,d){
                                    return a.name + "-" + a.data[a.seriesIndex];
                                }
                            },
                            encode: {
                                itemName: 'product',
                                value: '2012'
                            },
                            center: ['18%', '31%']
                            // No encode specified, by default, it is '2012'.
                        }, {
                            type: 'pie',
                            radius: ['30', '50'],
                            label: {
                                show: true,
                                position: 'inside',
                                formatter:function(a,b,c,d){
                                    return a.name + "-" + a.data[a.seriesIndex];
                                }
                            },
                            center: ['34%', '31%'],
                            encode: {
                                itemName: 'product',
                                value: '2013'
                            }
                        }, {
                            type: 'pie',
                            radius: ['30', '50'],
                            label: {
                                show: true,
                                position: 'inside',
                                formatter:function(a,b,c,d){
                                    return a.name + "-" + a.data[a.seriesIndex];
                                }
                            },
                            center: ['50%', '31%'],
                            encode: {
                                itemName: 'product',
                                value: '2014'
                            }
                        }, {
                            type: 'pie',
                            label: {
                                show: true,
                                position: 'inside',
                                formatter:function(a,b,c,d){
                                    return a.name + "-" + a.data[a.seriesIndex];
                                }
                            },
                            radius: ['30', '50'],
                            center: ['66%', '31%'],
                            encode: {
                                itemName: 'product',
                                value: '2015'
                            }
                        }, {
                            type: 'pie',
                            radius: ['30', '50'],
                            label: {
                                show: true,
                                position: 'inside',
                                formatter:function(a,b,c,d){
                                    return a.name + "-" + a.data[a.seriesIndex];
                                }
                            },
                            center: ['83%', '31%'],
                            encode: {
                                itemName: 'product',
                                value: '2015'
                            }
                        }]
                    };

                    const zongshuList = dataList[0];
                    zongshuList.forEach(function(child){
                        option.xAxis.data.push(child.name);
                        option.series[0].data.push(child.sum);
                    });

                    const nanZongShuList = dataList[1];
                    nanZongShuList.forEach(function(child){
                        // option.xAxis.data.push(child.name);
                        option.dataset.source[1].push(child.sum);
                    });

                    const nvZongShuList = dataList[2];
                    nvZongShuList.forEach(function(child){
                        // option.xAxis.data.push(child.name);
                        option.dataset.source[2].push(child.sum);
                    });


                    this.chartPie.setOption(option);

                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }


</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }

    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>