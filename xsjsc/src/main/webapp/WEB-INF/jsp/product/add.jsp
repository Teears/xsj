<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>增加商品</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/bootstrap/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/stylesheets/theme.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/font-awesome/css/font-awesome.css">
<script src="${pageContext.request.contextPath}/css/jquery-1.8.1.min.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
	$(function(){
		$("#file").change(function(e){
			$("#img").attr("src",URL.createObjectURL($(this)[0].files[0]));
		});
	});

</script>
</head>
<body>
	<ul class="breadcrumb">
		<li><a href="#">商品管理</a> <span class="divider">/</span></li>
		<li class="active">增加商品</li>
	</ul>
	<div class="alert">
		<button type="button" class="close" data-dismiss="alert">×</button>
		<h4>提示!</h4>
		<strong>${msg}</strong>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<form class="form-horizontal"
				action="${pageContext.request.contextPath}/product/add"
				method="post" enctype="multipart/form-data">
				<div class="control-group">
					<label class="control-label" for=name>商品名称</label>
					<div class="controls">
						<input id="name" type="text" name="name" />
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="typeid">商品类型</label>
					<div class="controls">
						<select id="typeid" name="typeid">
							<c:forEach items="${typelist}" var="type">
								<option value="${type.id},${type.name}">${type.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="title">商品标题</label>
					<div class="controls">
						<input type="text" name="title" id="title" />
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="price">商品价格</label>
					<div class="controls">
						<input type="text" name="price" id="price" />
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="number">销售量</label>
					<div class="controls">
						<input type="text" name="number" id="number" />
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="stock">库存量</label>
					<div class="controls">
						<input type="text" name="stock" id="stock" />
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="pdes">商品说明</label>
					<div class="controls">
						<textarea rows="5" cols="40" name="description"
						 id="description" class="ckeditor"></textarea>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="hot">是否热卖</label>
					<div class="controls">
						<select name="hot">
							<option value="1">热卖</option>
							<option value="0">非热卖</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="recommend">是否首推</label>
					<div class="controls">
						<select name="recommend">
							<option value="1">首推</option>
							<option value="0">非首推</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="oldest">是否最新产品</label>
					<div class="controls">
						<select name="oldest">
							<option value="1">最新</option>
							<option value="0">非最新</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="fields1">商品状态</label>
					<div class="controls">
						<select name="fields1">
							<option value="1">上架</option>
							<option value="0">下架</option>
						</select>
					</div>
				</div>

				<div class="control-group">
					<label class="control-label" for="file">商品图片</label>
					<div class="controls">
						<input type="file" name="file" id="file"> <img id="img"
							style="width: 100px; height: 100px">
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						<input type="submit" class="btn" value="提交" />
						<button class="btn btn-primary" type="button">返回</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<script type="text/javascript">
		CKEDITOR.replace("description");
	</script>
</body>
</html>