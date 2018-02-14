import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Smurf from './Smurf';
import { Row, Col } from 'reactstrap';
import SmurfList from "./SmurfList";


const App = ({
	store: {
		smurfsStore,
		width,
		startDrag
	}
}) => {
	const {
		activeItem, deleting
	} = smurfsStore;

	 const content = activeItem ?
		<Smurf {...activeItem} /> :
		<div className="text-center text-muted">Choose a smurf on the left...</div>;

	return (
		<Row className="h-100 bg-white" noGutters>
			<Col className="br overflow-auto" style={{ flex: `0 0 ${width}px` }}>
				<SmurfList store={smurfsStore} />
				{ deleting && <div className="overlay"/> }
			</Col>
			<Col style={{flex: '0 0 5px', cursor: 'col-resize'}} onMouseDown={startDrag}/>
			<Col className="d-flex align-items-center justify-content-center">
				<div className="w-50">
					{content}
				</div>
			</Col>
		</Row>
	);
};

export default observer(App);