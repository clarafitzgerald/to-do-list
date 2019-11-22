import React from "react";
import { shallow } from "enzyme";
import Tasks from "./Tasks";
import Task from "../../components/Task";
import data from "./dummyData";

describe("Tasks Tests", () => {
  let component;
  let testFunction;

  beforeEach(() => {
    testFunction = jest.fn();
    component = shallow(<Tasks taskData={data} key={data.docId} />, {
      disableLifecycleMethods: true
    });
  });

  test("the number of tasks rendered should match the number of tasks in data", () => {
    component.setState({
      tasks: data
    });

    const numberTasksRendered = component.find(Task).length;
    const numberDummyTasks = data.length;

    expect(numberTasksRendered).toEqual(numberDummyTasks);
  });
});
