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
                    prop="appName"
                    label="软件名称">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="打包地址">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="打包状态">
            </el-table-column>
            <el-table-column
                    prop="preview"
                    label="预览地址">
                <template slot-scope="scope">
                    <el-button style="display: block;margin: 0 auto"  @click="copy(scope.row.preview)"  v-if="scope.row.preview"   size="medium" type="primary">复制地址</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="down"
                    label="源码地址">
                <template slot-scope="scope">
                    <el-button style="display: block;margin: 0 auto"   @click="copy(scope.row.down)" v-if="scope.row.down"   size="medium" type="primary">复制地址</el-button>
                </template>
            </el-table-column>


            <el-table-column
                    prop="isVariable"
                    label="更新网址">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.isVariable=='1'?true:false"  @click="updateUrl(scope.row.id,scope.row.url)" >编辑</el-button>
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
                title="更换地址"
                :visible.sync="dialogVisible"
                center
                width="30%">
            <el-input
                    maxlength="100"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入新的网址"
                    v-model="url">
            </el-input>
            <p></p>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUrlPost()">确 定</el-button>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created() {
            this.update(this.page,this.count);
        },
        methods: {
            updateUrl(id,url){
                this.dialogVisible = true
                this.url = url
                this.id = id
            },
            updateUrlPost(){
                var that = this
                this.dialogVisible = false
                this.$http.post('/pack/updateIdUrl?id=' + that.id + "&url=" + that.url)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                            that.$message.success(response.data.message)
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message.error("修改失败")
                    });

            },
            copy(url){
                var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
                oInput.value = url;    //赋值
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display = 'none';
                this.$message.success('复制成功');
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
                this.$http.post('/iis/deleIis?iis=' + row)
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
                this.$http.get('/pack/queryAccountAll?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = []
                            for (let res in response.data.data){
                                var temp = response.data.data[res]
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
                url:"",
                id:""
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
