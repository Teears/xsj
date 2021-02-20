package edu.etime.xsjsc.servcies.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.etime.xsjsc.dao.ProductImgsMapper;
import edu.etime.xsjsc.dao.ProductMapper;
import edu.etime.xsjsc.pojo.Product;
import edu.etime.xsjsc.pojo.ProductImgs;
import edu.etime.xsjsc.servcies.interfaces.ProductService;

/**
 * 商品管理服务层实现类
 * @author 张旺
 *
 */
@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductMapper mapper;
	@Autowired
	private ProductImgsMapper imgmapper;
	
	@Override
	public int insertProduct(Product p) {
		return mapper.insertSelective(p);
	}

	@Override
	public List<Product> selectProductList(Product p) {
		//处理name属性，如果有，那么需要加上%进行模糊查询
		if(p!=null && p.getName()!=null && !p.getName().equals("")){
			p.setName("%"+p.getName()+"%");
		}
		return mapper.selectProductList(p);
	}

	@Override
	public List<ProductImgs> selectImgById(String pid) {
		return imgmapper.selectByPid(pid);
	}

	@Override
	public Product selectProductById(String pid) {
		return mapper.selectByPrimaryKey(pid);
	}

	@Override
	public int insertImg(ProductImgs imgs) {
		return imgmapper.insert(imgs);
	}

	@Override
	public int updateImg(ProductImgs imgs) {
		return imgmapper.updateByPrimaryKeySelective(imgs);
	}

	@Override
	public int deleteImg(String id) {
		return imgmapper.deleteByPrimaryKey(id);
	}
}
