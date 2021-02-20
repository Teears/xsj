package edu.etime.xsjsc.servcies.impl;

import java.util.List;

import edu.etime.xsjsc.dao.OrdersMapper;
import edu.etime.xsjsc.pojo.Orders;
import edu.etime.xsjsc.servcies.interfaces.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 我的订单服务层实现类
 * @author 禹庆鸿
 *
 */
@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersMapper mapper;

    @Override
    public List<Orders> selectOrdersList(Orders o) {
        //处理name属性，如果有，那么需要加上%进行模糊查询
        if(o!=null && o.getId()!=null && !o.getId().equals("")){
            o.setId("%"+o.getId()+"%");
        }
        return mapper.selectOrdersList(o);
    }

    @Override
    public int updateIspay(Orders pay) {
        return mapper.updateByPrimaryKeySelective(pay);
    }

    @Override
    public int updateReceive(Orders r) {
        return mapper.updateByPrimaryKeySelective(r);
    }
}
