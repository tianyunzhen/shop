/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
;layui.define("form", function (e) {
    var s = layui.$, t = (layui.layer, layui.laytpl, layui.setter, layui.view, layui.admin), i = layui.form,
        a = s("body");
    i.verify({
        nickname: function (e, s) {
            return new RegExp("^[a-zA-Z0-9_一-龥\\s·]+$").test(e) ? /(^\_)|(\__)|(\_+$)/.test(e) ? "用户名首尾不能出现下划线'_'" : /^\d+\d+\d$/.test(e) ? "用户名不能全为数字" : void 0 : "用户名不能有特殊字符"
        }, pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"]
    }), t.sendAuthCode({
        elem: "#LAY-user-getsmscode",
        elemPhone: "#LAY-user-login-cellphone",
        elemVercode: "#LAY-user-login-vercode",
        ajax: {url: layui.setter.base + "json/user/sms.js"}
    }), a.on("click", "#LAY-user-get-vercode", function () {
        s(this);
        this.src = "https://www.oschina.net/action/user/captcha?t=" + (new Date).getTime()
    }), e("user", {})

    i.render();
    //登录
    i.on('submit(LAY-user-login-submit)', function (obj) {
        //请求登入接口
        layui.admin.req({
            url: layui.setter.api + 'api/index/login' //实际使用请改成服务端真实接口
            , data: obj.field
            , done: function (res) {
                //请求成功后，写入 access_token
                layui.data(layui.setter.tableName, {
                    key: layui.setter.request.tokenName
                    , value: res.data.access_token
                });
                //登入成功的提示与跳转
                layer.msg('登入成功', {
                    icon: 1
                    , time: 1000
                }, function () {
                    location.href = '../'; //后台主页
                });
            }
        });
    });

    //注册
    i.on('submit(LAY-user-reg-submit)', function (obj) {
        var field = obj.field;
        //确认密码
        if (field.password !== field.repass) {
            return layer.msg('两次密码输入不一致');
        }
        //请求接口
        layui.admin.req({
            url: layui.setter.base + 'json/user/reg.js' //实际使用请改成服务端真实接口
            , data: field
            , done: function (res) {
                layer.msg('注册成功', {
                    icon: 1
                    , time: 1000
                }, function () {
                    location.href = 'login.html'; //跳转到登入页
                });
            }
        });
        return false;
    });

    //密码重设
    i.on('submit(LAY-user-forget-resetpass)', function(obj){
        var field = obj.field;
        //确认密码
        if(field.password !== field.repass){
            return layer.msg('两次密码输入不一致');
        }
        //请求接口
        layui.admin.req({
            url: layui.setter.base + 'json/user/resetpass.js' //实际使用请改成服务端真实接口
            ,data: field
            ,done: function(res){
                layer.msg('密码已成功重置', {
                    icon: 1
                    ,time: 1000
                }, function(){
                    location.href = 'login.html'; //跳转到登入页
                });
            }
        });
        return false;
    });
});