<template>
  <div>
    <div class="accountHead">
      <div class="search">
        <span style="text-align: center; font-size: 14px"> ID </span>
        <el-input
          v-model="searchValue.id"
          placeholder="ID"
          style="width: 150px"
          size="small"
        />
        <span style="text-align: center; font-size: 14px">名字</span>
        <el-input
          v-model="searchValue.name"
          placeholder="名字"
          style="width: 150px"
          size="small"
        />
        <el-button @click="initUsers" size="small" type="primary"
          >查询</el-button
        >
        <el-upload
          action="/user/import"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDataDisabled"
        >
          <el-button
            :disabled="importDataDisabled"
            size="small"
            type="primary"
            >{{ importDataBtnText }}</el-button
          >
        </el-upload>
        <el-button @click="exportData" size="small" type="primary"
          >导出</el-button
        >
      </div>
      <el-button
        @click="showAddUserView"
        style="padding-bottom: 0px"
        type="text"
        size="small"
        >新增</el-button
      >
    </div>
    <div class="accountTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              @click="showUserInfoView(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              @click="showUpdateUserView(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="showDeleteView(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <div>
        <el-form :model="user" ref="userForm">
          <el-row
            type="flex"
            justify="end"
            :style="{ display: idInputVisible }"
          >
            <el-col :span="22">
              <el-form-item label="ID" prop="id">
                <el-input
                  disabled
                  size="medium"
                  style="width: 80%"
                  v-model="user.id"
                  placeholder="请输入用户ID"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col :span="22">
              <el-form-item label="名字" prop="name">
                <el-input
                  size="medium"
                  style="width: 80%"
                  v-model="user.name"
                  placeholder="请输入用户姓名"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col :span="22">
              <el-form-item label="密码" prop="password">
                <el-input
                  size="medium"
                  style="width: 80%"
                  v-model="user.password"
                  placeholder="请输入用户密码"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row justify="end">
            <el-col :span="5" style="height: 40px" />
            <el-col :span="15">
              <el-button
                @click="operateUser"
                type="primary"
                plain
                :disabled="confirmButtonDisable"
                >确 定</el-button
              >
              <el-button @click="dialogVisible = false">取 消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmButtonDisable: false,
      tableData: null,
      dialogVisible: false,
      idInputVisible: "",
      title: "编辑",
      page: 1,
      size: 5,
      total: 0,
      opt: "",
      user: {
        id: null,
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
      searchValue: {
        id: null,
        name: null,
      },
      importDataBtnText: "导入",
      importDataDisabled: false,
    };
  },
  mounted() {
    this.initUsers();
  },
  methods: {
    emptyUser() {
      this.user = {
        id: null,
        name: "",
        password: "",
      };
    },
    showUserInfoView(row) {
      this.idInputVisible = "";
      this.title = "查看";
      this.confirmButtonDisable = true;
      this.user = row;
      this.dialogVisible = true;
    },
    showAddUserView() {
      this.idInputVisible = "none";
      this.title = "添加";
      this.confirmButtonDisable = false;
      this.emptyUser;
      this.dialogVisible = true;
      this.opt = "add";
    },
    showUpdateUserView(row) {
      this.idInputVisible = "";
      this.title = "修改";
      this.confirmButtonDisable = false;
      this.emptyUser;
      this.dialogVisible = true;
      this.user = row;
      this.opt = "update";
    },
    showDeleteView(row) {
      this.idInputVisible = "";
      this.title = "删除";
      this.confirmButtonDisable = false;
      this.emptyUser;
      this.dialogVisible = true;
      this.user = row;
      this.opt = "delete";
    },
    sizeChange(currentSize) {
      this.size = currentSize;
      this.initUsers();
    },
    currentChange(currentPage) {
      this.page = currentPage;
      this.initUsers();
    },
    initUsers() {
      let url = "/user/list/?page=" + this.page + "&size=" + this.size;
      if (this.searchValue.id) {
        url += "&id=" + this.searchValue.id;
      }
      if (this.searchValue.name) {
        url += "&name=" + this.searchValue.name;
      }
      this.getRequest(url).then((resp) => {
        this.loading = false;
        if (resp && "000" === resp.code && resp.data) {
          this.tableData = resp.data.list;
          this.total = resp.data.totalCount;
          console.log(this.total);
        }
      });
    },
    operateUser() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          let url = "/user/";
          if ("add" === this.opt) {
            this.postRequest(url, this.user).then((resp) => {
              if (resp && "000" === resp.code && resp.data) {
                this.initUsers();
              }
            });
          } else if ("update" === this.opt) {
            this.putRequest(url, this.user).then(() => this.initUsers());
          } else if ("delete" === this.opt) {
            url += this.user.id;
            this.deleteRequest(url).then((resp) => {
              if (resp && "000" === resp.code && resp.data) {
                this.initUsers();
              }
            });
          }
        }
      });

      this.dialogVisible = false;
      this.emptyUser();
    },
    onError() {
      this.importDataBtnText = "导入";
      this.importDataDisabled = false;
      this.initUsers();
    },
    onSuccess() {
      this.importDataBtnText = "导入";
      this.importDataDisabled = false;
      this.initUsers();
    },
    beforeUpload() {
      this.importDataBtnText = "正在导入";
      this.importDataDisabled = true;
    },
    exportData() {
      window.open("/user/export", "_parent");
    },
  },
};
</script>

<style scoped>
.accountHead {
  display: flex;
  justify-content: space-between;
}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 560px;
}

.accountTable {
  margin-top: 10px;
}

.el-dialog .el-form-item__label {
  width: 40px;
}
</style>
