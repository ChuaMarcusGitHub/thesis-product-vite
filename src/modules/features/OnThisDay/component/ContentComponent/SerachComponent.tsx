import {
    Box,
    HStack,
    Button,
    MenuItem,
    Menu,
    MenuList,
    MenuButton,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    IFetchEventsPayload,
    Months,
    ON_THIS_DAY_TOPICS,
} from "@features/onThisDay/type/OnThisDayCommonTypes";
import {
    generateDate,
    getDaysInMonth,
    getMonths,
} from "./UtilFiles/ContentComponentUtil";
import {
    menuButtonStyle,
    searchContainerBox,
    stackContainer,
} from "./SerachComponentStyleProps";
import { IDateObject } from "@features/onThisDay/type/OnThisDayComponentTypes";
import { useDispatch } from "react-redux";
import { fetchEventsFromDay } from "@features/onThisDay/actions/OnThisDaySummaryActions";

const SearchComponent: React.FC = () => {
    //Constants
    const dispatch = useDispatch();

    // States
    const [today] = useState(new Date());
    const [months] = useState<string[]>(getMonths(Months));
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [maxDate, setMaxDate] = useState(0);

    // Mount Effect - set dates
    useEffect(() => {
        const numericMonth = today.getMonth();
        setSelectedDate(today.getDate());
        setSelectedMonth(numericMonth);
        setMaxDate(getDaysInMonth(today.getFullYear(), numericMonth));
    }, []);

    useEffect(() => {
        setMaxDate(getDaysInMonth(today.getFullYear(), selectedMonth));
    }, [selectedMonth, today]);

    // Memos
    const generateDateOptions: string[] = useMemo(() => {
        const optionArr = [];
        for (let day = 1; day <= maxDate; ++day) {
            optionArr.push(day.toString().padStart(2, "0"));
        }
        return optionArr;
    }, [maxDate]);

    // Logic Methods
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

    // Render Methods
    const renderMonth = () => (
        <Menu>
            <MenuButton {...menuButtonStyle} as={Button}>
                {months[selectedMonth]}
            </MenuButton>
            <MenuList maxH={"300px"} overflowY={"scroll"}>
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
            <MenuButton as={Button} {...menuButtonStyle}>
                {selectedDate.toString().padStart(2, "0")}
            </MenuButton>
            <MenuList maxH={"300px"} overflow={"scroll"}>
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
    const renderComponent = () => {
        return (
            <Box {...searchContainerBox}>
                <HStack {...stackContainer}>
                    {renderMonth()}
                    {renderDate()}
                    <Button onClick={handleFetchEvents}>Go!!</Button>
                    <Button onClick={randomizeDate}>Randomize!!</Button>
                </HStack>
            </Box>
        );
    };
    return renderComponent();
};

export default SearchComponent;
