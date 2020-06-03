<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-button type="primary">主要按钮</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </el-row>

        <!--<foot></foot>-->
    </div>
</template>
<script>
    import {Grid, GridItem, GroupTitle} from 'vux'
    import Foot from './foot.vue'

    export default{
        components:{
            Grid,
            GridItem,
            GroupTitle,
            Foot
        },
        data(){
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }]
            }
        },
        methods:{
            onItemClick(){
                console.log("ccccc");
            }
        }

    }
</script>

<style scoped lang="scss">
    @import '~styles/main.scss';

    .grid-center {
        display: block;
        text-align: center;
        color: #666;
    }
</style>