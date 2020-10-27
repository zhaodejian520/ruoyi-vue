<template>
    <div>
      <el-table v-loading="loading" :data="masterList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="文件id" align="center" prop="orderId" />
      <el-table-column label="订单编号" align="center" prop="orderSn" />
      <el-table-column label="收货人姓名" align="center" prop="shippingUser" />
      <el-table-column label="地址" align="center" prop="address" />
        <el-table-column label="支付方式" align="center" prop="paymentMethod" />
      <el-table-column label="订单金额" align="center" prop="orderMoney" />
        <el-table-column label="发货时间" align="center" prop="shippingTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.shippingTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付时间" align="center" prop="payTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.payTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收货时间" align="center" prop="createTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="productName" />
        <el-table-column label="用户名称" align="center" prop="userName" />
      </el-table>

      <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
      />
    </div>
</template>

<script>
  import { listInfo, getInfo, exportInfo, listInfoPc, getInfoPc, listInfopi, getInfopi, listInfodd, getInfodd, listInfopiTwo } from "@/api/shopping/ordermaster";
    export default {
        name: "dataOrder",
        data(){
          return{
            loading: true,
            masterList:[],
            defaultDictType:"",
            typeOptions: [],
            total: 0,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            queryParams:{
              pageNum: 1,
              pageSize: 10,
              productId: undefined
            }
          }
        },
      created(){
        const productId = this.$route.params && this.$route.params.productId;
        console.log(productId);
        this.getInfopi(productId);
        this.getTypeList();
      },
      methods:{

        getInfopi(productId){
          getInfopi(productId).then(res=>{
            this.queryParams.productId = res.data.productId;
            console.log("********* this.queryParams.productId**********" + this.queryParams.productId);
            this.defaultDictType = res.data.productId;
            console.log("******this.defaultDictType************" + this.defaultDictType);
            this.getList();
          })
        },

        getTypeList(){
          listInfopiTwo().then(res=>{
              this.typeOptions = res.rows;
            console.log("********this.typeOptions***********" + this.typeOptions);
          })
        },

        getList(){
          this.loading = true;
          listInfodd(this.queryParams).then(res=>{
            this.masterList = res.rows;
            console.log("********this.masterList***********" + this.masterList);
            this.total = res.total;
            console.log("********this.total***********" + this.total);
            this.loading = false;
          })
        },

        handleSelectionChange(selection){
          this.ids = selection.map(item => itme.productId)
          this.single = selection.length !=1
          this.multiple = !selection.length
        }


      }



    }
</script>

<style scoped>

</style>
