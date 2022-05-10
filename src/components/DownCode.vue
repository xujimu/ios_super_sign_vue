<template>
    <div>

        <el-card class="box-card" >
            <div>
                <span style="font-size: 15px;color: #333744">生成个数:&nbsp&nbsp</span>
                <el-input v-model="addCount" style="width: 100px;margin-right: 10px" oninput="value=value.replace(/[^0-9]/g,'')"   placeholder="请输入内容" ></el-input>
                <el-button @click="addDownCode" type="primary" plain>立即生成</el-button>
            </div>
        </el-card>
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
                    prop="downCode"
                    label="下载码" >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="useTime"
                    label="使用时间">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    label="操作" >
                <template slot-scope="scope">
                    <el-button  @click="handleClick(scope.row.id)" type="text" size="small">删除</el-button>
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
    </div>
</template>

<script>
    export default {
        created() {
            this.update(this.page,this.count);
        },
        methods: {
            addDownCode(){
                var that = this
                that.$load(1,"处理中")
                this.$http.post('/distribute/addDownCode?num=' + that.addCount)
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
                        that.$message,error("添加失败")
                    });
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
                this.$http.post('/distribute/deleDownCode?id=' + row)
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
                this.$http.get('/distribute/queryAllDownCode?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = []
                            for (let res in response.data.data){
                                var temp = response.data.data[res]
                                if(temp.status === 1){
                                    temp.status = "未使用"
                                }else {
                                    temp.status = "已使用"
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
                addCount: 1
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
