import { ERROR_COMMON } from "./error-common"

const ERROR_INFO_RECORD_DELETE = {
  '录像Id不能为空': {
    code: 100015,
    msg: '录像Id不能为空',
  },
  '删除录像失败': {
    code: 100016,
    msg: '删除录像失败',
  },
  ...ERROR_COMMON
}

const ERROR_CODE_RECORD_DELETE = {}
const ERROR_CODE_TO_INFO_RECORD_DELETE = {}
for (const name in ERROR_INFO_RECORD_DELETE) {
  const info = ERROR_INFO_RECORD_DELETE[name]
  const { code } = info
  ERROR_CODE_RECORD_DELETE[code] = name
  ERROR_CODE_TO_INFO_RECORD_DELETE[code] = info
}
export { ERROR_CODE_RECORD_DELETE, ERROR_INFO_RECORD_DELETE, ERROR_CODE_TO_INFO_RECORD_DELETE }