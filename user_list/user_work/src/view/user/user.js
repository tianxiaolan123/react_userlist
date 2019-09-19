import React, { Component } from 'react';
import axios from 'axios';
import '../user/user.css';
export default class User extends Component {
	state = {
        userlist: [],
        username: '',
		name: '',
		password: '',
		tel: '',
        address: '',
        flag:false,
	};
	render() {
		let { userlist, username, name, password, tel, address,flag }=this.state;
		return (
			<div className="box">
				<div className="userlist">
                     <button onClick={this.add.bind(this)}>添加</button>
					<ul>
						{userlist &&
							userlist.map((item, index) => {
								return (
									<li key={index}>
										<img src={item.img} alt="" /> &nbsp;<span>{item.username}&nbsp; &nbsp; &nbsp;</span><span>{item.name}</span> &nbsp; &nbsp; <span>电话:{item.tel}</span><span> &nbsp; &nbsp;地址:{item.address}</span> &nbsp; &nbsp; &nbsp; &nbsp;
										<button onClick={this.handitem.bind(this, item.uid)}>详情</button> &nbsp;&nbsp;
										&nbsp; &nbsp;<button  onClick={this.handupdate.bind(this,item.uid,item.type)}>设置管理</button> &nbsp; &nbsp; &nbsp;<button>编辑</button>{' '}
										&nbsp; &nbsp; &nbsp;<button
											style={{ background: 'red', color: '#fff', border: '1px solid #ccc' }}
											onClick={this.handdel.bind(this, item.uid)}
										>
											删除
										</button>
									</li>
								);
							})}
					</ul>
				</div>
				 <div className="right">
					   {
						  userlist && userlist.map((item,index)=>{
							  return  <li key={index}>
								      <span>{item.username}</span>
									  <span>{item.name}</span>
									  <span>{item.address}</span>
							  </li>
						  })
					  } 
				 </div>
                 {
                     flag ?   <div className="daling">
                    <div className="mask">
                        <p>昵称&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入昵称" name="username" value={username} onChange={this.handChange.bind(this)}/></p>
                        <p>姓名&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入姓名" name="name" value={name}  onChange={this.handChange.bind(this)}/></p>
                        <p>密码&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入密码" name="password" value={password}  onChange={this.handChange.bind(this)}/></p>
                        <p>电话&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入电话" name="tel" value={tel}  onChange={this.handChange.bind(this)}/></p>
                        <p>地址&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入地址" name="address" value={address}  onChange={this.handChange.bind(this)}/></p>
                         <button onClick={this.none.bind(this)}>取消</button> <button onClick={this.sure.bind(this)}>确定</button>
                    </div>
                </div> :null
                 }
			</div>
		);
	}
	componentDidMount() {
		axios.get('/user').then(res => {
			this.setState({
				userlist: res.data.result
			});
		});
	}
	//跳入详情
	handitem(uid) {
		let { history } = this.props;
		history.push('/detail', { uid });
	}
    
    //删除
	handdel(uid) {
		console.log(uid);
		let { uerlist } = this.state;
		axios.get(`/delete?uid=${uid}`).then(res => {
			if (res.data.affectedRows === 1) {
				axios.get('/user').then(res => {
					this.setState({
						userlist: res.data.result
					});
				});
			}
		});
	}
	


	
    // 设置管理
    handupdate(uid,type){
	   axios.get("/update?type=add&uid="+uid).then(res=>{
		   console.log(res.data)
	   })
	}
	




    add(){ //点击显示隐藏遮罩
       let {flag}=this.state;
       this.setState({
           flag:true
       })
    }
    //点击显示隐藏遮罩
    none(){
        let {flag}=this.state;
       this.setState({
           flag:false,
       }) 
    }


    //受控组件
    handChange(e){
      let target=e.target;
      let name=target.name;
      this.setState({
          [name]:e.target.value,
      })
    }
    sure(){ //点击请求add接口
     	let { userlist, username, name, password, tel, address,flag }=this.state;
       axios.post("/add",{
             username:username,
             name:name,
             password:password,
             tel:tel,
             address:address
       }).then(res=>{
		   if (res.data.affectedRows === 1) {
				axios.get('/user').then(res => {
					this.setState({
						userlist: res.data.result,
						flag:false,
					});
				});
			}
	   })
    }
}
