package edu.etime.xsjsc.dao;

import java.util.List;

import edu.etime.xsjsc.pojo.CusAddress;

public interface CusAddressMapper {
    int deleteByPrimaryKey(String id);

    int insert(CusAddress record);

    int insertSelective(CusAddress record);

    CusAddress selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CusAddress record);

    int updateByPrimaryKey(CusAddress record);
    /**
     * 根据openid修改默认地址
     * @param record
     * @return
     */
    int updateByOpenid(CusAddress record);
    /**
     * 查询用户的收货地址列表
     * @param record
     * @return
     */
    List<CusAddress> selectAddress(CusAddress record);
}