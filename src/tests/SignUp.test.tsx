import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import SignUp from "../components/AuthPage/SignUp";

describe("SignUp", () => {
  it("It should render the login page", () => {
    render(<SignUp setIsOpenSignUp={() => {}} />);
    const emailEl = screen.getByText(/sign up/i);
    expect(emailEl).toBeInTheDocument();
  });
});
