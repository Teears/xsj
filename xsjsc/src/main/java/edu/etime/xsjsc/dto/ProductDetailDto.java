package edu.etime.xsjsc.dto;

import java.util.List;

import edu.etime.xsjsc.pojo.Product;
import edu.etime.xsjsc.pojo.ProductImgs;

/**
 * 前端显示的商品详情数据传输对象
 * @author zw
 *
 */
public class ProductDetailDto {

	private Product product;
	private List<ProductImgs> imgs;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public List<ProductImgs> getImgs() {
		return imgs;
	}

	public void setImgs(List<ProductImgs> imgs) {
		this.imgs = imgs;
	}
}
