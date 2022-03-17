import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

afterEach(cleanup);
const mockResponse = {
  meals: [
    {
      idMeal: "52855",
      strMeal: "Banana Pancakes",
      strCategory: "Dessert",
      strArea: "American",
      strInstructions: "recet desc",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
      strTags: "Breakfast,Desert,Sweet",
      strYoutube: "https://www.youtube.com/watch?v=kSKtb2Sv-_U",
      strIngredient1: "Banana",
      strSource: "https://www.bbcgoodfood.com/recipes/banana-pancakes",
    },
  ],
};
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
  jest.restoreAllMocks();
});

it("should correspond to initial state", () => {
  render(<HomePage />);

  const inputEl = screen.getByTestId("input");

  expect(inputEl.value).toBe("");
  expect(screen.queryByTestId("search-status")).not.toBeInTheDocument();
  expect(screen.queryByTestId("meals")).not.toBeInTheDocument();
});

describe("showing search results", () => {
  it('should shows 1 search result for "banana" query', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    render(<HomePage />);

    const searchStatusEl = screen.queryByTestId("search-status");
    const inputEl = screen.getByTestId("input");
    const searchBtn = screen.getByTestId("search-btn");

    expect(searchStatusEl).not.toBeInTheDocument();

    fireEvent.change(inputEl, {
      target: {
        value: "banana",
      },
    });
    fireEvent.click(searchBtn);
    await screen.findByText("Search results for banana:");
    expect(inputEl.value).toBe("");
    expect(screen.getAllByTestId("meal-card").length).toBe(1);
  });

  it("should not display search results if there are none", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });
    render(<HomePage />);

    const searchStatusEl = screen.queryByTestId("search-status");
    const inputEl = screen.getByTestId("input");
    const searchBtn = screen.getByTestId("search-btn");

    expect(searchStatusEl).not.toBeInTheDocument();

    fireEvent.change(inputEl, {
      target: {
        value: "boo",
      },
    });
    fireEvent.click(searchBtn);
    await screen.findByText("There are no search results. Try again!");
    expect(inputEl.value).toBe("");
    expect(screen.queryByTestId("meals")).not.toBeInTheDocument();
  });
});
