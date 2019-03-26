<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.hu_zhu" placeholder="户主姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getFamily">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="families" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="hu_hao" label="户号" width="150" sortable>
            </el-table-column>
            <el-table-column prop="hu_zhu" label="户主姓名" width="150" sortable>
            </el-table-column>
            <el-table-column prop="ren_shu" label="家庭人口数" width="150" sortable>
            </el-table-column>
            <el-table-column prop="wei_du" label="纬度" width="200" sortable>
            </el-table-column>
            <el-table-column prop="jing_du" label="经度" width="200" sortable>
            </el-table-column>
            <el-table-column prop="di_zhi" label="家庭地址" width="300"  sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="户号" prop="hu_hao">
                    <el-input v-model="addForm.hu_hao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="户主姓名" prop="hu_zhu">
                    <el-input v-model="addForm.hu_zhu" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="家庭人数">
                    <el-input-number v-model="addForm.ren_shu" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="纬度" prop="wei_du">
                    <el-input v-model="addForm.wei_du" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="jing_du">
                    <el-input v-model="addForm.jing_du" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                </el-form-item>-->
                <el-form-item label="家庭地址">
                    <el-input type="textarea" v-model="addForm.di_zhi"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="addForm.zhu_jie"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="13" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="户号" prop="hu_hao">
                    <el-input v-model="editForm.hu_hao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="户主姓名" prop="hu_zhu">
                    <el-input v-model="editForm.hu_zhu" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="家庭人数">
                    <el-input-number v-model="editForm.ren_shu" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="纬度" prop="wei_du">
                    <el-input v-model="editForm.wei_du" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="jing_du">
                    <el-input v-model="editForm.jing_du" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                </el-form-item>-->
                <el-form-item label="家庭地址">
                    <el-input type="textarea" v-model="editForm.di_zhi"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="editForm.zhu_jie"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import util from 'common/js/util'
    //import NProgress from 'nprogress'
    import { getFamilyListPage,addFamily,removeFamily,editFamily, getUserListPage, removeUser, batchRemoveFamily, editUser } from 'api/api';

    export default {
        data() {
            return {
                filters: {
                    hu_zhu: ''
                },
                families: [],
                total: 0,
                pageNo: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    hu_hao: '',
                    hu_zhu: '',
                    ren_shu: 0,
                    wei_du: '',
                    jing_du: '',
                    di_zhi:'',
                    zhu_jie:''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    hu_hao: [
                        { required: true, message: '请输入户号', trigger: 'blur' },
                    ],
                    hu_zhu:[
                        { required: true, message: '请输入户住姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    hu_hao: '',
                    hu_zhu: '',
                    ren_shu: 0,
                    wei_du: '',
                    jing_du: '',
                    di_zhi:'',
                    zhu_jie:''
                }

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.xing_bei == '男' ? '男' : row.xing_bei == '女' ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getFamily();
            },
            //获取用户列表
            getFamily() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize:13,
                    hu_zhu: this.filters.hu_zhu
                };
                this.listLoading = true;
                //NProgress.start();
                getFamilyListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.families = res.data.list;
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
                    removeFamily(para).then((res) => {
                        debugger
                        this.listLoading = false;;
                        const status =  res.data.status;
                        if(status == 1){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }else if(status == 1){
                            this.$message({
                                message: '系统错误，删除失败',
                                type: 'warning'
                            });
                        }
                        //NProgress.done();
                        this.getFamily();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    hu_hao: '',
                    hu_zhu: '',
                    ren_shu: 3,
                    wei_du: '',
                    jing_du: '',
                    di_zhi:'',
                    zhu_jie:'无'
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
                            debugger
                            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editFamily(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                debugger
                                const status = res.data.status;
                                if(status == 1){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                }else if(status == 0){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'warning'
                                    });
                                }

                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getFamily();
                            });
                        });
                    }
                });
            },
            //新增家庭
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addFamily(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                const status = res.data.status;
                                if(status == 1){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                }else if(status == 0){
                                    this.$message({
                                        message: '系统错误，提交失败',
                                        type: 'warning'
                                    });
                                }
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getFamily();
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
                console.log(ids);
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveFamily(para).then((res) => {
                        this.listLoading = false;
                        const status = res.data.status;
                        //NProgress.done();
                        if(status == 1){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }else if(status == 0){
                            this.$message({
                                message: '系统错误，删除失败',
                                type: 'warning'
                            });
                        }

                        this.getFamily();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getFamily();
        }
    }

</script>

<style scoped>

</style>