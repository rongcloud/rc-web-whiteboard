<template>
  <div class="records">
    <rong-layer :versionShow="false">
      <rong-back></rong-back>
      <rong-logo></rong-logo>
      <div style="overflow: hidden;">
        <div class="records-con">
          <div class="records-item" v-for="record in records" :key="record.id">
            <div class="records-item-dsc">
              <div class="records-item-title">
                <div class="records-item-play" @click="onRecordPlay(record)">
                  <img src="~@/assets/imgs/record.png" alt="播放">
                </div>
                房间号{{ record.hubId }}
              </div>
              <div class="records-item-time">
                创建时间：{{ formatDate(record.recordedTime) }}
              </div>
              <div class="records-item-time">
                录像时长：{{ formatDuration(record.duration) }}
              </div>
            </div>
            <el-button size="small" class="records-item-dele" @click="onRecordDele(record)" type="primary">删除</el-button>
          </div>
        </div>
        <div style="float: right;">
          <el-pagination :hide-on-single-page="true" :small="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:currentPage="offset" :page-size="limit" layout="prev, pager, next" :total="count">
          </el-pagination>
        </div>
      </div>
    </rong-layer>
  </div>
</template>
<script lang="ts">
import RongLayer from "@/components/RongLayer/index.vue";
import RongLogo from "@/components/RongLogo/index.vue";
import RongBack from "@/components/RongBack/index.vue";
import { defineComponent } from 'vue'
import { getRecords, deleRecord } from "@/api";
import { RespReqRecord, RecvReqRecods, CookieUser } from "@/interfaces";
import { ElMessage, ElMessageBox } from "element-plus";
import { deleLoginSession, ERROR_CODE_TO_INFO_RECORDS_GET, ERROR_CODE_TO_INFO_RECORD_DELETE, isJSONString } from "@/utils";
export default defineComponent({
  name: 'Records',
  components: {
    'rong-layer': RongLayer,
    'rong-logo': RongLogo,
    'rong-back': RongBack,
  },
  data () {
    return {
      records: [] as RespReqRecord[],
      offset: 1, // 录像列表页数
      limit: 4, // 每页显示n条数据
      count: 4, // 录像总数
    }
  },
  methods: {
    // 修改每页条数
    handleSizeChange (val) {
      this.limit = val;
      this.getRecordsThis();
    },
    // 修改第几页
    handleCurrentChange (val) {
      this.offset = val;
      this.getRecordsThis();
    },
    async onRecordDele (record: RespReqRecord) {
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await deleRecord({ id: record.id })
        if (code === 0) {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          });
          this.getRecordsThis();
        }
      }).catch((err) => {
        const { code } = err;
        const errInfo = ERROR_CODE_TO_INFO_RECORD_DELETE[code];
        if (errInfo) {
          return ElMessage({
            type: 'info',
            message: `${errInfo.msg}，code：${code}`
          });
        }
        ElMessage({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async getRecordsThis () {
      try {
        const { offset, limit } = this;
        const currentSeconds = Math.round(Number(new Date().getTime()) / 1000)
        let reqData: RecvReqRecods = {
          offset: (offset - 1) * limit,
          limit,
          order: 0,
          rsTime: currentSeconds - 24 * 60 * 60,
          reTime: currentSeconds,
        }
        const { code, desc, count, hubRecords } = await getRecords(reqData);
        if (code === 10000) {
          this.count = count > 100 ? 100 : count;
          this.records = hubRecords;
        } else {
          ElMessage.warning(desc)
        }
      } catch (err) {
        const { code } = err as { code: number };
        const { msg } = ERROR_CODE_TO_INFO_RECORDS_GET[code] || ERROR_CODE_TO_INFO_RECORDS_GET[199999]
        ElMessage.warning(msg)
      }
    },
    formatDuration (data: number): string {
      if (!data) return '';
      data = Math.ceil(data / 1000) || 1;
      let h = parseInt(data / 3600 + '');
      let m = parseInt((data % 3600) / 60 + '');
      let s = Math.ceil(data % 3600 % 60);
      function addZero (data: number): string | number {
        return data < 10 ? '0' + data : data;
      }
      return `${addZero(h)}:${addZero(m)}:${addZero(s)}`
    },
    formatDate (data: number): string | null {
      // 获取单元格数据
      if (!data) return null;
      let dt = new Date(data)
      function addZero (data: number): string | number {
        return data < 10 ? '0' + data : data;
      }
      return dt.getFullYear() + '-' + addZero(dt.getMonth() + 1) + '-' + addZero(dt.getDate()) + ' ' + addZero(dt.getHours()) + ':' + addZero(dt.getMinutes()) + ':' + addZero(dt.getSeconds());
    },
    // 播放回放
    async onRecordPlay (record: RespReqRecord) {
      const sUser = sessionStorage.getItem("user");
      let user: CookieUser = {}
      if (isJSONString(sUser)) {
        user = JSON.parse(sUser as string);
      }
      if (!user.nickName) {
        ElMessage.warning('用户已失效，请重新登录');
        deleLoginSession();
        return this.$router.push({ name: 'Login' })
      }
      const { href } = this.$router.resolve({
        path: '/record-play',
        query: {
          url: record.url,
          hubId: record.hubId
        }
      })
      window.open(href, '_blank')
    }
  },
  mounted () {
    this.getRecordsThis();
  }
})
</script>
<style lang="scss" scoped>
.records {
  .records-con {
    padding-bottom: 0.1rem;
    .records-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      padding: 0.2rem 0;
      .records-item-play {
        padding-right: 0.17rem;
        width: 0.32rem;
        cursor: pointer;
        display: inline-block;
        img {
          width: 100%;
          display: block;
        }
      }
      .records-item-dsc {
        flex: 1;
        padding-right: 0.1rem;
        .records-item-title {
          font-size: 0.21rem;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 0.29rem;
          padding-bottom: 0.04rem;
          display: flex;
          align-items: center;
        }
        .records-item-time {
          font-size: 0.16rem;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.45);
          line-height: 0.23rem;
        }
      }
    }
  }
}
</style>
