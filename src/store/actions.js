import {
  ADD_COUNTER,
  ADD_TO_CART, CHANGE_CHECKED,
  IS_SELECT_ALL,
  SELECT_ALL
} from "./mutations.types";

export default {
  addCart(context, payload){
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2、判断oldProduct
      if(oldProduct){
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }else {
        payload.count = 1;
        payload.checked = false
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    }))
  },

  selectAll(context, payload) {
    //点击的不是全选按钮时，传递payload值；点击的是全选按钮时，不传递payload值
    //第一种情况，每点击一个商品的勾选按钮，都要判断此次按钮点击事件是否达成全部商品选中，或是否取消全选-->据此改变state中isSelectedAll
    //第二种情况，点击的是全选按钮，结合上下文，判断是全部勾选还是取消全部勾选
    if(payload) {
      context.commit(CHANGE_CHECKED, payload)
    }

    let flag = true
    for(let item of context.state.cartList) {
      if(!item.checked) {
        flag = false;
        if(payload) {//第一种情况，因此次按钮点击事件，全选状态被打破，改变isAllSelected=false
          context.commit(IS_SELECT_ALL, false)
        } else {//第二种情况，有商品未被选中，则点击全选按钮为全部选中商品
          context.commit(IS_SELECT_ALL, true)
        }
        break;
      }
    }
    if(flag) {
      if(payload) {//第一种情况，因此次按钮点击事件，达成全部商品被选中，改变isAllSelected=true
        context.commit(IS_SELECT_ALL, true)
      } else {//第二种情况，所有商品都是选中状态，点击全选按钮为取消全部选中
        context.commit(IS_SELECT_ALL, false)
      }
    }

    if(!payload) {
      for(let item of context.state.cartList) {
        context.commit(SELECT_ALL, item)
      }
    }
  }
}