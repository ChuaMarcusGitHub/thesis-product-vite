import React from "react";

export interface IModalTabFullContentProps {
    htmldoc?: string | TrustedHTML;
    updateProgress: () => void;
}
const ModalTabFullContent: React.FC<IModalTabFullContentProps> = ({
    htmldoc = "",
}) => {
    const renderComponent = () => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: htmldoc,
                }}
            />
        );
    };
    return renderComponent();
};

export default ModalTabFullContent;
