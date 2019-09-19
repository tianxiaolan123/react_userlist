const Service=require("egg").Service;

class UserService extends Service{
    async userlist(){
        let result=await this.app.mysql.select("users")
        // console.log(result)
        return result;
    }
      
     //详情
     async getdetail(uid){
         return await this.app.mysql.get("users",{uid})
     }

    
     //删除
     async getdel(uid){
         console.log(uid,'1')
         return await this.app.mysql.delete("users",{uid:uid})
     }

      //添加
      async addlist(username,name,password,tel,address){
          console.log(username,"111")
         return await this.app.mysql.insert("users",{
             username:username,
             name:name,
             tel:tel,
             address:address,
         })
      }









    async right(uid,type){
       let row={}
       
       if(type=="add"){
           row={
               uid,
               type:1
           }
       }else{
           console.log(type,222)
           row={
               uid,
               type:0,
           }
       }
       const result=await this.app.mysql.update("users",row)
       if(result.affectedRows===1){
           return{
               code:1,
               message:"更新成功"
           }
       }else{
            return {
                code:0,
                message:"更新失败"
            }
       }
        
    }

  }
module.exports=UserService;

