import { ERROR_COMMON } from "./error-common";
const ERROR_INFO_IWB_PLAYER = {
  '超出最大限制': {
    code: 100013,
    msg: '超出最大限制',
  },
  '未知错误': {
    code: 1,
    msg: '未知错误',
  },
  ...ERROR_COMMON,
}

const ERROR_CODE_IWB_PLAYER = {}
const ERROR_CODE_TO_INFO_IWB_PLAYER = {}
for (const name in ERROR_INFO_IWB_PLAYER) {
  const info = ERROR_INFO_IWB_PLAYER[name]
  const { code } = info
  ERROR_CODE_IWB_PLAYER[code] = name
  ERROR_CODE_TO_INFO_IWB_PLAYER[code] = info
}
export { ERROR_CODE_IWB_PLAYER, ERROR_INFO_IWB_PLAYER, ERROR_CODE_TO_INFO_IWB_PLAYER }