package edu.etime.xsjsc.servcies.interfaces;

import java.util.List;

import edu.etime.xsjsc.pojo.Orders;

/**
 * 我的订单服务层接口
 * @author 禹庆鸿
 *
 */

public interface OrdersService {

    /**
     * 查询订单列表
     * @param o
     * @return
     */
    List<Orders> selectOrdersList(Orders o);

    /**
     * 修改是否支付
     * @param pay
     * @return
     */
    int updateIspay(Orders pay);

    /**
     * 修改是否收货
     * @param r
     * @return
     */
    int updateReceive(Orders r);
}
