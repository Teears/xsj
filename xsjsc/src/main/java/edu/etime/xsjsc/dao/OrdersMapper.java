package edu.etime.xsjsc.dao;

import edu.etime.xsjsc.pojo.Orders;

import java.util.List;

public interface OrdersMapper {
    int deleteByPrimaryKey(String id);

    int insert(Orders record);

    int insertSelective(Orders record);

    Orders selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Orders record);

    int updateByPrimaryKey(Orders record);

    /**
     * 查询订单列表
     * @param o
     * @return
     */
    List<Orders> selectOrdersList(Orders o);
}