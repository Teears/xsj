package edu.etime.xsjsc.controllers;

import java.util.List;
import java.util.UUID;

import edu.etime.xsjsc.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.etime.xsjsc.dto.GoodsTypeProduct;
import edu.etime.xsjsc.dto.ProductDetailDto;
import edu.etime.xsjsc.servcies.interfaces.WXDataService;

/**
 * 微信数据接口controller层
 * @author 张旺
 *
 */
@Controller
@RequestMapping("/wx")
public class WXDataController {

	@Autowired
	private WXDataService service;
	
	/**
	 * 首页商品列表显示
	 * cmd=recommend:精选推荐
	 * cmd=oldest：最新产品
	 * cmd=hot：热销产品
	 * @param cmd
	 * @return
	 */
	@RequestMapping("/index/{cmd}")
	@ResponseBody
	public List<Product> selectIndexProduct(@PathVariable("cmd")String cmd){
		Product p = new Product();
		p.setFields1("1");
		if(cmd.equals("recommend")){
			p.setRecommend(1);
		}else if(cmd.equals("oldest")){
			p.setOldest(1);
		}else if(cmd.equals("hot")){
			p.setHot(1);
		}
		List<Product> list = service.selectProductList(p);
		return list;
	}

	/**
	 * 查询分类商品列表
	 * @return
	 */
	@RequestMapping("/product")
	@ResponseBody
	public List<GoodsTypeProduct> selectGoodsTypeProduct(){
	    System.out.println("***************");
		return service.selectGoodsTypeProduct();
	}
	
	/**
	 * 查询商品的详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/detail/{id}")
	@ResponseBody
	public ProductDetailDto selectProductDetails(@PathVariable("id")String id){		
		return service.selectProductDetails(id);
	}
	/**
	 * 根据openid查询用户的收货地址列表
	 * @param openid
	 * @return
	 */
	@RequestMapping("/getaddr/{openid}")
	@ResponseBody
	public List<CusAddress> selectCusAddress(@PathVariable("openid")String openid){
		CusAddress addr = new CusAddress();
		addr.setOpenid(openid);
		return service.selectCusAddress(addr);
	}

    /**
     * 根据id删除用户的收货地址
     * @param id
     * @return
     */
    @RequestMapping("/deleteAddr/{id}")
    @ResponseBody
    public int delAddress(@PathVariable("id")String id){ return service.deleteCusAddress(id); }

	/**
	 * 增加收货地址
	 * @param address
	 * @return
	 */
	@RequestMapping(value="/address/add",method=RequestMethod.POST)
	@ResponseBody
	public int insertCusAddress(@RequestBody CusAddress address){
		address.setId(UUID.randomUUID().toString());
		return service.insertCusAddress(address);
	}
    /**
     * 修改收货地址
     * @param address
     * @return
     */
    @RequestMapping(value="/address/update",method=RequestMethod.POST)
    @ResponseBody
    public int updateCusAddress(@RequestBody CusAddress address){
        //address.setId(UUID.randomUUID().toString());
        service.deleteCusAddress(address.getId());
        return service.insertCusAddress(address);
    }


    /**
     * 查询收藏列表
     * @param openid
     * @return
     */
    @RequestMapping("/getcollection/{openid}")
    @ResponseBody
    public List<Collection> selectCollectionList(@PathVariable("openid")String openid){
        Collection col = new Collection();
        col.setOpenid(openid);
        return service.selectCollectionList(col);
    }
    /**
     * 添加收藏
     * @param col
     * @return
     */
    @RequestMapping(value="/addCollection",method=RequestMethod.POST)
    @ResponseBody
    public int insertCollection(@RequestBody Collection col){
        col.setId(UUID.randomUUID().toString());
        return service.insertCollection(col);
    }

    /**
     * 删除收藏列表
     * @param cid
     * @return
     */
    @RequestMapping("/delcollection/{id}")
    @ResponseBody
    public int deleteCollection(@PathVariable("id")String cid){
        return service.deleteCollection(cid);
    }

    /**
     * 订单列表显示
     * cmd=ispay:待付款
     * cmd=receive：待发货
     * cmd=over：待收货
     * @param cmd
     * @return
     */
    @RequestMapping("/orders/{cmd}")
    @ResponseBody
    public List<Orders> selectOrdersList(@PathVariable("cmd")String cmd){
        Orders o = new Orders();
        o.setState(1);
        if(cmd.equals("ispay")){
            o.setIspay(0);
            o.setReceive(0);
        }else if(cmd.equals("receive")){
            o.setIspay(1);
            o.setReceive(0);
        }else if(cmd.equals("over")){
            o.setIspay(1);
            o.setReceive(1);
        }
        List<Orders> list = service.selectOrdersList(o);
        return list;
    }

    /**
     * 支付（ispay=1）
     * @param id
     * @return
     */
    @RequestMapping("/orders/ispay/{id}")
    @ResponseBody
    public int updateOrderspay(@PathVariable("id")String id) {
        Orders o = new Orders();
        o = service.selectOrdersById(id);
        o.setIspay(1);
        int res = service.updateOrdersById(o);
        return res;
    }

    /**
     * 取消订单（state=2）
     * @param id
     * @return
     */
    @RequestMapping("/orders/cancel/{id}")
    @ResponseBody
    public int cancelOrders(@PathVariable("id")String id) {
        Orders o = new Orders();
        o = service.selectOrdersById(id);
        o.setState(2);
        int res = service.updateOrdersById(o);
        return res;
    }

    /**
     * 添加订单
     * @param order
     * @return
     */
    @RequestMapping(value="/orders/add",method=RequestMethod.POST)
    @ResponseBody
    public int insertOrders(@RequestBody Orders order){
        order.setId(UUID.randomUUID().toString());
        return service.insertOrders(order);
    }

    /**
     * 结束订单/收货（state=3）
     * @param id
     * @return
     */
    @RequestMapping("/orders/over/{id}")
    @ResponseBody
    public int overOrders(@PathVariable("id")String id) {
        Orders o = new Orders();
        o = service.selectOrdersById(id);
        o.setState(3);
        int res = service.updateOrdersById(o);
        return res;
    }

    /**
     * 查询购物车列表
     * @param openid
     * @return
     */
    @RequestMapping("/getbuycar/{openid}")
    @ResponseBody
    public List<Buycar> selectBuycarList(@PathVariable("openid")String openid){
        Buycar bc = new Buycar();
        bc.setOpenid(openid);
        return service.selectBuycarList(bc);
    }
    /**
     * 添加购物车
     * @param buycar
     * @return
     */
    @RequestMapping(value="/addBuycar",method=RequestMethod.POST)
    @ResponseBody
    public int insertBuycar(@RequestBody Buycar buycar){
        buycar.setId(UUID.randomUUID().toString());
        return service.insertBuycar(buycar);
    }
    /**
     * 删除单一购物车
     * @param id
     * @return
     */
    @RequestMapping("/deleteBuycar/{id}")
    @ResponseBody
    public int deleteBuycar(@PathVariable("id")String id){
        return service.deleteBuycar(id);
    }

    /**
     * 清空购物车
     * @param openid
     * @return
     */
    @RequestMapping("/deleteAllBuycar/{openid}")
    @ResponseBody
    public int deleteAllBuycar(@PathVariable("openid")String openid){
        return service.deleteAllBuycar(openid);
    }

    /**
     * 销量排行
     * @return
     */
    @RequestMapping("/getMostProduct")
    @ResponseBody
    public List<Product> selectMostProduct(){
        return service.selectMostProduct();
    }

}
