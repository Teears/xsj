<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品图片管理</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/bootstrap/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/stylesheets/theme.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/font-awesome/css/font-awesome.css">
<script src="${pageContext.request.contextPath}/css/jquery-1.8.1.min.js"
	type="text/javascript"></script>
<script type="text/javascript">
//预览上传图片
$(function() {
	$("#imgfile").change(function(e) {
		$("#img").attr('src', URL.createObjectURL($(this)[0].files[0]));
	});
});

//初始化修改图片功能
var initimg = function(imgid,imgurl,sort){
	
	$("#imgid").val(imgid);
	$("#img").attr("src",imgurl);
	$("#sort").val(sort);	
}
//重置编辑功能
var resets = function(){
	$("#imgid").val("");
	$("#img").attr("src","");
	$("#sort").val("");	
}
//删除商品图片
var delimg = function(id){
	if(confirm("确定删除改图片?")){
		var pid = $("#productid").val();
		window.location.href="${pageContext.request.contextPath}/product/delimg/"+id+"/"+pid;
	}
}
</script>
</head>
<body>
<ul class="breadcrumb">
		<li><a href="#">商品管理</a> <span class="divider">/</span></li>
		<li class="active">商品图片管理</li>
	</ul>
	<div class="alert">
		<button type="button" class="close" data-dismiss="alert"></button>
		<h4>提示</h4>
		<strong>正在编辑商品：${p.name}的图片</strong>
	</div>

	<!-- 图片列表 -->
	<div class="row-fluid">
		<div class="span10">
			<ul class="thumbnails">
				<c:forEach items="${list}" var="img">
					<li class="span2" style="width: 150px">
						<div class="thumbnail">
							<img style="width: 140px; height: 140px;" alt="140x140" src="${fileserver}/${img.imgurl}" />
							<div class="caption">
								<p>排序：${img.sort}</p>
								<p>
									<a class="btn btn-primary" href="javascript:initimg('${img.imgid}','${fileserver}/${img.imgurl}',
									'${img.sort}');">编辑</a>
									<a class="btn btn-primary" href="javascript:delimg('${img.imgid}');">删除</a>
								</p>
							</div>
						</div>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>

	<!-- 图片上传 -->
	<div class="row-fluid">
		<div class="span12">
			<form class="form-horizontal" action="${pageContext.request.contextPath}/product/updateimg" method="post"
				enctype="multipart/form-data">
				<div>
					<input type="hidden" name="productid" id="productid" value="${p.id}" /> 
					<input type="hidden" name="imgid" id="imgid" />
				</div>

				<div class="row-fluid">
					<div class="span8" style="width: 400px">
						<div class="control-group">
							<label class="control-label" for="imgfile">图片</label>
							<div class="controls">
								<input id="imgfile" type="file" name="file" /> 
								<br> 
								索引：<input type="text" name="sort" id="sort" />
							</div>
						</div>
					</div>
					<div class="span4" style="width: auto">
						<img style="width: 100px; height: 100px" id="img" />
					</div>
				</div>
				<hr>

				<div class="control-group">
					<div class="controls">
						<input type="submit" class="btn" value="提交" />
						<button class="btn btn-primary" type="button" onclick="resets();">重置</button>
					</div>
				</div>
				<div>${msg}</div>
			</form>
		</div>
	</div>
</body>
</html>