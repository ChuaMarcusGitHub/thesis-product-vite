import React from "react";
import { render } from "@testing-library/react";
import ThesisNotice, { IThesisNoticeProps } from "../ThesisNotice";

describe("Thesis Notice Test Suite", () => {
    const renderComponent = (props: IThesisNoticeProps) => {
        return render(<ThesisNotice {...props} />);
    };
    describe("Render Test Suite", () => {
        test("Thesis Notice should render", () => {
            const props: IThesisNoticeProps = {
                isOpen: true,
                onClose: jest.fn(),
            };

            const { queryByTestId } = renderComponent(props);

			expect(queryByTestId("modal-header")).toBeTruthy();
        });
    });
});
