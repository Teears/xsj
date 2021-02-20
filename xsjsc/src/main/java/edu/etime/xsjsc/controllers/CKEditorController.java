package edu.etime.xsjsc.controllers;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import edu.etime.xsjsc.common.FastDFSClient;
import edu.etime.xsjsc.common.FileServerAddr;

/**
 * ckeditor上传文件方法
 * @author zw
 *
 */
@Controller
@RequestMapping("/ckeditor/upload")
public class CKEditorController {

	@RequestMapping("/img")
	public void uploadimg(@RequestParam("upload")MultipartFile file,HttpServletRequest request,
			HttpServletResponse response){
		
		try {
			//上传文件
			FastDFSClient dfs = new FastDFSClient();
			//文件名
			String filename = file.getOriginalFilename();
			//后缀名
			String extName = filename.substring(filename.lastIndexOf(".")+1);
			//上传文件
			String url = dfs.uploadFile(file.getBytes(), extName);
			//构建完整的图片地址。
			String imgpath = FileServerAddr.getFileserver()+"/"+url;
			//ckeditor要求的写法
			response.setContentType("text/html;charset=UTF-8");
			String callback = request.getParameter("CKEditorFuncNum");
			PrintWriter out = response.getWriter();
			out.println("<script type=\"text/javascript\">");
			out.println("window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + imgpath + "',''" + ")");
			out.println("</script>");
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
