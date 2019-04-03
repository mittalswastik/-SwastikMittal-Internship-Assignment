import React, { Component } from 'react';
import data from '../Data/constant.js';	
import '../Css/Page2.css';

class Page2 extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: null
		}
	}

	componentDidMount() {
		
		if(this.props.location.state != null){
			this.setState({
				id: this.props.location.state.val
			})
		}
	}

	getData = (obj) => {
		
		let rows = [];

		for(let x in obj){
			let cell = [];
			let rowid = `row${x}`;
			let cellid = `cell1-${x}`;
			cell.push(<td key={cellid} id={cellid}>{x}</td>);
			cellid = `cell2-${x}`;	
			cell.push(<td key={cellid} id={cellid}>{obj[x]}</td>);
			rows.push(<tr key={x} id={rowid}>{cell}</tr>)
		}

		return rows;
	}

	render(){
		if(this.state.id != null){
			let datafill = this.getData(data[JSON.parse(this.state.id)]) 
			return(
				<div id="head">
					<div>
						<h1>Census Demographic Data For Region With Zip Code {this.state.id}</h1>
					</div>
					<div id="tablular">
						<table id="tab">
							<tbody id="tbod">
								{datafill}
							</tbody>
						</table>
					</div>
				</div>
			);
		}

		else {
			return (
				<div>
					Reach This Page After Clicking The ZipCode On The Map
				</div>
			);
		}
	}

}

export default Page2;