package edu.etime.xsjsc.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import edu.etime.xsjsc.common.FastDFSClient;
import edu.etime.xsjsc.common.FileServerAddr;
import edu.etime.xsjsc.pojo.GoodsType;
import edu.etime.xsjsc.pojo.Product;
import edu.etime.xsjsc.pojo.ProductImgs;
import edu.etime.xsjsc.servcies.interfaces.GoodsTypeService;
import edu.etime.xsjsc.servcies.interfaces.ProductService;

/**
 * 商品管理控制层
 * @author 张旺
 *
 */
@Controller
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private GoodsTypeService typeservice;
	@Autowired
	private ProductService service;
	/**
	 * 进入到增加页面
	 * @return
	 */
	@RequestMapping("/toadd")
	public String toadd(Model model){
		//查询出所有可用的商品类型列表
		GoodsType type = new GoodsType();
		type.setState(1);
		List<GoodsType> typelist = typeservice.selectGoodsTypeList(type);
		model.addAttribute("typelist", typelist);
		return "product/add";
	}
	/**
	 * 增加商品
	 * @param p
	 * @return
	 */
	@RequestMapping("/add")
	public String add(Product p,@RequestParam("file")MultipartFile file,Model model){
		//1、判断是否有文件存储，如果有，则将文件保存到fastdfs中
		if(file!=null && !file.isEmpty()){
			//创建fastdfsclient的实例
			try {
				FastDFSClient dfs = new FastDFSClient();
				//获取上传文件的后缀名
				String filename = file.getOriginalFilename(); //文件名
				String extName = filename.substring(filename.lastIndexOf(".")+1);
				String url = dfs.uploadFile(file.getBytes(), extName);//将文件保存到fastdfs中。
				//将路径保存到数据库中
				p.setFields2(url);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		p.setId(UUID.randomUUID().toString());
		//处理typeid
		String[] str = p.getTypeid().split(",");
		p.setTypeid(str[0]);
		p.setTypename(str[1]);
		int rtn = service.insertProduct(p);
		if (rtn > 0) {
			//model.addAttribute("msg", "成功");
			return "redirect:/product/list";
		} else {
			model.addAttribute("msg", "shibai");
		}
		return "redirect:/product/toadd";
	}
	/**
	 * 查询商品列表
	 * @param p
	 * @param model
	 * @return
	 */
	@RequestMapping("/list")
	public String list(Product p,Model model){
		//1、初始化商品类型下拉列表
		GoodsType type = new GoodsType();
		type.setState(1);
		List<GoodsType> typelist = typeservice.selectGoodsTypeList(type);
		model.addAttribute("typelist", typelist);
		//2、查询商品列表
		List<Product> list = service.selectProductList(p);
		model.addAttribute("list", list);
		//3、文件服务器地址
		model.addAttribute("fileserver", FileServerAddr.getFileserver());
		return "product/list";
	}
	/**
	 * 进入到商品图片管理页面的方法
	 * @return
	 */
	@RequestMapping("/imgs/{pid}")
	public String initImg(@PathVariable("pid")String pid,Model model){
		//1、根据商品id查询出商品的详细信息（显示）
		Product p = service.selectProductById(pid);
		//2、查询商品的图片列表
		List<ProductImgs> list = service.selectImgById(pid);
		//3、获取图片服务器的地址
		String fileserver = FileServerAddr.getFileserver();
		//将上面的内容放入到model中，传递到页面
		model.addAttribute("list", list);
		model.addAttribute("p", p);
		model.addAttribute("fileserver", fileserver);
		return "product/imgs";
	}
	/**
	 * 编辑商品图片
	 * @param img
	 * @param file
	 * @param model
	 * @return
	 */
	@RequestMapping("/updateimg")
	public String updateimg(ProductImgs img,@RequestParam("file")MultipartFile file,Model model){
		//上传图片
		if(file!=null && !file.isEmpty()){
			try {
				FastDFSClient dfs = new FastDFSClient();
				//获取上传文件的后缀名
				String filename = file.getOriginalFilename(); //文件名
				String extName = filename.substring(filename.lastIndexOf(".")+1);
				String url = dfs.uploadFile(file.getBytes(), extName);//将文件保存到fastdfs中。
				//将路径保存到数据库中
				img.setImgurl(url);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		int rtn = 0;
		//增加
		if(img.getImgid().equals("")){
			img.setImgid(UUID.randomUUID().toString());
			rtn = service.insertImg(img);
		}else{
			//修改
			rtn = service.updateImg(img);
		}
		if(rtn>0){
			return "redirect:/product/imgs/"+img.getProductid();
		}else{
			model.addAttribute("msg", "保存图片失败");
			return "product/imgs";
		}
	}
	/**
	 * 删除商品图片
	 * @param imgid
	 * @return
	 */
	@RequestMapping("/delimg/{id}/{pid}")
	public String delimg(@PathVariable("id")String id,@PathVariable("pid")String pid){
		service.deleteImg(id);
		return "redirect:/product/imgs/"+pid;
	}
}
