package edu.etime.xsjsc.dao;

import edu.etime.xsjsc.pojo.Customer;

public interface CustomerMapper {
    int deleteByPrimaryKey(String openid);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(String openid);

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);
}