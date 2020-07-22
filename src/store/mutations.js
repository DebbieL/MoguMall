import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECKED,
  IS_SELECT_ALL,
  SELECT_ALL
} from "./mutations.types";

export default  {
  //mutations唯一目的就是修改state中状态
  //mutations中的每个方法尽可能能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state, payload) {
    payload.checked = !payload.checked
  },
  [IS_SELECT_ALL](state, payload) {
    state.isAllSelected = payload
  },
  [SELECT_ALL](state, payload) {
    payload.checked = state.isAllSelected
  }
}