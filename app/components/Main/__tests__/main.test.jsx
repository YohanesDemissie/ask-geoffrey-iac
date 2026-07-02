import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "../main";

import { Context } from "../../../context/CreateContext";


const mockContext = {
    onSent: jest.fn(),
    recentPrompt: "",
    showResult: false,
    loading: false,
    resultData: "",
    setInput: jest.fn(),
    input: "",
    status: 200
};


const renderMain = (contextValues = {}) => {

    return render(
        <Context.Provider
            value={{
                ...mockContext,
                ...contextValues
            }}
        >
            <Main />
        </Context.Provider>
    );

};


describe("Main component", () => {


    test("renders greeting screen", () => {

        renderMain();


        expect(
            screen.getByText(
                "Greetings, Inquirist."
            )
        ).toBeInTheDocument();


        expect(
            screen.getByText(
                "How may I be of assistance?"
            )
        ).toBeInTheDocument();

    });



    test("calls setInput when user types", () => {
        renderMain();
    
        const input = screen.getByPlaceholderText("Enter a prompt here...");
    
        fireEvent.change(input, {
            target: { value: "Hello Geoffrey" }
        });
    
        expect(mockContext.setInput).toHaveBeenCalledWith("Hello Geoffrey");
    });



    test("shows send button when input exists", () => {

        renderMain({
            input: "Hello"
        });

        const images =screen.getByAltText("send button")

        expect(images).toBeVisible();
        
        });
    });



    test("calls onSent when send icon is clicked", async () => {

        const user = userEvent.setup();


        renderMain({
            input: "Hello"
        });


        const sendButton =
            screen.getByAltText("send button")

            await user.click(sendButton);

            expect(
                mockContext.onSent
            ).toHaveBeenCalled();

    });



    test("shows loading state", () => {

        renderMain({
            showResult: true,
            loading: true,
            recentPrompt: "Hello"
        });


        expect(
            screen.getByRole("progressbar")
        ).toBeTruthy();

    });
