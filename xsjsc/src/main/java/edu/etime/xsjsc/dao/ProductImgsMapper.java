package edu.etime.xsjsc.dao;

import java.util.List;

import edu.etime.xsjsc.pojo.ProductImgs;

public interface ProductImgsMapper {
    int deleteByPrimaryKey(String imgid);

    int insert(ProductImgs record);

    int insertSelective(ProductImgs record);

    ProductImgs selectByPrimaryKey(String imgid);

    int updateByPrimaryKeySelective(ProductImgs record);

    int updateByPrimaryKey(ProductImgs record);
    /**
     * 根据商品id查询商品所有的图片列表
     * @param pid
     * @return
     */
    List<ProductImgs> selectByPid(String pid);
}