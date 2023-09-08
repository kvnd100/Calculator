import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import React from "react";
describe(App, () => {
  // Test case: Check if the calculator displays "0" initially
  it("displays correct initial value", () => {
    const { getByTestId } = render(<App />);
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("0");
  });

  // Test case: Check addition operation with proper data
  it("addition with proper data", () => {
    const { getByTestId, getByText } = render(<App />);

    // Simulate adding numbers and verifying the result
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("="));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("5");
  });

  // Test case: Check subtraction operation with proper data
  it("substraction with proper data", () => {
    const { getByTestId, getByText } = render(<App />);

    // Simulate subtracting numbers and verifying the result
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("-"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("="));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("46");
  });

  // Test case: Check division operation with proper data
  it("division with proper data", () => {
    const { getByTestId, getByText } = render(<App />);

    // Simulate dividing numbers and verifying the result
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("÷"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("="));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("10");
  });

  // Test case: Check multiplication operation with proper data
  it("multiplication with proper data", () => {
    // Simulate multiplicating numbers and verifying the result
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("x"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("="));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("25");
  });

  // Test case: Check square root operation with proper data
  it("square root with proper data", () => {
    const { getByTestId, getByText } = render(<App />);

    // Simulate square root and verify the result
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("√"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("2");
  });

  // Test case: Check square root operation with empty input
  it("square root with no value", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("CE"));
    fireEvent.click(getByText("√"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("NaN");
  });

  // Test case: Check Error when calculating with only one operand
  it("calculation without second operand", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("="));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("NaN");
  });

  // Test case: Check clear operation
  it("clear inputs", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("CE"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("");
  });

  // Test case: Check delete operation
  it("delete number", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("⌦"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("5");
  });

  // Test case: Check delete operation with entire number deleted
  it("delete all", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("⌦"));
    fireEvent.click(getByText("⌦"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("");
  });

  // Test case: Check number input while a error msg is displayed
  it("delete error message on number input", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("x"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("4"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("4");
  });

  // Test case: Check decimal button functionality
  it("check decimal point calculation", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("-"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("="));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("0.5");
  });

  // Test case: Check +/- button functionality on positive value
  it("-/+ symbol test for negative", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("+/-"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("-5");
  });

  // Test case: Check +/- button functionality on negative value
  it("-/+ symbol test for positive", () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("+/-"));
    fireEvent.click(getByText("+/-"));
    const calculationValue = getByTestId("calculation").textContent;
    expect(calculationValue).toEqual("5");
  });
});
