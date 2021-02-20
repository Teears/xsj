package edu.etime.xsjsc.controllers;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.etime.xsjsc.pojo.Customer;
import edu.etime.xsjsc.servcies.interfaces.WXDataService;

/**
 * 微信授权登录controller
 * 
 * @author 张旺
 *
 */
@Controller
@RequestMapping("/wxlogin")
public class WXLoginController {

	@Autowired
	private WXDataService service;
	
	/**
	 * 微信授权登录接口 
	 * 1、使用code与微信交换得到openid 
	 * 2、判断保存openid与nickname到数据库（需要先判断是否已经保存）
	 * @param code
	 *            微信登录的code值
	 * @param nickname
	 *            用户的昵称
	 * @return openid。如果注册不成功，返回空字符串
	 */
	@RequestMapping("/login")
	@ResponseBody
	public String login(String code, String nickname) {
		String openid = getopenid(code);
		System.out.println("**********"+openid);
		//判断数据库中是否有openid存在
		Customer cus = service.selectCustomerById(openid);
		if(cus==null){
			//表示数据库中没有这个用户，插入这个用户
			cus = new Customer();
			cus.setOpenid(openid);
			cus.setNickname(nickname);
			int rtn = service.insertCustomer(cus);
			if(rtn>0){
				
			}else{
				openid="";
			}
		}
		return openid;
	}

	/**
	 * 使用code从微信端交换openid
	 * 
	 * @param code
	 * @return
	 */
	private String getopenid(String code) {
		String WX_URL = "https://api.weixin.qq.com/sns/jscode2session?appid=wxf0b3f4d6592571a9&secret=cf8cf8db43868f5b354c2d0bafaa67a0&js_code="
				+ code + "&grant_type=authorization_code";
		String rtnvalue = GET(WX_URL);//获取到的是一个json字符串。
		//解析json字符串，得到openid
		ObjectMapper mapper = new ObjectMapper();
		String openid = "";
		try {
			Map<String, String> map = mapper.readValue(rtnvalue, Map.class);
			openid= map.get("openid");
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return openid;
	}

	// 发起get请求的方法。
	public String GET(String url) {
		String result = "";
		BufferedReader in = null;
		InputStream is = null;
		InputStreamReader isr = null;
		try {
			URL realUrl = new URL(url);
			URLConnection conn = realUrl.openConnection();
			conn.connect();
			Map<String, List<String>> map = conn.getHeaderFields();
			is = conn.getInputStream();
			isr = new InputStreamReader(is);
			in = new BufferedReader(isr);
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			// 异常记录
		} finally {
			try {
				if (in != null) {
					in.close();
				}
				if (is != null) {
					is.close();
				}
				if (isr != null) {
					isr.close();
				}
			} catch (Exception e2) {
				// 异常记录
			}
		}
		return result;
	}
}
