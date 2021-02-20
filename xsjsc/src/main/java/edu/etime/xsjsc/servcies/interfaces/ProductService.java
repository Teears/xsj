package edu.etime.xsjsc.servcies.interfaces;

import java.util.List;

import edu.etime.xsjsc.pojo.Product;
import edu.etime.xsjsc.pojo.ProductImgs;

/**
 * 商品管理服务层接口
 * @author 张旺
 *
 */
public interface ProductService {

	/**
	 * 增加商品
	 * @param p
	 * @return
	 */
	int insertProduct(Product p);
	/**
	 * 查询商品列表
	 * @param p
	 * @return
	 */
	List<Product> selectProductList(Product p);
	/**
	 * 根据商品id查询一条商品的详细信息
	 * @param pid
	 * @return
	 */
	Product selectProductById(String pid);
	
	/**
	 * 根据商品id查询商品的图片列表
	 * @param pid
	 * @return
	 */
	List<ProductImgs> selectImgById(String pid);
	/**
	 * 增加商品图片
	 * @param imgs
	 * @return
	 */
	int insertImg(ProductImgs imgs);
	/**
	 * 修改商品图片
	 * @param imgs
	 * @return
	 */
	int updateImg(ProductImgs imgs);
	/**
	 * 删除商品图片
	 * @param id
	 * @return
	 */
	int deleteImg(String id);
}
