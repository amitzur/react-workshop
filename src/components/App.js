import React, { Component } from 'react';
import Smurf from './Smurf';
import SmurfItem from './SmurfItem';
import { Row, Col } from 'reactstrap';

export default class App extends Component {

	state = {
		activeItem: null,
		data: this.props.data
	};

	onItemClick = (item) => {
		const newData = [...this.state.data];
		newData.splice(newData.indexOf(item), 1, Object.assign(item, {isRead: true}));
		this.setState({
			activeItem: item,
			data: newData
		});
	};

	render() {
		const { data } = this.state;

		const content = this.state.activeItem ?
			<Smurf {...this.state.activeItem} /> :
			<div className="text-center text-muted">Choose a smurf on the right...</div>;

		return (
			<Row className="h-100 bg-white" noGutters>
				<Col xs="auto" className="br overflow-auto">
					{data.map(smurf => <SmurfItem key={smurf.name} item={smurf} onClick={this.onItemClick}/>)}
				</Col>
				<Col className="d-flex align-items-center justify-content-center">
					<div className="w-50">
						{content}
					</div>
				</Col>
			</Row>
		);
	}
}