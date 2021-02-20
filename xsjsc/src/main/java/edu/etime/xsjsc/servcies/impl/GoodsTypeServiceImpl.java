package edu.etime.xsjsc.servcies.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.etime.xsjsc.dao.GoodsTypeMapper;
import edu.etime.xsjsc.pojo.GoodsType;
import edu.etime.xsjsc.servcies.interfaces.GoodsTypeService;

/**
 * 商品类型管理servcie层实现类
 * @author 张旺
 *
 */
@Service
public class GoodsTypeServiceImpl implements GoodsTypeService {

	@Autowired
	private GoodsTypeMapper mapper;
	
	@Override
	public int insertGoodsType(GoodsType type) {
		return mapper.insert(type);
	}

	@Override
	public List<GoodsType> selectGoodsTypeList(GoodsType type) {
		return mapper.selectGoodsTypeList(type);
	}

	@Override
	public GoodsType selectGoodsTypeById(String id) {
		return mapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateGoodsType(GoodsType type) {
		return mapper.updateByPrimaryKeySelective(type);
	}

}
