/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import StructureTableControl from "../../../src/common-properties/controls/structuretable";
import { mountWithIntl } from "enzyme-react-intl";

import { expect } from "chai";
import sinon from "sinon";
import propertyUtils from "../../_utils_/property-utils";
import Controller from "../../../src/common-properties/properties-controller";
import isEqual from "lodash/isEqual";

import structuretableParamDef from "../../test_resources/paramDefs/structuretable_paramDef.json";
import structuretableMultiInputParamDef from "../../test_resources/paramDefs/structuretable_multiInput_paramDef.json";
import filterColumnParamDef from "../../test_resources/paramDefs/Filter_paramDef.json";

const controller = new Controller();

const control = {
	"name": "keys",
	"label": {
		"text": "Sort by"
	},
	"controlType": "structuretable",
	"moveableRows": true,
	"addRemoveRows": true,
	"valueDef": {
		"propType": "structure",
		"isList": true,
		"isMap": false
	},
	"subControls": [
		{
			"name": "field",
			"label": {
				"text": "Field"
			},
			"visible": true,
			"width": 28,
			"controlType": "selectcolumn",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"filterable": true
		},
		{
			"name": "sort_order",
			"label": {
				"text": "Order"
			},
			"visible": true,
			"width": 16,
			"controlType": "toggletext",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"values": [
				"Ascending",
				"Descending"
			],
			"valueLabels": [
				"Ascending",
				"Descending"
			],
			"valueIcons": [
				"/images/up-triangle.svg",
				"/images/down-triangle.svg"
			]
		}
	],
	"keyIndex": 0,
	"defaultRow": [
		"Ascending"
	]
};

const readonlyControlDefault = {
	"name": "structuretableSortOrder",
	"label": {
		"text": "Sort by"
	},
	"description": {
		"text": "Use arrows to reorder the sorting priority",
		"placement": "on_panel"
	},
	"controlType": "structuretable",
	"valueDef": {
		"propType": "structure",
		"isList": true,
		"isMap": false
	},
	"subControls": [
		{
			"name": "field",
			"label": {
				"text": "Field"
			},
			"controlType": "selectcolumn",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false,
				"defaultValue": ""
			},
			"role": "column",
			"summary": true,
			"visible": true,
			"width": 28,
		}, {
			"name": "structuretable_sort_order_readonly_int",
			"label": {
				"text": "Index"
			},
			"description": {
				"text": "Auto generated integers starting at 5"
			},
			"controlType": "readonly",
			"valueDef": {
				"propType": "integer",
				"isList": false,
				"isMap": false,
				"defaultValue": "5"
			},
			"summary": true,
			"generatedValues": {
				"operation": "index"
			},
			"visible": true,
			"width": 16,
			"editStyle": "inline",
		}, {
			"name": "structuretable_sort_order",
			"label": {
				"text": "Order"
			},
			"description": {
				"text": "Update sort order"
			},
			"controlType": "toggletext",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false,
				"defaultValue": "Ascending"
			},
			"role": "enum",
			"values": [
				"Ascending", "Descending"
			],
			"valueLabels": [
				"Ascending", "Descending"
			],
			"valueIcons": [
				"/images/up-triangle.svg", "/images/down-triangle.svg"
			],
			"visible": true,
			"width": 16,
			"editStyle": "inline",
		}
	],
	"keyIndex": 0,
	"defaultRow": [
		"", "5", "Ascending"
	],
	"moveableRows": true,
};

const readonlyControlStartValue = {
	"name": "structuretableSortOrderStartValue",
	"label": {
		"text": "Sort by"
	},
	"description": {
		"text": "Use arrows to reorder the sorting priority",
		"placement": "on_panel"
	},
	"controlType": "structuretable",
	"valueDef": {
		"propType": "structure",
		"isList": true,
		"isMap": false
	},
	"subControls": [
		{
			"name": "structuretable_sort_order_readonly_int",
			"label": {
				"text": "From 5"
			},
			"description": {
				"text": "Auto generated integers starting at 5"
			},
			"controlType": "readonly",
			"valueDef": {
				"propType": "integer",
				"isList": false,
				"isMap": false,
				"defaultValue": "5"
			},
			"summary": true,
			"generatedValues": {
				"operation": "index",
				"startValue": 3
			},
			"visible": true,
			"width": 16,
		}, {
			"name": "field",
			"label": {
				"text": "Field"
			},
			"controlType": "selectcolumn",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false,
				"defaultValue": ""
			},
			"role": "column",
			"summary": true,
			"visible": true,
			"width": 28,
			"editStyle": "inline",
		}, {
			"name": "structuretable_sort_order",
			"label": {
				"text": "Order"
			},
			"description": {
				"text": "Update sort order"
			},
			"controlType": "toggletext",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false,
				"defaultValue": "Ascending"
			},
			"role": "enum",
			"values": [
				"Ascending", "Descending"
			],
			"valueLabels": [
				"Ascending", "Descending"
			],
			"valueIcons": [
				"/images/up-triangle.svg", "/images/down-triangle.svg"
			],
			"visible": true,
			"width": 16,
			"editStyle": "inline",
		}
	],
	"keyIndex": 0,
	"defaultRow": [
		"5", "", "Ascending"
	],
	"moveableRows": true,
};
const propValues = {
	structuretableSortOrder: [
		["Cholesterol", 1, "Ascending"],
		["Age", 11, "Descending"],
		["Drug", 111, "Ascending"]
	],
	structuretableSortOrderStartValue: [
		[0, "Cholesterol", "Ascending"],
		[5, "Age", "Descending"],
		[8, "Drug", "Ascending"]
	],
	keys: [
		["Na", "Ascending"],
		["Drug", "Descending"],
		["Sex", "Ascending"],
		["Age", "Descending"],
		["BP", "Ascending"],
		["Cholesterol", "Ascending"]
	]
};

const propertyId = { name: "keys" };
const propertyIdReadonlyControl = { name: "structuretableSortOrder" };
const propertyIdReadonlyControlStartValue = { name: "structuretableSortOrderStartValue" };

propertyUtils.setControls(controller, [control, readonlyControlDefault, readonlyControlStartValue]);

function setPropertyValue() {
	controller.setPropertyValues(getCopy(propValues));
}

function getCopy(value) {
	return JSON.parse(JSON.stringify(value));
}

function genUIItem() {
	return <div />;
}

const openFieldPicker = sinon.spy();
setPropertyValue();
describe("structuretable control renders correctly", () => {

	it("props should have been defined", () => {
		const wrapper = mountWithIntl(
			<StructureTableControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				buildUIItem={genUIItem}
				openFieldPicker={openFieldPicker}
				rightFlyout
			/>
		);

		expect(wrapper.prop("control")).to.equal(control);
		expect(wrapper.prop("controller")).to.equal(controller);
		expect(wrapper.prop("propertyId")).to.equal(propertyId);
		expect(wrapper.prop("buildUIItem")).to.equal(genUIItem);
	});

	it("should render a `structuretable` control", () => {
		const wrapper = mountWithIntl(
			<StructureTableControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				buildUIItem={genUIItem}
				openFieldPicker={openFieldPicker}
				rightFlyout
			/>
		);

		expect(wrapper.find("div[data-id='properties-keys']")).to.have.length(1);
		// should have a search bar
		expect(wrapper.find("div.properties-ft-search-container")).to.have.length(1);
		// should have add/remove buttons
		const buttons = wrapper.find(".properties-at-buttons-container");
		expect(buttons).to.have.length(1);
		expect(buttons.find("button.properties-add-fields-button")).to.have.length(1);
		expect(buttons.find("button.properties-remove-fields-button")).to.have.length(1);
		expect(buttons.find("button.properties-remove-fields-button").prop("disabled")).to.equal(true);
		// should have moveable table rows
		const moveableRowsContainer = wrapper.find(".properties-mr-button-container");
		expect(moveableRowsContainer).to.have.length(1);
		expect(moveableRowsContainer.find("button.table-row-move-button[disabled=true]")).to.have.length(4);
	});


	it("should select add columns button and field picker should display", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureTableControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				buildUIItem={genUIItem}
				openFieldPicker={openFieldPicker}
				rightFlyout
			/>
		);

		// select the add column button
		const tableWrapper = wrapper.find("div[data-id='properties-keys']");
		const addFieldsButtons = tableWrapper.find("button.properties-add-fields-button"); // field picker buttons
		addFieldsButtons.at(0).simulate("click"); // open filter picker

		// validate the field picker table displays
		expect(openFieldPicker).to.have.property("callCount", 1);
	});

	it("should select row and remove button row should be removed", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureTableControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				buildUIItem={genUIItem}
				openFieldPicker={openFieldPicker}
				rightFlyout
			/>
		);

		// ensure the remove column button is disabled
		let tableWrapper = wrapper.find("div[data-id='properties-keys']");
		let removeFieldsButtons = tableWrapper.find("button.properties-remove-fields-button"); // field picker buttons
		expect(removeFieldsButtons.prop("disabled")).to.equal(true);

		// select the first row in the table
		const tableData = tableWrapper.find("tbody.reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.first().simulate("click");

		// ensure removed button is enabled and select it
		tableWrapper = wrapper.find("div[data-id='properties-keys']");
		removeFieldsButtons = tableWrapper.find("button.properties-remove-fields-button"); // field picker buttons
		expect(removeFieldsButtons.prop("disabled")).to.equal(false);
		removeFieldsButtons.at(0).simulate("click"); // remove a row

		// validate the first row is deleted
		const tableRows = controller.getPropertyValue(propertyId);
		expect(tableRows[0][0]).to.equal("Drug");
	});
});

describe("condition renders correctly with structure table control", () => {
	var wrapper;
	var renderedController;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(structuretableParamDef);
		wrapper = renderedObject.wrapper;
		renderedController = renderedObject.controller;
	});

	afterEach(() => {
		wrapper.unmount();
	});
	it("should render a table error message", () => {
		const conditionsPropertyId = { name: "structuretableReadonlyColumnStartValue" };
		expect(renderedController.getPropertyValue(conditionsPropertyId)).to.have.length(1);
		renderedController.updatePropertyValue(conditionsPropertyId, []);

		const structuretableSortOrderErrorMessages = {
			"validation_id": "structuretableReadonlyColumnStartValue",
			"type": "error",
			"text": "table cannot be empty"
		};
		const actual = renderedController.getErrorMessage(conditionsPropertyId);
		expect(isEqual(JSON.parse(JSON.stringify(structuretableSortOrderErrorMessages)),
			JSON.parse(JSON.stringify(actual)))).to.be.true;

		wrapper.update();
		propertyUtils.openSummaryPanel(wrapper, "structuretableReadonlyColumnStartValue-summary-panel");

		const tableWrapper = wrapper.find("div[data-id='properties-structuretableReadonlyColumnStartValue']");
		expect(tableWrapper.find("div.properties-validation-message")).to.have.length(1);
		expect(tableWrapper.find("div.properties-validation-message span")
			.text()).to.be.equal(structuretableSortOrderErrorMessages.text);
	});
	it("should render an table cell error", () => {
		// set error condition on cell
		const conditionsPropertyId = { name: "structuretableErrors", row: 0, col: 2 };
		renderedController.updatePropertyValue(conditionsPropertyId, "Descending");
		wrapper.update();
		// open the summary panel
		propertyUtils.openSummaryPanel(wrapper, "structuretableErrors-summary-panel");
		// validate there are cell errors
		const errorMessage = {
			"id_ref": "structuretableErrors",
			"table_ref": { "row": "0", "col": "2" },
			"validation_id": "structuretableErrors",
			"type": "error",
			"text": "order cannot be descending"
		};
		expect(renderedController.getErrorMessages(conditionsPropertyId)).to.eql([errorMessage]);
		const tableWrapper = wrapper.find("div[data-id='properties-ft-structuretableErrors']");
		expect(tableWrapper.find("div.properties-validation-message span").text()).to.equal(errorMessage.text);
	});
	it("should hide a table", () => {
		// set the hide flag
		const conditionsPropertyId = { name: "showRenameFieldsTable", };
		renderedController.updatePropertyValue(conditionsPropertyId, false);
		wrapper.update();
		// open the summary panel
		propertyUtils.openSummaryPanel(wrapper, "structuretableRenameFields-summary-panel");

		// verify the table is HIDDEN
		const tableControlDiv = wrapper.find("div[data-id='properties-ci-structuretableRenameFields']");
		expect(tableControlDiv.hasClass("hide")).to.be.true;
		expect(renderedController.getControlState({ name: "structuretableRenameFields" })).to.equal("hidden");
	});
	it("should disable a table", () => {
		// set the disable flag
		const conditionsPropertyId = { name: "enableSortByTable", };
		renderedController.updatePropertyValue(conditionsPropertyId, false);
		wrapper.update();
		// open the summary panel
		propertyUtils.openSummaryPanel(wrapper, "structuretableSortOrder-summary-panel");

		// verify the table is disabled
		const tableControlDiv = wrapper.find("div[data-id='properties-ci-structuretableSortOrder']");
		expect(tableControlDiv.prop("disabled")).to.be.true;
		expect(renderedController.getControlState({ name: "structuretableSortOrder" })).to.equal("disabled");
	});
	it("should hide a table cell", () => {
		// set the hide flag
		const conditionsPropertyId = { name: "dummy_types", row: 0, col: 1 };
		renderedController.updatePropertyValue(conditionsPropertyId, false);
		wrapper.update();
		// open the summary panel
		propertyUtils.openSummaryPanel(wrapper, "dummy_types-summary-panel");

		// verify the table is HIDDEN
		const cellControlDiv = wrapper.find("div[data-id='properties-dummy_types_0_4']");
		expect(cellControlDiv.hasClass("hide")).to.be.true;
		expect(renderedController.getControlState({ name: "dummy_types", row: 0, col: 4 })).to.equal("hidden");
	});
	it("should disable a table cell", () => {
		// set the disable flag
		const conditionsPropertyId = { name: "dummy_types", row: 0, col: 1 };
		renderedController.updatePropertyValue(conditionsPropertyId, false);
		wrapper.update();
		// open the summary panel
		propertyUtils.openSummaryPanel(wrapper, "dummy_types-summary-panel");

		// verify the table is HIDDEN
		const cellControlDiv = wrapper.find("div[data-id='properties-dummy_types_0_5']");
		expect(cellControlDiv.find("input").prop("disabled")).to.be.true;
		expect(renderedController.getControlState({ name: "dummy_types", row: 0, col: 5 })).to.equal("disabled");
	});
});


describe("structuretable control with readonly numbered column renders correctly", () => {
	beforeEach(() => {
		setPropertyValue();
	});
	it("should have displayed the correct generatedValues with default index values", () => {
		const wrapper = mountWithIntl(
			<StructureTableControl
				control={readonlyControlDefault}
				controller={controller}
				propertyId={propertyIdReadonlyControl}
				buildUIItem={genUIItem}
				openFieldPicker={openFieldPicker}
				rightFlyout
			/>
		);

		const rows = wrapper.find("tr.table-row");
		expect(rows).to.have.length(3);

		const expectedData = "[[\"Cholesterol\",1,\"Ascending\"],[\"Age\",2,\"Descending\"],[\"Drug\",3,\"Ascending\"]]";
		const controllerData = controller.getPropertyValue(propertyIdReadonlyControl);
		expect(JSON.stringify(controllerData)).to.equal(expectedData);
	});

	it("should have displayed the correct generatedValues with startValue", () => {
		const wrapper = mountWithIntl(
			<StructureTableControl
				control={readonlyControlStartValue}
				controller={controller}
				propertyId={propertyIdReadonlyControlStartValue}
				buildUIItem={genUIItem}
				openFieldPicker={openFieldPicker}
				rightFlyout
			/>
		);

		const rows = wrapper.find("tr.table-row");
		expect(rows).to.have.length(3);

		const expectedData = "[[3,\"Cholesterol\",\"Ascending\"],[4,\"Age\",\"Descending\"],[5,\"Drug\",\"Ascending\"]]";
		const controllerData = controller.getPropertyValue(propertyIdReadonlyControlStartValue);
		expect(JSON.stringify(controllerData)).to.equal(expectedData);
	});
});

describe("structuretable control with multi input schemas renders correctly", () => {
	let wrapper;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(structuretableMultiInputParamDef);
		wrapper = renderedObject.wrapper;
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should prefix the correct schema for fields selected", () => {
		// open the field picker on the table and select a few new columns
		propertyUtils.openSummaryPanel(wrapper, "structuretableReadonlyColumnStartValue-summary-panel");
		const fieldPicker = propertyUtils.openFieldPicker(wrapper, "properties-ft-structuretableReadonlyColumnStartValue");
		propertyUtils.fieldPicker(fieldPicker, ["0.BP", "data.BP", "2.BP"]);
		// save the changes
		wrapper.find("button[data-id='properties-apply-button']")
			.at(0)
			.simulate("click");
		// validate the schema name is saved in the summary list.
		const summaryPanel = wrapper.find("div[data-id='properties-structuretableReadonlyColumnStartValue-summary-panel']");
		const summaryRows = summaryPanel.find("td.properties-summary-row-data");
		expect(summaryRows).to.have.length(5);

		const expectedSummary = [
			"0.Cholesterol",
			"0.Age",
			"0.BP",
			"data.BP",
			"2.BP"
		];

		for (let idx = 0; idx < summaryRows.length; idx++) {
			expect(summaryRows.at(idx)
				.find("span")
				.at(0)
				.text()
				.trim()).to.equal(expectedSummary[idx]);
		}
	});
});


describe("structuretable control displays with no header and no button", () => {
	let wrapper;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(structuretableParamDef);
		wrapper = renderedObject.wrapper;
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should display header", () => {
		// open the summary panel
		const table = propertyUtils.openSummaryPanel(wrapper, "structuretableReadonlyColumnDefaultIndex-summary-panel");
		const header = table.find(".reactable-column-header");
		expect(header).to.have.length(1);
	});
	it("should display no header", () => {
		const table = propertyUtils.openSummaryPanel(wrapper, "structuretableNoHeader-summary-panel");
		const header = table.find(".reactable-column-header");
		expect(header).to.have.length(0);
	});
	it("should not have add remove buttons for the table", () => {
		const table = propertyUtils.openSummaryPanel(wrapper, "structuretableNoButtons-summary-panel");
		// no add/remove buttons should be rendered
		expect(table.find(".properties-at-buttons-container")).to.have.length(0);
	});
});

describe("structuretable control displays with checkbox header", () => {
	let wrapper;
	let renderedController;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(filterColumnParamDef);
		wrapper = renderedObject.wrapper;
		renderedController = renderedObject.controller;
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should display header with checkbox", () => {
		const tableCheckboxHeader = wrapper.find("input#field_types2"); // find the table header
		expect(tableCheckboxHeader).to.have.length(1);
		expect(tableCheckboxHeader.prop("type")).to.equal("checkbox");
	});
	it("checkbox header on should select column value for all rows", () => {
		const colPropertyId = { name: "field_types" };
		// validate the original state
		let columnValues = renderedController.getPropertyValue(colPropertyId);
		expect(columnValues).to.have.length(3);
		expect(columnValues[0][2]).to.be.equal(false);
		expect(columnValues[1][2]).to.be.equal(true);
		expect(columnValues[2][2]).to.be.equal(false);
		// set the column header checkbox to true
		const tableCheckboxHeader = wrapper.find("input[type='checkbox']").at(0); // find the table header checkbox
		tableCheckboxHeader.getDOMNode().checked = true;
		tableCheckboxHeader.simulate("change");
		// validate all rows checkboxes are true
		columnValues = renderedController.getPropertyValue(colPropertyId);
		expect(columnValues[0][2]).to.be.equal(true);
		expect(columnValues[1][2]).to.be.equal(true);
		expect(columnValues[2][2]).to.be.equal(true);
	});
	it("checkbox header off should un-select column value for all rows", () => {
		const colPropertyId = { name: "field_types" };
		// validate the original state
		let columnValues = renderedController.getPropertyValue(colPropertyId);
		expect(columnValues).to.have.length(3);
		expect(columnValues[0][2]).to.be.equal(false);
		expect(columnValues[1][2]).to.be.equal(true);
		expect(columnValues[2][2]).to.be.equal(false);
		// set the column header checkbox to true
		const tableCheckboxHeader = wrapper.find("input[type='checkbox']").at(0); // find the table header checkbox
		tableCheckboxHeader.simulate("change", { target: { checked: false, id: "field_types2" } });
		// validate all rows checkboxes are true
		columnValues = renderedController.getPropertyValue(colPropertyId);
		expect(columnValues[0][2]).to.be.equal(false);
		expect(columnValues[1][2]).to.be.equal(false);
		expect(columnValues[2][2]).to.be.equal(false);
	});

});
