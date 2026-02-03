import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
    it("shows initial value", () => {
        render(<Counter />);
        expect(screen.getByLabelText("count-value")).toHaveTextContent("Count: 0");
    });

    it("increments on click", async () => {
        render(<Counter />);

        const user = userEvent.setup();
        await user.click(screen.getByRole("button", { name: /increment/i }));

        expect(screen.getByLabelText("count-value")).toHaveTextContent("Count: 1");
    });

    it("disables reset when count is 0 and enables after increment", async () => {
        render(<Counter />);

        const user = userEvent.setup();
        const resetBtn = screen.getByRole("button", { name: /reset/i });

        expect(resetBtn).toBeDisabled();

        await user.click(screen.getByRole("button", { name: /increment/i }));
        expect(resetBtn).toBeEnabled();

        await user.click(resetBtn);
        expect(screen.getByLabelText("count-value")).toHaveTextContent("Count: 0");
        expect(resetBtn).toBeDisabled();
    });
});