package edu.etime.xsjsc.controllers;


import edu.etime.xsjsc.common.FileServerAddr;
import edu.etime.xsjsc.pojo.Orders;
import edu.etime.xsjsc.servcies.interfaces.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 我的订单控制层
 * @author 禹庆鸿
 *
 */
@Controller
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private OrdersService service;
    /**
     * 查询商品列表
     * @param o
     * @param model
     * @return
     */
    @RequestMapping("/list")
    public String list(Orders o, Model model){
        //1、查询订单列表
        List<Orders> list = service.selectOrdersList(o);
        model.addAttribute("list", list);
        //2、文件服务器地址
        model.addAttribute("fileserver", FileServerAddr.getFileserver());
        return "orders/list";
    }

    /**
     * 修改是否支付
     * @param pay
     * @param model
     * @return
     */
    @RequestMapping("/updateispay")
    public String updateispay(Orders pay,Model model) {
        int rtn = service.updateIspay(pay);
        if (rtn > 0) {
            model.addAttribute("msg", "支付成功");
            //return "redirect:/product/list";
        } else {
            model.addAttribute("msg", "支付失败");
        }
        return "redirect:/orders/list";
    }


    /**
     * 修改是否收货
     * @param r
     * @param model
     * @return
     */
    @RequestMapping("/updatereceive")
    public String updatereceive(Orders r,Model model) {
        int rtn = service.updateReceive(r);
        if (rtn > 0) {
            model.addAttribute("msg", "收货成功");
            //return "redirect:/product/list";
        } else {
            model.addAttribute("msg", "收货失败");
        }
        return "redirect:/orders/list";
    }
}
