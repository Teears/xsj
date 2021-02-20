package edu.etime.xsjsc.dto;

import java.util.List;

import edu.etime.xsjsc.pojo.GoodsType;
import edu.etime.xsjsc.pojo.Product;

/**
 * 商品分类显示的dto
 * @author 张旺
 *
 */
public class GoodsTypeProduct extends GoodsType {

	private List<Product> productlist;

	public List<Product> getProductlist() {
		return productlist;
	}

	public void setProductlist(List<Product> productlist) {
		this.productlist = productlist;
	}
}
