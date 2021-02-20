<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/bootstrap/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/stylesheets/theme.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/font-awesome/css/font-awesome.css">
<script src="${pageContext.request.contextPath}/css/jquery-1.8.1.min.js"
	type="text/javascript"></script>
</head>
<body>
	<ul class="breadcrumb">
		<li><a href="#">商品类型管理</a> <span class="divider">/</span></li>
		<li class="active">增加商品类型</li>
	</ul>
	<div class="alert">
		<button type="button" class="close" data-dismiss="alert">×</button>
		<h4>提示!</h4>
		<strong>${msg}</strong>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<form class="form-horizontal"
				action="${pageContext.request.contextPath}/goodstype/add"
				method="get">
				<div class="control-group">
					<label class="control-label" for="name">商品类型名称</label>
					<div class="controls">
						<input id="name" type="text" name="name" />
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="state">商品类型状态</label>
					<div class="controls">
						<select name="state">
							<option value="1">正常</option>
							<option value="0">不可用</option>
						</select>
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
</body>
</html>