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
                    label="账号">
            </el-table-column>
            <el-table-column
                    prop="certName"
                    label="证书名">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="签名时间">
            </el-table-column>
            <el-table-column
                    prop="appName"
                    label="app名">
            </el-table-column>
            <el-table-column
                    prop="pageName"
                    label="包名">
            </el-table-column>
            <el-table-column
                    prop="version"
                    label="版本">
            </el-table-column>
            <el-table-column
                label="时间锁">
                <template slot-scope="scope">
                  <div >{{scope.row.isTimeLock === 1 ?'是':'否'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="lockTimeFinish"
                label="到期时间">

            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>


            <el-table-column
                    prop="downUrl"
                    label="操作">
                <template slot-scope="scope">
                    <el-button  v-if="scope.row.downUrl != null" @click="down(scope.row.downUrl)" type="text" size="small">下载Ipa</el-button>
                    <el-button  v-if="scope.row.isTimeLock === 1" @click="updateTime(scope.$index)" type="text" size="small">修改时间锁</el-button>
                </template>
            </el-table-column>

            <el-table-column
                label="编辑">

            </el-table-column>


        </el-table>


      <el-dialog
          title="修改时间"
          :visible.sync="updateTimeDg"
          center
          width="30%">
        <el-date-picker
            v-model="updateTimeV"
            type="datetime"
            placeholder="到期时间"
        >
        </el-date-picker>
        <p></p>
        <el-button @click="updateTimeDg = false">取 消</el-button>
        <el-button type="primary" @click="updateLock()">确 定</el-button>
      </el-dialog>


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
            const user = JSON.parse(window.localStorage.getItem('user'))
            console.log(user)
            if(user.type == 0){
                this.admin = false
            }else {
                this.admin = true
            }
        },
        methods: {
          formatDateTime (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var second = date.getSeconds();
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
          },
            updateLock(){
              console.log("修改时间")
              console.log(this.updateTimeV)

              var that = this

              this.$http.post('/EnterpriseSign/update_time_lock','id=' + this.tableData[this.selectIndex].id + "&lockTimeFinish=" + this.formatDateTime(this.updateTimeV))
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

                  }).finally(function (){
                that.updateTimeDg = false
              });
            },
            updateTime(index){
              console.log("更新" +index)
              this.updateTimeV = new Date(this.tableData[index].lockTimeFinish)
              this.updateTimeDg = true
              this.selectIndex = index;
            },
            down(url){
                console.log(url)
                window.location.href = url
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
                this.$http.get('/EnterpriseSign/queryAccountPack?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = response.data.data
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
                selectIndex: 0,
                tableData: [],
                count: 5,
                page: 1,
                pages: 0,
                total: 1,
                admin:false,
                lockFinishTimes: [],
                updateTimeDg: false,
                updateTimeV: Date()
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
