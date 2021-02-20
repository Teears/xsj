package edu.etime.xsjsc.dao;

import java.util.List;

import edu.etime.xsjsc.pojo.Product;

public interface ProductMapper {
    int deleteByPrimaryKey(String id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);
    /**
     * 查询商品列表
     * @param p
     * @return
     */
    List<Product> selectProductList(Product p);

    /**
     * 销量排行
     * @return
     */
    List<Product> selectMostProduct();
    
}