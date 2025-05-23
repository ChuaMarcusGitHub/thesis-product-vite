import {
    Box,
    HStack,
    Button,
    MenuItem,
    Menu,
    MenuList,
    MenuButton,
    CheckboxGroup,
    Text,
    Checkbox,
    Stack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    IFetchEventsPayload,
    IUpdateActiveTabPayload,
    Months,
    ON_THIS_DAY_TOPICS,
} from "@features/OnThisDay/type/OnThisDayCommonTypes";
import {
    checkIfLastCheckbox,
    generateDate,
    getDaysInMonth,
    getDefaultActiveTabs,
    getMonths,
    transformActiveTabPayload,
} from "./UtilFiles/ContentComponentUtil";
import {
    menuButtonStyle,
    buttonStyle,
    filterContainerBox,
    stackContainer,
    checkboxGroupStyle,
    menuListStyle,
    dateStackContainer,
    searchContainerWrapper,
    dateContainerBox,
    mobileDateContainerBox,
} from "./SearchComponentStyleProps";
import {
    IDateObject,
    ITabCheckbox,
    OTDComponentErrorObject,
    OTD_COMPONENT_ERRORS,
} from "@features/OnThisDay/type/OnThisDayComponentTypes";
import { useDispatch } from "react-redux";
import {
    fetchEventsFromDay,
    updateActiveTabs,
} from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import { createStandaloneToast } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { getIsMobileDevice } from "@src/modules/features/Common/Utils/UtilsMethods";

const { toast } = createStandaloneToast();
const SearchComponent: React.FC = () => {
    //Constants
    const dispatch = useDispatch();
    let timerId: NodeJS.Timeout;
    const isMobileDevice = getIsMobileDevice();

    // States
    const [defaultActive] = useState(getDefaultActiveTabs());
    const [today] = useState(new Date());
    const [months] = useState<string[]>(getMonths(Months));
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [maxDate, setMaxDate] = useState(0);
    const [activeTabs, setActiveTabs] = useState<ITabCheckbox[]>([]);

    // Mount Effect - set dates
    useEffect(() => {
        const numericMonth = today.getMonth();
        setSelectedDate(today.getDate());
        setSelectedMonth(numericMonth);
        setMaxDate(getDaysInMonth(today.getFullYear(), numericMonth));
    }, [today]);

    useEffect(() => {
        setMaxDate(getDaysInMonth(today.getFullYear(), selectedMonth));
    }, [selectedMonth, today]);

    // occurs on startup
    useEffect(() => {
        // setTabArray(Array(defaultActive.length).fill(true));
        const activeTabArray: ITabCheckbox[] = [];
        for (const values of Object.values(defaultActive)) {
            activeTabArray.push({
                type: values,
                isChecked: true,
            });
        }
        setActiveTabs(activeTabArray);
    }, [defaultActive]);

    useEffect(() => {
        debounceDispatchUpdateActiveTabs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTabs]);

    // Memos
    const generateDateOptions: string[] = useMemo(() => {
        const optionArr = [];
        for (let day = 1; day <= maxDate; ++day) {
            optionArr.push(day.toString().padStart(2, "0"));
        }
        return optionArr;
    }, [maxDate]);

    // Logic Methods
    const handleActiveTabs = (tabKey: string) => {
        const currentActive = [...activeTabs];
        const clickedObj: ITabCheckbox | undefined = currentActive.find(
            ({ type }) => type === tabKey
        );

        // Guard Clause
        if (!clickedObj) return;

        // Toggle the value
        clickedObj.isChecked = !clickedObj.isChecked;

        // Check if this is the last checkbox
        if (checkIfLastCheckbox(currentActive)) {
            toast(OTDComponentErrorObject[OTD_COMPONENT_ERRORS.LAST_CHECKBOX]);
            //reverse the action
            clickedObj.isChecked = !clickedObj.isChecked;
        }

        // "all": true -> set the rest = true
        if (
            clickedObj.type === ON_THIS_DAY_TOPICS.ALL &&
            clickedObj.isChecked
        ) {
            currentActive.forEach((tab) => (tab.isChecked = true));
        } else {
            if (!clickedObj.isChecked && tabKey !== ON_THIS_DAY_TOPICS.ALL) {
                const allTypeIndex: number = currentActive.findIndex(
                    ({ type }) => type === ON_THIS_DAY_TOPICS.ALL
                );
                // update the allTypeIndex as well:
                currentActive[allTypeIndex].isChecked = false;
            }
        }
        setActiveTabs(currentActive);
    };
    const handleMonthChange = (newMonth: number) => {
        setSelectedMonth(newMonth);
        setMaxDate(getDaysInMonth(new Date().getFullYear(), newMonth));
    };
    const handleDateChange = (newDate: number) => {
        let newSelectedDate = newDate;
        if (newSelectedDate > maxDate) newSelectedDate = maxDate;
        else if (newSelectedDate < 1) newSelectedDate = 1;

        setSelectedDate(newSelectedDate);
    };
    const randomizeDate = () => {
        const randomDate: IDateObject = generateDate();
        setSelectedMonth(randomDate.month);
        setSelectedDate(randomDate.date);
    };
    const handleFetchEvents = () => {
        const payload: IFetchEventsPayload = {
            date: {
                month: selectedMonth,
                date: selectedDate,
            },
            eventTypes: [ON_THIS_DAY_TOPICS.ALL],
        };
        dispatch(fetchEventsFromDay(payload));
    };
    const debounceDispatchUpdateActiveTabs = () => {
        if (timerId) clearTimeout(timerId);
        const payload: IUpdateActiveTabPayload =
            transformActiveTabPayload(activeTabs);
        timerId = setTimeout(() => {
            dispatch(updateActiveTabs(payload));
            clearTimeout(timerId);
        }, 500);
    };

    // Render Methods
    const renderMonth = () => (
        <Menu>
            <MenuButton
                {...menuButtonStyle}
                as={Button}
                flexGrow={[0.5, 0.5, 2]}
            >
                {months[selectedMonth]}
            </MenuButton>
            <MenuList {...menuListStyle}>
                {months.map((month, monthIndex) => (
                    <MenuItem
                        key={`key-month-${monthIndex}`}
                        onClick={() => handleMonthChange(monthIndex)}
                    >
                        {month}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );

    const renderDate = () => (
        <Menu>
            <MenuButton
                as={Button}
                {...menuButtonStyle}
                flexGrow={[0.5, 0.5, 1.5]}
            >
                {selectedDate.toString().padStart(2, "0")}
            </MenuButton>
            <MenuList {...menuListStyle}>
                {generateDateOptions.map((day) => (
                    <MenuItem
                        key={`key-option-day-${day}`}
                        onClick={() => handleDateChange(Number(day))}
                    >
                        {day}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );

    const renderTriggerButtons = () => (
        <>
            <Button {...buttonStyle} onClick={handleFetchEvents} flexGrow={1}>
                <HStack gap={2}>
                    <Text> Go!!</Text>
                    <Search2Icon />
                </HStack>
            </Button>
            <Button {...buttonStyle} onClick={randomizeDate} flexGrow={0.4}>
                Randomize!!
            </Button>
        </>
    );

    const renderActiveTabs = () => (
        <HStack {...stackContainer} flexWrap={"wrap"}>
            <CheckboxGroup {...checkboxGroupStyle} defaultValue={defaultActive}>
                {activeTabs?.map((tab) => {
                    return (
                        <Checkbox
                            flexGrow={0.1}
                            key={`checkbox-${tab.type}`}
                            isChecked={tab.isChecked}
                            onChange={() => handleActiveTabs(tab.type)}
                        >
                            <Text fontSize={"1.2rem"}>{tab.type}</Text>
                        </Checkbox>
                    );
                })}
            </CheckboxGroup>
        </HStack>
    );
    const renderWebTriggers = () => (
        <HStack {...dateStackContainer}>
            {renderMonth()}
            {renderDate()}
            {renderTriggerButtons()}
        </HStack>
    );

    const renderMobileTriggers = () => (
        <>
            <Box {...mobileDateContainerBox}>
                <Stack width={"100%"}>
                    <HStack width={"100%"} gap={4}>
                        {renderMonth()}
                        {renderDate()}
                    </HStack>
                    <HStack>{renderTriggerButtons()}</HStack>
                </Stack>
            </Box>
            <Box {...filterContainerBox}>{renderActiveTabs()}</Box>
        </>
    );
    const renderComponent = () => {
        return (
            <Box {...searchContainerWrapper}>
                <Box {...dateContainerBox}>{renderWebTriggers()}</Box>
                <Box {...filterContainerBox}>{renderActiveTabs()}</Box>
            </Box>
        );
    };

    const renderMobileComponent = () => (
        <Box {...searchContainerWrapper}>{renderMobileTriggers()}</Box>
    );
    return isMobileDevice ? renderMobileComponent() : renderComponent();
};

export default SearchComponent;
