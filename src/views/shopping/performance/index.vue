<template>

  <div>
    <h1>导购业绩报表</h1>

    <el-table v-loading="loading" :data="goodsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" />
      <el-table-column label="参数主键" align="center" prop="orderSn" />
      <el-table-column label="商品名称" align="center" prop="payTime" />
      <el-table-column label="金额" align="center" prop="shippingSn" />
      <el-table-column label="商品描述" align="center" prop="productName" />
      <el-table-column label="商品数量" align="center" prop="orderMoney" />
      <el-table-column label="商品编码" align="center" prop="shippingUser" />

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
  import { findAllList } from "@/api/system/config";
  export default {
  name: "Performance",
    data(){
      return{
        // 遮罩层
        loading: true,
        // 参数表格数据
        goodsList:[],
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 日期范围
        dateRange: [],
        // 总条数
        total: 0,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    methods:{
      getList() {
        this.loading = true;
        findAllList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.goodsList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
        );
      },
    },
    created() {
      this.getList();
    },
  }
</script>

<style>
</style>
