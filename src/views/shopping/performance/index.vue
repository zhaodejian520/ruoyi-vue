<template>

  <div>
    <h1>导购业绩报表</h1>

   <a-row :gutter="24">
     <a-col :md="24" :sm="24">
       <div style="height:100px; overflow: auto;">


       <a-form-item label="上传附件" style='width: 200px'>
         <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
           <a-button>
             <a-icon type="upload" />上传附件
           </a-button>
         </a-upload>
         <a-button
           type="primary"
           @click="handleUpload"
           :disabled="fileList.length === 0"
           :loading="uploading"
           style="margin-top: 16px"
         >{{uploading ? '正在上传' : '开始上传' }}</a-button>
       </a-form-item>
       </div>
     </a-col>
   </a-row>




  </div>

</template>

<script>
  export default {
  name: "Performance",
    data(){
      return{
          fileList: [],
          uploading: false
      }
    },
    methods:{
      handleRemove(file) {

      },
      beforeUpload(file) {

      },
      handleUpload() {
      
      
      }
    }
  }
</script>

<style>
</style>
