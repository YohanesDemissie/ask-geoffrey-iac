import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header", () => {
    it("renders the title", () => {
        render(<Header />);

        expect(
            screen.getByText("Ask Geoffrey")
        ).toBeInTheDocument();
    });
});