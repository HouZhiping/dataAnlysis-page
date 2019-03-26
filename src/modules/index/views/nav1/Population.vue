<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getPopulations">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="populations" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="hu_hao" label="户号" width="120" sortable>
            </el-table-column>
            <el-table-column prop="xing_ming" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="min_zu" label="民族" width="100" sortable>
            </el-table-column>
            <el-table-column prop="xing_bei" label="性别" width="100" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="yhzgx" label="与户主关系" width="130" sortable>
            </el-table-column>
            <el-table-column prop="nian_ling" label="年龄" width="100" sortable>
            </el-table-column>
            <el-table-column prop="dian_hua" label="电话" :formatter="formatTel" width="100" sortable>
            </el-table-column>
            <el-table-column prop="csrq" label="出生日期" width="120" sortable>
            </el-table-column>
            <el-table-column prop="sfzh" label="身份证号" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="zhu_zhi" label="地址" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="13" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="95px" :rules="editFormRules" ref="editForm">
                <el-form-item label="户号" prop="hu_hao">
                    <el-input v-model="editForm.hu_hao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="xing_ming">
                    <el-input v-model="editForm.xing_ming" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="民族" prop="min_zu">
                    <el-select v-model="editForm.min_zu" filterable placeholder="请选择">
                        <el-option
                                v-for="item in nationInfo"
                                :key="item.mz_id"
                                :label="item.mzname"
                                :value="item.mzname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.xing_bei">
                        <el-radio class="radio" :label=1>男</el-radio>
                        <el-radio class="radio" :label=0>女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="与户主关系" prop="yhzgx">
                    <el-input v-model="editForm.yhzgx" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="nian_ling">
                    <el-input-number v-model="editForm.nian_ling" :min="0" :max="120"></el-input-number>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.csrq"></el-date-picker>
                </el-form-item>
                <el-form-item label="身份证号" prop="sfzh">
                    <el-input v-model="editForm.sfzh" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="dian_hua">
                    <el-input v-model="editForm.dian_hua" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="zhu_zhi">
                    <el-input type="textarea" v-model="editForm.zhu_zhi"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="95px" :rules="addFormRules" ref="addForm">
                <el-form-item label="户号" prop="hu_hao">
                    <el-input v-model="addForm.hu_hao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="xing_ming">
                    <el-input v-model="addForm.xing_ming" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="民族" prop="min_zu">
                    <el-select v-model="addForm.min_zu" filterable placeholder="请选择">
                        <el-option
                                v-for="item in nationInfo"
                                :key="item.mz_id"
                                :label="item.mzname"
                                :value="item.mzname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.xing_bei">
                        <el-radio class="radio" :label=1>男</el-radio>
                        <el-radio class="radio" :label=0>女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="与户主关系" prop="yhzgx">
                    <el-input v-model="addForm.yhzgx" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="nian_ling">
                    <el-input-number v-model="addForm.nian_ling" :min="0" :max="120"></el-input-number>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.csrq"></el-date-picker>
                </el-form-item>
                <el-form-item label="身份证号" prop="sfzh">
                    <el-input v-model="addForm.sfzh" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="dian_hua">
                    <el-input v-model="addForm.dian_hua" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="zhu_zhi">
                    <el-input type="textarea" v-model="addForm.zhu_zhi"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from 'common/js/util'
    //import NProgress from 'nprogress'
    import { removeUser, batchRemoveUser } from 'api/api';
    import { getPopulationListPage,getNationInfo,addPopulation,getGroupInfo,removePopulation,editPopulation} from 'api/population_api';


    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                populations: [],
                total: 0,
                pageNo: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    hu_hao: [
                        { required: true, message: '请输入户号', trigger: 'blur' }
                    ],
                    xing_ming: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    min_zu:[
                        { required: true, message: '请选择民族', trigger: 'blur' }
                    ],
                    yhzgx:[
                        { required: true, message: '请输入与户主关系', trigger: 'blur' }
                    ],
                },
                //编辑界面数据
                editForm: {
                    hu_hao:'',
                    xing_ming:'',
                    min_zu:'汉族',
                    xing_bei:'',
                    yhzgx:'',
                    nian_ling:0,
                    csrq:'',
                    sfzh:'',
                    zhu_zhi:'龙桥村'
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    hu_hao: [
                        { required: true, message: '请输入户号', trigger: 'blur' }
                    ],
                    xing_ming: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    min_zu:[
                        { required: true, message: '请选择民族', trigger: 'blur' }
                    ],
                    yhzgx:[
                        { required: true, message: '请输入与户主关系', trigger: 'blur' }
                    ],
                },
                //新增界面数据,xing_bei，yhzgx，nian_ling，csrq，sfzh，zhu_zhi
                addForm: {
                    hu_hao:'',
                    xing_ming:'',
                    min_zu:'汉族',
                    xing_bei:'',
                    yhzgx:'',
                    nian_ling:0,
                    csrq:'',
                    sfzh:'',
                    zhu_zhi:'龙桥村'
                },
                //民族信息
                nationInfo:{},

            }
        },
        methods: {
            //获取民族信息
            getNationInfo:function(){
                let para = {
                };
                getNationInfo(para).then((res) => {
                    debugger;
                    this.nationInfo = res.data;
                })
            },
            //性别显示转换
            formatSex: function (row, column) {
                return row.xing_bei == '男' ? '男' : row.xing_bei == '女' ? '女' : '未知';
            },
            //电话号码转换
            formatTel:function(row, column){
                return row.dian_hua?row.dian_hua:'未统计';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getPopulations();
            },
            //获取用户列表
            getPopulations() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize:13,
                    xing_ming: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getPopulationListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.populations = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removePopulation(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getPopulations();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                row.xing_bei=row.xing_bei=='男'?1:0;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    hu_hao:'',
                    xing_ming:'',
                    min_zu:'汉族',
                    xing_bei:1,
                    yhzgx:'',
                    nian_ling:0,
                    dian_hua:'',
                    csrq:'',
                    sfzh:'',
                    zhu_zhi:'龙桥村'
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.csrq = (!para.csrq || para.csrq == '') ? '' : util.formatDate.format(new Date(para.csrq), 'yyyy-MM-dd');
                            debugger;
                            editPopulation(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                const status = res.data.status;
                                if(status == 1){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                }else if(status == 0){
                                    this.$message({
                                        message: '修改失败',
                                        type: 'warning'
                                    });
                                }
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getPopulations();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.csrq = (!para.csrq || para.csrq == '') ? '' : util.formatDate.format(new Date(para.csrq), 'yyyy-MM-dd');
                            addPopulation(para).then((res) => {
                                this.addLoading = false;
                                const status = res.data.status;
                                if(status == 1){
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                }else if(status == 0){
                                    this.$message({
                                        message: '新增失败',
                                        type: 'warning'
                                    });
                                }
                                //NProgress.done();
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getPopulations();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getPopulations();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getPopulations();
            this.getNationInfo();
        }
    }

</script>

<style scoped>

</style>