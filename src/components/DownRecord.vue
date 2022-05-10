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
                    prop="pageName"
                    label="包名" >
            </el-table-column>
            <el-table-column
                    prop="udid"
                    label="设备UDID">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="下载时间">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="下载状态">
            </el-table-column>
            <el-table-column
                    prop="ip"
                    label="IP">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="证书下载">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status === '下载成功'" type="text" @click="downCert(scope.row.id)">证书下载</el-button>
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
            downCert(id){
                console.log(id)
                var that = this
                that.$load(1,"查询中")
                this.$http.get('/distribute/downCert?id=' + id)
                    .then(function (response) {
                        that.$load(0)
                        window.location.href = response.data.url
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("未知失败")
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
            update(pageNum,pageSize){
                var that = this
                that.$load(1,"查询中")
                this.$http.get('/user/queryDown?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = []
                            for (let res in response.data.data){
                                var temp = response.data.data[res]
                                if(temp.status === '点击下载'){
                                    temp.status = "下载成功"
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
                total: 1
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
