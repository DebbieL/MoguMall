import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/api/n3/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url:'/api/n3/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo
    this.shopName = shopInfo.name
    this.totalSell = shopInfo.cSells
    this.allGoods = shopInfo.cGoods
    this.shopScore = shopInfo.score
    this.shopUrl = shopInfo.shopUrl
  }
}

export class DetailInfo {
  constructor(detailInfo) {
    this.descInfo = detailInfo.desc
    this.imageKey = detailInfo.detailImage[0].key
    this.imageList = detailInfo.detailImage[0].list
  }
}

export class GoodsParams {
  constructor(itemsParams) {
    this.goodsRule = itemsParams.rule.tables[0]
    this.goodsDesc = itemsParams.info.set
    this.image = itemsParams.images ? itemsParams.images[0] : '';
  }
}

export class Comment {
  constructor(rate) {
    this.userImg = rate.list[0].user.avatar
    this.userName = rate.list[0].user.uname
    this.content = rate.list[0].content
    this.createTime = rate.list[0].created
    this.userStyle = rate.list[0].style
    this.userPhoto = rate.list[0].images
  }
}