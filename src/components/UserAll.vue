<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;"
                :header-cell-style="headClass"
                :cell-style="rowClass">
            <el-table-column
                    prop="id"
                    label="id" style="text-align: center">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="账号" >
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码">
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="共有池">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="注册时间">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型">
            </el-table-column>
            <el-table-column
                    label="操作" >
                <template slot-scope="scope">
                    <el-button  @click="handleClick(scope.row.account)" type="text" icon="el-icon-delete" size="small">删除</el-button>
                    <el-button  @click="addPublic(scope.row)" type="text" icon="el-icon-edit" size="small">添加共有池</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                style="text-align: center;margin-top: 20px"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 40, 80, 100]"
                :page-size="count"
                layout="total, sizes, prev, pager, next, jumper"
                :page-count="pages"
                :total="total">
        </el-pagination>

        <el-dialog
                :visible.sync="dialogVisible"
                width="30%">
            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" >
                    <el-input type="account" v-model="current.account" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公有池" >
                    <el-input type="count" v-model="current.count" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="增加/台">
                    <el-input v-model="addCount" oninput="value=value.replace(/[^(\-)0-9]/g,'')"   placeholder="请输入内容" ></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleClick(current.account)">确定</el-button>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created() {
            this.update(this.page,this.count);
        },
        methods: {
            addPublic(row){
                this.dialogVisible = true
                this.current = row
            },
            dialogVisibleClick(account){
                if((parseInt(this.current.count) + parseInt(this.addCount)) >= 0){
                    this.dialogVisible = false
                    var that = this
                    this.$http.post('admin/addUserCount?account=' + account + '&count=' + this.addCount)
                        .then(function (response) {
                            that.$load(0)
                            if(response.data.code == 0){
                                that.update(that.page,that.count);
                                that.$message.success(response.data.message)
                            }else {
                                that.$message.error(response.data.message)
                            }
                    })
                }else {
                    this.$message.error("减量不能超过现有量")
                }
            },
            handleSizeChange(val) {
                console.log("每页数量" + val)
                this.count = val
                this.update(this.page,this.count);
            },
            handleCurrentChange(val) {
                this.page = val
                this.update(this.page,this.count);
                console.log(`当前页: ${val}`);
            },
            handleClick(row) {
                var that = this
                this.$http.post('admin/dele?account=' + row)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("删除失败")
                    });
            },
            update(pageNum,pageSize){
                var that = this
                that.$load(1,"查询中")
                this.$http.get('/admin/queryAll?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = []
                            for (let res in response.data.data){
                                var temp = response.data.data[res]
                                if(temp.type === 1){
                                    temp.type = "管理员"
                                }else {
                                    temp.type = "普通用户"
                                }
                                that.tableData.push(temp)
                            }
                            that.pages = response.data.pages
                            that.total = response.data.total
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("查询失败")
                    });
            },
            headClass() { //表头居中显示
                return "text-align:center"
            },
            rowClass() { //表格数据居中显示
                return "text-align:center"
            }
        },
        data() {
            return {
                tableData: [],
                count: 5,
                page: 1,
                pages: 0,
                total: 1,
                dialogVisible:false,
                addCount: 1,
                current:{}
            }
        }
    }
</script>

<style lang="less" >
    .el-pagination{
        .el-input__inner{
            height: 30px;
        }
    }
</style>
