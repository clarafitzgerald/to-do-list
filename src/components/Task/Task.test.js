import React from "react";
import { shallow } from "enzyme";
import Task from "./Task";
import data from "../../containers/Tasks/dummyData";
describe("Test startEditingTitle", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Task taskData={data} key={data.docId} />);
  });
  // test("startEditingTitle should call the updateTitle method when title edit active is true", () => {
  //   const spy = jest.spyOn(component, component.updateTitle);
  //   component.setState({ isTitleEditActive: true });
  //   component.startEditingTitle();
  //   expect(spy).toHaveBeenCalled();
  // });

  test("checkbox click", () => {
    component.find("#checkCircle").simulate("click");
    expect(component.state.status).toEqual(false);
  });

  // test("startEditingTitle should set title to equal this.props.taskData.title and change title edit active when title edit active is false", () => {
  //   component.setState({isTitleEditActive: false})
  //   component.
  // });
});
