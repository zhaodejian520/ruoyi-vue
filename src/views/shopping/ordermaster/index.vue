<template>
  <div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shopping:ordermaster:export']"
        >导出</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!--<el-table v-loading="loading" :data="masterList" @selection-change="handleSelectionChange">-->
      <!--<el-table-column type="selection" width="55" align="center" />-->
      <!--<el-table-column label="文件id" align="center" prop="orderId" />-->
      <!--<el-table-column label="订单编号" align="center" prop="orderSn" />-->
      <!--<el-table-column label="收货人姓名" align="center" prop="shippingUser" />-->
      <!--<el-table-column label="快递单号" align="center" prop="shippingSn" />-->
      <!--<el-table-column label="订单金额" align="center" prop="orderMoney" />-->
    <!--</el-table>-->

    <!--<pagination-->
      <!--v-show="total>0"-->
      <!--:total="total"-->
      <!--:page.sync="queryParams.pageNum"-->
      <!--:limit.sync="queryParams.pageSize"-->
      <!--@pagination="getList"-->
    <!--/>-->


    <el-table v-loading="loading" :data="categoryList" @selection-change="handleSelectionChangepc">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="分类ID" align="center" prop="categoryId" />
      <el-table-column label="分类名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <router-link :to="'/ordermaster/type/dataMas/' + scope.row.categoryId" class="link-type">
            <span>{{ scope.row.categoryName }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="分类编码" align="center" prop="categoryCode" />
      <el-table-column label="父分类ID" align="center" prop="parentId" />
      <el-table-column label="分类层级" align="center" prop="categoryLevel" />
      <el-table-column label="分类状态" align="center" prop="categoryStatus" />


    </el-table>

    <pagination
      v-show="totalpc>0"
      :total="totalpc"
      :page.sync="queryParamspc.pageNum"
      :limit.sync="queryParamspc.pageSize"
      @pagination="getListpc"
    />




  </div>
</template>

<script>
  import { listInfo, getInfo, exportInfo, listInfoPc, getInfoPc, listInfopi, getInfopi } from "@/api/shopping/ordermaster";

  export default {
    name: "Ordermaster",
    data(){
      return {
        loading: true,
        masterList:[],

        // 显示搜索条件
        showSearch: true,
        total: 0,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          orderId: null,
          orderSn: null,
          shippingUser: null,
          shippingSn: null,
          orderMoney: null,
        },
        // 商品分类的
        idspc: [],
        // 非单个禁用
        singlepc: true,
        // 非多个禁用
        multiplepc: true,
        categoryList:[],
        totalpc: 0,
        queryParamspc: {
          pageNum: 1,
          pageSize: 10
        },


      }
    },
    methods:{





      //商品分类的
      getListpc(){
        this.loading = true;
        listInfoPc(this.queryParamspc).then(res=>{
          this.categoryList = res.rows;
          this.totalpc = res.total;
          this.loading = false;
        })
      },

      handleSelectionChangepc(selection){
        this.idspc = selection.map(item => item.categoryId)
        this.singlepc = selection.length !=1
        this.multiplepc = !selection.length
      },




      // 查询全部数据 订单
      getList(){
        listInfo(this.queryParams).then(res=>{
          this.masterList = res.rows;
          this.total = res.total;
          this.loading = false;
        })
      },
      // 多选框选中
      handleSelectionChange(selection){
        this.ids = selection.map(item => item.orderId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      // 导出按钮
      handleExport() {
        const queryParams = this.queryParams;

        this.$confirm('是否确认导出所有文件信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      },

      reset() {
        this.form = {
          orderId: null,
          orderSn: null,
          shippingUser: null,
          shippingSn: null,
          orderMoney: null,
        };
        // this.resetForm("form");
      },


    },
    created(){
      this.getList();
      this.getListpc();

    }


  }
</script>

<style scoped>

</style>
