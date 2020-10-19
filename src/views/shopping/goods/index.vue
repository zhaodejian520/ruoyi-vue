<template>
  <div>
  <el-card>


  <div>
    <el-table v-loading="loading" :data="goodsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" align="center" />
      <el-table-column label="参数主键" align="center" prop="productid" />
      <el-table-column label="商品名称" align="center" prop="productname" />
      <el-table-column label="金额" align="center" prop="price" />
      <el-table-column label="商品描述" align="center" prop="descript" />
      <el-table-column label="商品数量" align="center" prop="currentCnt" />
      <el-table-column label="商品编码" align="center" prop="productcore" />
      <el-table-column label="角标数量" align="center" prop="cornerQuantity" />
      <el-table-column label="标签名称" align="center" prop="labelName" />
      <el-table-column label="角标数量" align="center" prop="salesQuantity" />
    </el-table>


    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>





  </el-card>


  </div>
</template>

<script>
 import { findAll } from "@/api/monitor/online";
  // import { findAll } from '@/src/api/shopping/goods'
  export default {
  name: "Goods",
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
     // 多选框选中数据
    handleSelectionChange(selection){
      this.ids = selection.map(item => item.productid)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },

    /** 查询参数列表 */
    getList(){
      console.log("1");
      this.loading = true;
      findAll(this.addDateRange(this.queryParams, this.dateRange)).then(res=>{
          console.log("2");
        this.goodsList = res.rows;
          console.log("3");
        this.total = res.total;
        this.loadin = false;
      })
    }

  },
  components:{

  },
  created(){
    this.getList();
  }

  }
</script>

<style>
</style>
