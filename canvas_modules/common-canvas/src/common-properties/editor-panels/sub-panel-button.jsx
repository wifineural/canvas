/****************************************************************
** IBM Confidential
**
** OCO Source Materials
**
** SPSS Modeler
**
** (c) Copyright IBM Corp. 2016
**
** The source code for this program is not published or otherwise
** divested of its trade secrets, irrespective of what has been
** deposited with the U.S. Copyright Office.
*****************************************************************/

import logger from "../../../utils/logger";
import React from "react";
import { Button } from "react-bootstrap";

import SubPanelInvoker from "./sub-panel-invoker.jsx";

export default class SubPanelButton extends React.Component {
	constructor(props) {
		super(props);
		this.showSubPanel = this.showSubPanel.bind(this);
		this.onSubPanelHidden = this.onSubPanelHidden.bind(this);
	}


	onSubPanelHidden(applyChanges) {
		logger.info("onSubPanelHidden(): applyChanges=" + applyChanges);

		if (typeof this.props.notifyFinishedEditing !== "undefined") {
			this.props.notifyFinishedEditing(applyChanges);
		}
	}

	showSubPanel() {
		logger.info("Button.showSubPanel()");
		if (typeof this.props.notifyStartEditing !== "undefined") {
			this.props.notifyStartEditing();
		}

		this.refs.invoker.showSubDialog(this.props.title, this.props.panel, this.onSubPanelHidden);
	}

	render() {
		const button = (<Button
			style={{ "display": "inline" }}
			bsSize="xsmall"
			onClick={this.showSubPanel}
		>
			{this.props.label}
		</Button>);
		return (
			<SubPanelInvoker ref="invoker">
				{button}
			</SubPanelInvoker>
		);
	}
}

SubPanelButton.propTypes = {
	label: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired,
	panel: React.PropTypes.object.isRequired,
	notifyStartEditing: React.PropTypes.func,
	notifyFinishedEditing: React.PropTypes.func
};
