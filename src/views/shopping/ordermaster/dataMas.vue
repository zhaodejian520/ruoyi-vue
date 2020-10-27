<template>
  <div>


    <el-table v-loading="loading" :data="goodsList" @selection-change="handleSelectionChangepi">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="参数主键" align="center" prop="productId" />
      <el-table-column label="商品编号" align="center" prop="productCore" />
      <el-table-column label="商品名称" align="center" prop="productName" >
        <template slot-scope="scope">
          <router-link :to="'/ordermaster/type/dataOrder/' +scope.row.productId" class="link-type">
            <span>{{scope.row.productName}}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="忘了这个" align="center" prop="barCode" />
      <el-table-column label="金额" align="center" prop="price" />

    </el-table>


    <pagination
      v-show="totalpi>0"
      :total="totalpi"
      :page.sync="queryParamspi.pageNum"
      :limit.sync="queryParamspi.pageSize"
      @pagination="getListpi"
    />


  </div>
</template>

<script>
  import { listInfo, getInfo, exportInfo, listInfoPc, getInfoPc, listInfopi, getInfopi } from "@/api/shopping/ordermaster";
    export default {
        name: "DataMas",
      data(){
        return {
          loading: true,
          //商品信息的
          idspi: [],
          // 非单个禁用
          singlepi: true,
          // 非多个禁用
          multiplepi: true,
          goodsList:[],
          defaultDictType: "",
          typeOptions: [],
          totalpi: 0,
          queryParamspi: {
            pageNum: 1,
            pageSize: 10,
            categoryName: undefined,
            categoryId: undefined
          },
        }
      },
      created(){
        const categoryId = this.$route.params && this.$route.params.categoryId;
        this.getInfoPc(categoryId);
        this.getTypeList();
      },
      methods:{
        getInfoPc(categoryId){
          getInfoPc(categoryId).then(res=>{
              this.queryParamspi.categoryId = res.data.categoryId;
              this.defaultDictType = res.data.categoryId;
              this.getListpi();
          })
        },

        getTypeList(){
          listInfoPc().then(res=>{
            this.typeOptions = res.rows;
            console.log("888888888888888888"+this.typeOptions);
          })
        },

        //商品信息的
        getListpi(){
          this.loading = true;
          listInfopi(this.queryParamspi).then(res=>{
            this.goodsList = res.rows;
            this.totalpi = res.total;
            this.loading = false;
          })
        },

        handleSelectionChangepi(selection){
          this.idspi = selection.map(item => item.productId)
          this.singlepi = selection.length !=1
          this.multiplepi = !selection.length
        }
      }


    }
</script>

<style scoped>

</style>
