package edu.etime.xsjsc.pojo;

public class Customer {
    private String openid;
    
    private String nickname;

    public String getOpenid() {
        return openid;
    }

    public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setOpenid(String openid) {
        this.openid = openid == null ? null : openid.trim();
    }
}