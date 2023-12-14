import react_ico from "@rsc/credits/react.svg";
import typescript_ico from "@rsc/credits/typescript_logo.svg";
import supabase_ico from "@rsc/credits/supabase_logo.svg";
import npm_ico from "@rsc/credits/npm-logo.svg";
import redux_ico from "@rsc/credits/redux_logo.svg";
import saga_ico from "@rsc/credits/redux-saga_logo.svg";
import chakra_ico from "@rsc/credits/chakra-ui.jpeg";
import github_ico from "@rsc/credits/github-icon.svg";
import netlify_ico from "@rsc/credits/netlify-icon.svg";

import {
    DrawerFooter,
    Stack,
    HStack,
    Text,
    Image,
    Tooltip,
} from "@chakra-ui/react";
interface IIconWrapperProps {
    src: string;
    link: string;
    alt: string;
    tooltipText: string;
    boxSize?: string;
}
const IconWrapper: React.FC<IIconWrapperProps> = ({
    src,
    link,
    alt,
    tooltipText,
    boxSize = "35px",
}) => {
    return (
        <a href={link} target={"_blank"}>
            <Tooltip label={tooltipText}>
                <Image boxSize={boxSize} src={src} alt={alt}/>
            </Tooltip>
        </a>
    );
};
const CreditsFooter: React.FC = () => {
    const renderComponent = () => {
        return (
            <DrawerFooter>
                <Stack gap={"1px"}>
                    <Text>Created with: </Text>

                    <HStack wrap={"wrap"} gap={4}>
                        <IconWrapper src={react_ico} link={"https://react.dev/"} alt={"React"} tooltipText={"React"}/>
                        <IconWrapper src={typescript_ico} link={"https://www.typescriptlang.org/"} alt={"Typescript"} tooltipText={"Typescript"}/>
                        <IconWrapper src={npm_ico} link={"https://www.npmjs.com/"} alt={"NPM"} tooltipText={"NPM"}/>
                        <IconWrapper src={redux_ico} link={"https://redux.js.org/"} alt={"Redux"} tooltipText={"Redux"}/>
                        <IconWrapper src={saga_ico} link={"https://redux-saga.js.org/"} alt={"Redux-Saga"} tooltipText={"Redux-Saga"}/>
                        <IconWrapper src={chakra_ico} link={"https://chakra-ui.com/"} alt={"Chakra-UI"} tooltipText={"Chakra-UI"}/>
                        <IconWrapper src={github_ico} link={"https://github.com/"} alt={"GitHub"} tooltipText={"GitHub"}/>
                        <IconWrapper src={netlify_ico} link={"https://www.netlify.com/"} alt={"Netlify"} tooltipText={"Netlify"}/>
                        <IconWrapper src={supabase_ico} link={"https://supabase.com/"} alt={"Supabase"} tooltipText={"Supabase"}/>
                    </HStack>
                </Stack>
            </DrawerFooter>
        );
    };
    return renderComponent();
};

export default CreditsFooter;
