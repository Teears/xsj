package edu.etime.xsjsc.dao;

import java.util.List;

import edu.etime.xsjsc.pojo.GoodsType;

public interface GoodsTypeMapper {
    int deleteByPrimaryKey(String id);

    int insert(GoodsType record);

    int insertSelective(GoodsType record);

    GoodsType selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(GoodsType record);

    int updateByPrimaryKey(GoodsType record);
    /**
     * 查询商品类型列表
     * @param record 可能参数：state
     * @return
     */
    List<GoodsType> selectGoodsTypeList(GoodsType record);
}