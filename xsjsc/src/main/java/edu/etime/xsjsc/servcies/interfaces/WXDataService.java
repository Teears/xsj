package edu.etime.xsjsc.servcies.interfaces;

import java.util.List;

import edu.etime.xsjsc.dto.GoodsTypeProduct;
import edu.etime.xsjsc.dto.ProductDetailDto;
import edu.etime.xsjsc.pojo.*;
import org.springframework.core.annotation.Order;

/**
 * 微信数据接口服务层
 * @author 禹庆鸿
 *
 */
public interface WXDataService {

	/**
	 * 查询收藏列表
	 * @param col
	 * @return
	 */
	public List<Collection> selectCollectionList(Collection col);

	/**
	 * 查询购物车列表
	 * @param bc
	 * @return
	 */
	public List<Buycar> selectBuycarList(Buycar bc);

	/**
	 * 查询订单列表(主要用于首页的已支付，已收货的查询)
	 * @param o
	 * @return
	 */
	List<Orders> selectOrdersList(Orders o);

	/**
	 * 查询商品列表（主要用于首页的精选推荐，最新产品，热销产品的查询）
	 * @param p
	 * @return
	 */
	List<Product> selectProductList(Product p);

	/**
	 * 根据orderid查询订单
	 * 详细信息
	 * @param ordersid
	 * @return
	 */
	Orders selectOrdersById(String ordersid);

    /**
     * 根据openid查询用户详细信息
     * @param openid
     * @return
     */
    Customer selectCustomerById(String openid);

    /**
     * 查询分类商品列表
     * @return
     */
    List<GoodsTypeProduct> selectGoodsTypeProduct();

    /**
     * 查询商品详情的service
     * 1、根据id查询商品的详细信息
     * 2、根据id查询商品的图片列表
     * @param pid
     * @return
     */
    ProductDetailDto selectProductDetails(String pid);

    /**
     * 查询用户的收货地址列表
     * @param address openid参数
     * @return
     */
    List<CusAddress> selectCusAddress(CusAddress address);

	/**
	 * 修改订单ispay=1（支付）
	 * @param order
	 * @return
	 */
	int updateOrdersById(Orders order);

    /**
     * 新增购物车
     * @param buycar
     * @return
     */
    int insertBuycar(Buycar buycar);

	/**
	 * 保存客户信息
	 * @param cus
	 * @return
	 */
	int insertCustomer(Customer cus);

	/**
	 * 新增收货地址
	 * @param address
	 * @return
	 */
	int insertCusAddress(CusAddress address);

    /**
     * 添加收藏
     * @param col
     * @return
     */
    int insertCollection(Collection col);

    /**
     * 添加订单
     * @param order
     * @return
     */
    int insertOrders(Orders order);

	/**
	 * 删除收藏
	 * @param cid
	 * @return
	 */
	int deleteCollection(String cid);

    /**
     * 删除地址
     * @param id
     * @return
     */
    int deleteCusAddress(String id);

    /**
     * 删除购物车
     * @param id
     * @return
     */
    int deleteBuycar(String id);

    /**
     * 清空购物车
     * @param openid
     * @return
     */
    int deleteAllBuycar(String openid);

	/**
	 * 销量排行
	 * @return
	 */
	List<Product> selectMostProduct();

}
