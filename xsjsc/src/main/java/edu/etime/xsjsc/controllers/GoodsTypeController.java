package edu.etime.xsjsc.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.JstlView;

import edu.etime.xsjsc.pojo.GoodsType;
import edu.etime.xsjsc.servcies.interfaces.GoodsTypeService;

/**
 * 商品类型管理controller层
 * 
 * @author zhangwang
 *
 */
@Controller
@RequestMapping("/goodstype/")
public class GoodsTypeController {

	@Autowired
	private GoodsTypeService service;

	/**
	 * 进入到增加商品类型页面的方法
	 * 
	 * @return
	 */
	@RequestMapping("/toadd")
	public String toadd() {
		return "goodstype/add";
	}

	/**
	 * 保存商品类型
	 * 
	 * @return
	 */
	@RequestMapping("/add")
	public String insertGoodsType(GoodsType type, Model model) {
		type.setId(UUID.randomUUID().toString());
		// 调用service层方法，保存商品类型
		int rtn = service.insertGoodsType(type);
		// 处理结果
		if (rtn > 0) {
			return "redirect:/goodstype/list";
		} else {
			model.addAttribute("msg", "shibai");
		}
		return "goodstype/add";
	}

	/**
	 * 查询商品列表
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/list")
	public String list(Model model) {
		// 查询
		List<GoodsType> list = service.selectGoodsTypeList(new GoodsType());
		// list放入到model
		model.addAttribute("list", list);
		// 返回视图
		return "goodstype/list";
	}

	/**
	 * 初始化修改页面
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping("/toedit")
	public String toedit(String id, Model model) {
		GoodsType type = service.selectGoodsTypeById(id);
		model.addAttribute("type", type);
		return "goodstype/edit";
	}

	/**
	 * 修改商品类型
	 * 
	 * @param type
	 * @return
	 */
	@RequestMapping("/edit")
	public String edit(GoodsType type,Model model) {
		int rtn = service.updateGoodsType(type);
		// 处理结果
		if (rtn > 0) {
			return "redirect:/goodstype/list";
		} else {
			model.addAttribute("msg", "失败");
		}
		return "goodstype/edit";
	}
}
