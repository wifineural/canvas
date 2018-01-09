/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { expect } from "chai";
import propertyUtils from "../_utils_/property-utils";
import uiItemParamDef from "../test_resources/paramDefs/uiItems_paramDef.json";

describe("editor-form renders correctly with correct uiItems", () => {
	const wrapper = propertyUtils.flyoutEditorForm(uiItemParamDef);
	it("should have displayed correct number of staticText elements", () => {
		const staticText = wrapper.find(".static-text");
		expect(staticText).to.have.length(3);
		const staticTextIcons = wrapper.find(".static-text-icon");
		expect(staticTextIcons).to.have.length(1);
		const staticTextWithIcon = wrapper.find(".static-text.info");
		expect(staticTextWithIcon).to.have.length(1);
	});
	it("should have displayed correct text in staticText elements", () => {
		const staticText = wrapper.find(".static-text");
		expect(staticText.at(0).text()).to.equal("Some helpful text before the control");
		const staticTextWithIcon = wrapper.find(".static-text.info");
		expect(staticTextWithIcon.at(0).text()).to.equal("Hint: should have a separator after and icon");
	});
	it("should have displayed correct number of separator elements", () => {
		const separators = wrapper.find(".h-separator");
		expect(separators).to.have.length(2);
	});
});