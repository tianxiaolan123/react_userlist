import React, { Component } from 'react';
import axios from 'axios';
import "./detail.css"
export default class Detail extends Component {
	state = {
		detail: {}
	};
	render() {
		let { detail } = this.state;

		return (
			<div className="detail">
				
					 <p><img src={detail.img} alt=""/></p>
                     <h3>{detail.username}</h3>
				
			</div>
		);
	}
	componentDidMount() {
		// console.log(this.props.location.state.uid)
		let uid = this.props.location.state.uid;
		axios.get('/detail?uid=' + uid).then(res => {
			this.setState({
				detail: res.data.result
			});
		});
	}
}
