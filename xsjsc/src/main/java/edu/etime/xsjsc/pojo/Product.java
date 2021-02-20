package edu.etime.xsjsc.pojo;

import java.util.Date;

public class Product {
    private String id;

    private String name;

    private Double price;

    private String title;

    private Integer stock;

    private Integer number;

    private String description;

    private Date publishtime;

    private Integer recommend;

    private Integer oldest;

    private Integer hot;

    private String fields1;

    private String fields2;

    private String fields3;

    private String typeid;

    private String typename;

    private String imgs;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }


    public Date getPublishtime() {
        return publishtime;
    }

    public void setPublishtime(Date publishtime) {
        this.publishtime = publishtime;
    }

    public Integer getRecommend() {
        return recommend;
    }

    public void setRecommend(Integer recommend) {
        this.recommend = recommend;
    }

    public Integer getOldest() {
        return oldest;
    }

    public void setOldest(Integer oldest) {
        this.oldest = oldest;
    }

    public Integer getHot() {
        return hot;
    }

    public void setHot(Integer hot) {
        this.hot = hot;
    }

    public String getFields1() {
        return fields1;
    }

    public void setFields1(String fields1) {
        this.fields1 = fields1 == null ? null : fields1.trim();
    }

    public String getFields2() {
        return fields2;
    }

    public void setFields2(String fields2) {
        this.fields2 = fields2 == null ? null : fields2.trim();
    }

    public String getFields3() {
        return fields3;
    }

    public void setFields3(String fields3) {
        this.fields3 = fields3 == null ? null : fields3.trim();
    }

    public String getTypeid() {
        return typeid;
    }

    public void setTypeid(String typeid) {
        this.typeid = typeid == null ? null : typeid.trim();
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename == null ? null : typename.trim();
    }

    public String getImgs() {
        return imgs;
    }

    public void setImgs(String imgs) {
        this.imgs = imgs == null ? null : imgs.trim();
    }
}