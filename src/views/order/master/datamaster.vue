<template>
  <div>
    <el-table v-loading="loading" :data="produList" @selection-change="produSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商品ID" align="center" prop="productId" />
      <el-table-column label="商品编码" align="center" prop="productCore" />
      <el-table-column label="商品名称" align="center" prop="productName" />
      <el-table-column label="国条码" align="center" prop="barCode" />
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
  import { listMaster, getMaster, exportMaster, addMaster, updateMaster, delMaster, listSupper, productlist, productlistbyid, selectSuppTypeById } from "@/api/order/master";
    export default {
        name: "Datamaster",
        data(){
          return{
            produList:[],
            loading:true,
            defaultDictType:"",
            // 总条数
            total: 0,
            queryParams:{
              pageNum: 1,
              pageSize: 10,
              typeOptions: [],
              productCore: null,
              productName: null,
              barCode: null,
              supplierName:undefined
            },

            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,

          }
        },

      created(){
        const supplierId = this.$route.params && this.params.supplierId;
        console.log(supplierId);
        this.selectSuppTypeById(supplierId);
        this.getTypeList();

      },
      methods:{
        produSelectionChange(selection){
          this.ids = selection.map(item => item.productId)
          this.single = selection.length !=1
          this.multiple = !selection.length
        },


        /** 查询供应商列表 */
        getTypeList(){
          listSupper().then(response=>{
              this.typeOptions = response.rows;
          })
        },
        /** 查询商品列表 */
       getList(){
          this.loading = true;
          console.log(1);
          productlist(this.queryParams).then(res=>{
            console.log(2);
            this.produList = res.rows;
            this.total = res.total;
            this.loading = false;
          })
        },


        /** 查询商品详细 */
        selectSuppTypeById(supplierId){
          console.log(3);
          selectSuppTypeById(supplierId).then(response=>{
            console.log(4);
              this.queryParams.supplierName = response.data.supplierName;
              this.defaultDictType = response.data.supplierName;
              this.getList();
          })
        },



      }


    }
</script>

<style scoped>

</style>
