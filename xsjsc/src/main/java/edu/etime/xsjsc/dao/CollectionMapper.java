package edu.etime.xsjsc.dao;

import edu.etime.xsjsc.pojo.Collection;
import java.util.List;

public interface CollectionMapper {
    int deleteByPrimaryKey(String id);

    int insert(Collection record);

    int insertSelective(Collection record);

    Collection selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Collection record);

    int updateByPrimaryKey(Collection record);
    /**
     * 查询用户的收藏列表
     * @param record
     * @return
     */
    List<Collection> selectCollectionList(Collection record);
}