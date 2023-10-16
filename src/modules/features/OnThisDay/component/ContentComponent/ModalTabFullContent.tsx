import React from "react";

export interface IModalTabFullContentProps {
    htmldoc?: string | TrustedHTML;
    pageId?: number | null
}
const ModalTabFullContent: React.FC<IModalTabFullContentProps> = ({
    htmldoc = "",
    pageId = -1
}) => {
    const renderComponent = () => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: htmldoc,
                }}
                id={`article-pg-${pageId}`}
            />
        );
    };
    return renderComponent();
};

export default ModalTabFullContent;
