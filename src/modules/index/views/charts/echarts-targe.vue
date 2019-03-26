<template>
    <section class="chart-container">
        <el-row style="height: 100%">
            <el-col :span="24">
                <div id="targeChart" style="width:100%; height: 620px;"></div>
            </el-col>

        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { getTargeInfo } from 'api/targe_api';
    import  'echarts/theme/macarons.js';
    import  'echarts/theme/infographic.js';
    import  'echarts/theme/roma.js';
    import  'echarts/theme/shine.js';


    export default {
        data() {
            return {
                targeChart: null,
            }
        },
        mounted: function () {

            const option = {
                title: {
                    text: ''
                },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                legend: {
                    x: "center",
                    show: false,
                    data: ["夫妻", "战友", '亲戚']
                },
                series: [

                    {
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 45,
                        focusNodeAdjacency: true,
                        roam: true,
                        categories: [{
                            name: '夫妻',
                            itemStyle: {
                                normal: {
                                    color: "#009800",
                                }
                            }
                        }, {
                            name: '战友',
                            itemStyle: {
                                normal: {
                                    color: "#4592FF",
                                }
                            }
                        }, {
                            name: '亲戚',
                            itemStyle: {
                                normal: {
                                    color: "#3592F",
                                }
                            }
                        }],
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 12
                                },
                            }
                        },
                        force: {
                            repulsion: 1000
                        },
                        edgeSymbolSize: [4, 50],
                        edgeLabel: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 10
                                },
                                formatter: "{c}"
                            }
                        },
                        data: [{
                            name: '徐贱云',
                            draggable: true,
                        }, {
                            name: '冯可梁',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '邓志荣',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '李荣庆',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '郑志勇',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '赵英杰',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '王承军',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '陈卫东',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '邹劲松',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '赵成',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '陈现忠',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '陶泳',
                            category: 1,
                            draggable: true,
                        }, {
                            name: '王德福',
                            category: 1,
                            draggable: true,
                        }],
                        links: [{
                            source: 0,
                            target: 1,
                            category: 0,
                            value: '夫妻'
                        }, {
                            source: 0,
                            target: 2,
                            value: '子女'
                        }, {
                            source: 0,
                            target: 3,
                            value: '夫妻'
                        }, {
                            source: 0,
                            target: 4,
                            value: '父母'
                        }, {
                            source: 1,
                            target: 2,
                            value: '表亲'
                        }, {
                            source: 0,
                            target: 5,
                            value: '朋友'
                        }, {
                            source: 4,
                            target: 5,
                            value: '朋友'
                        }, {
                            source: 2,
                            target: 8,
                            value: '叔叔'
                        }, {
                            source: 0,
                            target: 12,
                            value: '朋友'
                        }, {
                            source: 6,
                            target: 11,
                            value: '爱人'
                        }, {
                            source: 6,
                            target: 3,
                            value: '朋友'
                        }, {
                            source: 7,
                            target: 5,
                            value: '朋友'
                        }, {
                            source: 9,
                            target: 10,
                            value: '朋友'
                        }, {
                            source: 3,
                            target: 10,
                            value: '朋友'
                        }, {
                            source: 2,
                            target: 11,
                            value: '同学'
                        }],
                        lineStyle: {
                            normal: {
                                opacity: 0.9,
                                width: 1,
                                curveness: 0
                            }
                        }
                    }
                ]
            };

            let para = {
                // pageNo: this.pageNo,
                // pageSize:13,
                // name: this.filters.name
            };
            getTargeInfo(para).then((res) => {

                const sourceMap = {};
                const seriesData = [];

                const seriesLinks = [];

                res.data.forEach(function(value,key){
                    console.log(value);
                    const sourceFlag = sourceMap[value.source]
                    if(!sourceFlag){
                        sourceMap[value.source] = true;
                        seriesData.push({
                            name: value.source,
                            category: 1,
                            draggable: true,
                        });
                    }

                    const targeFlag = sourceMap[value.target];

                    if(!targeFlag){
                        sourceMap[value.target] = true;

                        seriesData.push({
                            name: value.target,
                            // category: 1,
                            draggable: true,
                        });
                    }

                    seriesLinks.push({
                        source: value.source,
                        target: value.target,
                        value: value.relationName
                    });

                });
                debugger

                option.series[0].data = seriesData;
                option.series[0].links = seriesLinks;

                this.targeChart = echarts.init(document.getElementById('targeChart'), 'shine');
                this.targeChart.setOption(option);


            });


        }

    }


</script>

<style scoped>
    .chart-container {
        width: 100%;
        height: 100%;
       /* float: left;*/
    }

    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>