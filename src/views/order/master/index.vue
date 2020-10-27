<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item>


      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['order:master:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
<div>


    <el-table v-loading="loading" :data="masterList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center" />-->
      <!--<el-table-column label="订单ID" align="center" prop="orderId" />-->
      <!--<el-table-column label="订单编号" align="center" prop="orderSn" />-->
      <!--<el-table-column label="订单金额" align="center" prop="orderMoney" />-->
      <!--<el-table-column label="收货人姓名" align="center" prop="shippingUser" />-->
      <!--<el-table-column label="支付时间" align="center" prop="payTime" width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d}') }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="商品名称" align="center" prop="productName" />-->
      <!--<el-table-column label="用户名" align="center" prop="userName" />-->
      <!--<el-table-column label="支付金额" align="center" prop="paymentMoney" />-->
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="供应商ID" align="center" prop="supplierId" />
      <el-table-column label="供应商编码" align="center" prop="supplierCode" />
      <el-table-column label="供应商名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <router-link :to="'/master/type/datamaster/' + scope.row.supplierId" class="like-type">
            <span>{{scope.row.supplierName}}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="供应商类型：1.自营，2.平台" align="center" prop="supplierType" />
      <el-table-column label="店铺类型：1.物品，2.技术" align="center" prop="supplierTypeform" />

    </el-table>




    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
</div>


    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { listMaster, getMaster, exportMaster, addMaster, updateMaster, delMaster, listSupper, productlist, productlistbyid, selectSuppTypeById } from "@/api/order/master";

export default {
  name: "Master",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 订单主表格数据
      masterList: [],
      // 商品表格数据
      produList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 订单查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderSn: null,
        shippingUser: null,
        orderMoney: null,
        paymentMoney: null,
        payTime: null,
        userName: null,
        productName: null
      },

      // 表单参数
      form: {},
      // 表单校验
      rules: {

      }
    };
  },
  created() {
    this.getList();

  },
  methods: {
    /** 查询订单主列表 */
    getList() {
      this.loading = true;
      listSupper(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.masterList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },




    // 订单多选框选中数据
    handleSelectionChange(selection) {
      // this.$route.push({
      //   path: '/master/type/datamaster/${selection.supplierId}'
      // })
      this.ids = selection.map(item => item.supplierId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },

    // 取消按钮
    cancel() {
      // this.open = false;
      this.reset();
    },


// 表单重置
    reset() {
      this.form = {
        supplierId:undefined,
        orderSn: undefined,
        shippingUser: undefined,
        orderMoney: undefined,
        paymentMoney: undefined,
        payTime: undefined,
        userName: undefined,
        productName: undefined
      };
      this.resetForm("form");
    },




    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有订单主数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMaster(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
