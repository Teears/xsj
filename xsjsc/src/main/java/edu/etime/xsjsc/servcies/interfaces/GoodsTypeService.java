package edu.etime.xsjsc.servcies.interfaces;

import java.util.List;

import edu.etime.xsjsc.pojo.GoodsType;

/**
 * 商品类型管理servcie层接口
 * @author 张旺
 *
 */
public interface GoodsTypeService {

	/**
	 * 增加商品类型
	 * @param type
	 * @return
	 */
	int insertGoodsType(GoodsType type);
	/**
	 * 查询商品类型列表
	 * @param type
	 * @return
	 */
	List<GoodsType> selectGoodsTypeList(GoodsType type);
	/**
	 * 根据id查询一条商品类型的详细信息
	 * @param id
	 * @return
	 */
	GoodsType selectGoodsTypeById(String id);
	/**
	 * 修改商品类型
	 * @param type
	 * @return
	 */
	int updateGoodsType(GoodsType type);
}
