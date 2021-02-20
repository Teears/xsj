<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品列表</title>
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
		<li><a href="#">商品管理</a> <span class="divider">/</span></li>
		<li class="active">商品列表</li>
	</ul>

	<div class="row-fluid">
		<form class="form-search" style="padding: 5px" method="post"
			action="${pageContext.request.contextPath}/product/list">
			<label>商品类型：</label> 
			<select class="input-medium search-query" name="typeid">
				<option value="-1">全部</option>
				<c:forEach items="${typelist}" var="type">
					<c:choose>
						<c:when test="${param.typeid==type.id}">
							<option value="${type.id}" selected="selected">${type.name}</option>
						</c:when>
						<c:otherwise>
							<option value="${type.id}">${type.name}</option>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</select> 
			
			<label>名称&关键字：</label> 
			<input class="input-medium search-query" type="text" name="name" value="${param.name}" /> 
			
			<label>是否热卖：</label>
			<select class="input-medium search-query" name="hot">
				<c:choose>
					<c:when test="${param.hot==1}">
						<option value="-1">全部</option>
						<option value="1" selected="selected">热卖</option>
						<option value="0">非热卖</option>
					</c:when>
					<c:when test="${param.hot==0}">
						<option value="-1">全部</option>
						<option value="1">热卖</option>
						<option value="0" selected="selected">非热卖</option>
					</c:when>
					<c:otherwise>
						<option value="-1">全部</option>
						<option value="1">热卖</option>
						<option value="0">非热卖</option>
					</c:otherwise>
				</c:choose>
			</select> 
			
			<label>是否首推：</label> 
			<select class="input-medium search-query" name="recommend">
				<c:choose>
					<c:when test="${param.recommend==1}">
						<option value="-1">全部</option>
						<option value="1" selected="selected">首推</option>
						<option value="0">非首推</option>
					</c:when>
					<c:when test="${param.recommend==0}">
						<option value="-1">全部</option>
						<option value="1">首推</option>
						<option value="0" selected="selected">非首推</option>
					</c:when>
					<c:otherwise>
						<option value="-1">全部</option>
						<option value="1">首推</option>
						<option value="0">非首推</option>
					</c:otherwise>
				</c:choose>
			</select> 
			<label>最新推荐：</label> <select class="input-medium search-query" name="oldest">
				<c:choose>
					<c:when test="${param.oldest==1}">
						<option value="-1">全部</option>
						<option value="1" selected="selected">最新</option>
						<option value="0">非最新</option>
					</c:when>
					<c:when test="${param.oldest==0}">
						<option value="-1">全部</option>
						<option value="1">最新</option>
						<option value="0" selected="selected">非最新</option>
					</c:when>
					<c:otherwise>
						<option value="-1">全部</option>
						<option value="1">最新</option>
						<option value="0">非最新</option>
					</c:otherwise>
				</c:choose>

			</select>
			<button type="submit" class="btn">查找</button>
			<button class="btn btn-success" type="button"
				onclick="window.location.href='${pageContext.request.contextPath}/product/toadd';">增加</button>
		</form>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>商品名称</th>
					<th>商品类型</th>
					<th>图片</th>
					<th>商品价格</th>
					<th>最新推荐</th>
					<th>热卖</th>
					<th>首推</th>
					<th>销售量</th>
					<th>库存量</th>
					<th>状态</th>
					<th>编辑</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${list}" var="p">
				<tr>
					<td>${p.name}</td>
					<td>${p.typename}</td>
					<td>
						<img alt="" src="${fileserver}/${p.fields2}" height="100px" width="100px">
					</td>
					<td>${p.price}</td>
					<td>
						<c:choose>
							<c:when test="${p.oldest==1}">
								最新推荐
							</c:when>
							<c:otherwise>
								不推荐
							</c:otherwise>
						</c:choose>
					</td>
					<td>${p.hot}</td>
					<td>${p.recommend}</td>
					<td>${p.number}</td>
					<td>${p.stock}</td>
					<td>
						<c:choose>
							<c:when test="${p.fields1==1}">
								上架
							</c:when>
							<c:otherwise>
								下架
							</c:otherwise>
						</c:choose>
					</td>
					<td>编辑
					<br>
						<a href="${pageContext.request.contextPath}/product/imgs/${p.id}">图片</a>
					</td>
				</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</body>
</html>