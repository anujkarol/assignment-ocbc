import { Loader } from "../components/Loader/index";

import { render, screen } from "@testing-library/react";

test("WHEN form Page Loads THEN laoder disaplyes correctly", () => {
  render(<Loader />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
