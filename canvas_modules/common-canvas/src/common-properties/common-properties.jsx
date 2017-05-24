/****************************************************************
** IBM Confidential
**
** OCO Source Materials
**
** SPSS Modeler
**
** (c) Copyright IBM Corp. 2017
**
** The source code for this program is not published or otherwise
** divested of its trade secrets, irrespective of what has been
** deposited with the U.S. Copyright Office.
*****************************************************************/

import React from "react";
import PropertiesDialog from "./properties-dialog.jsx";
import EditorForm from "./editor-controls/editor-form.jsx";
import Form from "./form/Form";

export default class CommonProperties extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPropertiesDialog: false
		};
		this.applyPropertiesEditing = this.applyPropertiesEditing.bind(this);
	}

	getForm() {
		if (this.props.propertiesInfo.operator) {
			return Form.makeForm(
				this.props.propertiesInfo.operator,
				this.props.propertiesInfo.inputDataModel,
				this.props.propertiesInfo.currentProperties,
				this.props.propertiesInfo.resources);
		}
		return this.props.propertiesInfo.formData;
	}

	applyPropertiesEditing() {
		var settings = this.refs.editorForm.getControlValues();
		// May need to close the dialog inside the callback in
		// case of validation errors
		this.props.propertiesInfo.closePropertiesDialog();
		this.props.propertiesInfo.applyPropertyChanges(settings, this.props.propertiesInfo.appData);
	}


	render() {
		const formData = this.getForm();
		if (formData !== null) {
			let propertiesDialog = [];
			if (this.props.showPropertiesDialog) {
				let uiConditions = {};
				if (typeof this.props.uiConditions !== "undefined") {
					uiConditions = {
						uiConditions: this.props.uiConditions
					};
				}

				const editorForm = (<EditorForm {...uiConditions}
					ref="editorForm"
					key={Date()}
					form={formData}
					additionalComponents={this.props.propertiesInfo.additionalComponents}
				/>);
				const title = this.props.propertiesInfo.title;
				const size = formData.editorSize;
				propertiesDialog = (<PropertiesDialog
					onHide={this.props.propertiesInfo.closePropertiesDialog}
					title={title}
					bsSize={size}
					okHandler={this.applyPropertiesEditing}
					cancelHandler={this.props.propertiesInfo.closePropertiesDialog}
				>
					{editorForm}
				</PropertiesDialog>);
			}
			return (
				<div>
					{propertiesDialog}
				</div>
			);
		}
		return <div />;
	}
}

CommonProperties.propTypes = {
	showPropertiesDialog: React.PropTypes.bool.isRequired,
	propertiesInfo: React.PropTypes.object.isRequired,
	uiConditions: React.PropTypes.array
};
