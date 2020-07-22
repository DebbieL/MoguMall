import {request} from "./request";

//获取分类栏目的数据
export function getCategory() {
  return request({
    url: '/api/n3/category'
  })
}

//获取子分类数据
export function getSubCategory(maitKey) {
  return request({
    url: '/api/n3/subcategory',
    params: {
      maitKey
    }
  })
}


//获取每个分类板块的具体内容数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/api/n3/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}