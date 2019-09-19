'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {
   //获取数据库数据
  async userlist() {
    const { ctx ,service} = this;
    let result=await service.user.userlist()
     ctx.body={
        ...{result},
         code:1,
     }
   
  }

   //详情
  async getdetail() {
    const { ctx ,service} = this;
     let uid=ctx.query.uid;
     console.log(uid,"11")
     let result= await service.user.getdetail(uid);
      ctx.body={
        ...{result},
        code:1,
    }
  }
  
    //删除
    async getdel(){
      const {ctx,service}=this;
      let uid=ctx.query.uid;
      let result=await service.user.getdel(uid)
        ctx.body=result;
    }
    
    //添加
    async addlist(){
      const {ctx,service}=this;
      let username=ctx.request.body.username;
      let name=ctx.request.body.name;
      let password=ctx.request.body.password;
      let tel=ctx.request.body.tel;
      let address=ctx.request.body.address;
     
      let result=await service.user.addlist(username,name,password,tel,address)
      ctx.body=result;
       
    }
    




    
     //点击设置管理变为管理员,并出现在右边
     async right(){
        const {ctx,service}=this;
        let {uid,type}=ctx.query;
        console.log(uid,type)
        let result=await service.user.right(uid,type)
        ctx.body=result;
        
     }

  
}

module.exports = userController;
