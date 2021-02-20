<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询商品类型</title>
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
		<li class="active">商品类型列表</li>
	</ul>

	<div class="row-fluid">
		<form class="form-search" style="padding: 5px">
			<button class="btn btn-success" type="button"
				onclick="window.location.href='${pageContext.request.contextPath}/goodstype/toadd';">增加</button>
		</form>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>商品类型名称</th>
					<th>状态</th>
					<th>编辑</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${list}" var="item">
				<tr>
					<td>${item.name}</td>
					<td>
						<c:choose>
							<c:when test="${item.state==1}">
								正常
							</c:when>
							<c:otherwise>
								不可用
							</c:otherwise>
						</c:choose>
					</td>
					<td>
					<a href="${pageContext.request.contextPath}/goodstype/toedit?id=${item.id}">编辑</a>
					</td>
				</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</body>
</html>