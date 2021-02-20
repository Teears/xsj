package edu.etime.xsjsc.dao;

import edu.etime.xsjsc.pojo.Buycar;

import java.util.List;

public interface BuycarMapper {
    int deleteByPrimaryKey(String id);

    int deleteByOpenid(String openid);

    int insert(Buycar record);

    int insertSelective(Buycar record);

    Buycar selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Buycar record);

    int updateByPrimaryKey(Buycar record);
    /**
     * 查询用户的收藏列表
     * @param record
     * @return
     */
    List<Buycar> selectBuycarList(Buycar record);
}