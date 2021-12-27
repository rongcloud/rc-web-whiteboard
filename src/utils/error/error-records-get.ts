import { ERROR_COMMON } from "./error-common"

const ERROR_INFO_RECORDS_GET = {
  '查询起始时间不能大于结束时间': {
    code: 100012,
    msg: '查询起始时间不能大于结束时间',
  },
  '参数错误': {
    code: 100001,
    msg: '参数错误',
  },
  ...ERROR_COMMON
}

const ERROR_CODE_RECORDS_GET = {}
const ERROR_CODE_TO_INFO_RECORDS_GET = {}
for (const name in ERROR_INFO_RECORDS_GET) {
  const info = ERROR_INFO_RECORDS_GET[name]
  const { code } = info
  ERROR_CODE_RECORDS_GET[code] = name
  ERROR_CODE_TO_INFO_RECORDS_GET[code] = info
}
export { ERROR_CODE_RECORDS_GET, ERROR_INFO_RECORDS_GET, ERROR_CODE_TO_INFO_RECORDS_GET }