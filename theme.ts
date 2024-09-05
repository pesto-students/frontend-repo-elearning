'use client';

import { MantineColorsTuple, createTheme } from '@mantine/core';

const myColor: MantineColorsTuple = [
    '#E7F5FF',
    '#D0EBFF',
    '#A5D8FF',
    '#74C0FC',
    '#4DABF7',
    '#339AF0',
    '#228BE6',
    '#1C7ED6',
    '#1971C2',
    '#1864AB'
];

export const createAppTheme = (
    primaryColor: string = 'myColor',
    fontColor: string = 'dark.9',
    fontFamily: string = 'Roboto, sans-serif'
) => {
    const colors = {
        myColor,
        // Include default Mantine colors
        blue: ['#E7F5FF', '#D0EBFF', '#A5D8FF', '#74C0FC', '#4DABF7', '#339AF0', '#228BE6', '#1C7ED6', '#1971C2', '#1864AB'],
        cyan: ['#E3FAFC', '#C5F6FA', '#99E9F2', '#66D9E8', '#3BC9DB', '#22B8CF', '#15AABF', '#1098AD', '#0C8599', '#0B7285'],
        gray: ['#F8F9FA', '#F1F3F5', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#868E96', '#495057', '#343A40', '#212529'],
        green: ['#EBFBEE', '#D3F9D8', '#B2F2BB', '#8CE99A', '#69DB7C', '#51CF66', '#40C057', '#37B24D', '#2F9E44', '#2B8A3E'],
        indigo: ['#EDF2FF', '#DBE4FF', '#BAC8FF', '#91A7FF', '#748FFC', '#5C7CFA', '#4C6EF5', '#4263EB', '#3B5BDB', '#364FC7'],
        orange: ['#FFF4E6', '#FFE8CC', '#FFD8A8', '#FFC078', '#FFA94D', '#FF922B', '#FD7E14', '#F76707', '#E8590C', '#D9480F'],
        pink: ['#FFF0F6', '#FFDEEB', '#FCC2D7', '#FAA2C1', '#F783AC', '#F06595', '#E64980', '#D6336C', '#C2255C', '#A61E4D'],
        red: ['#FFF5F5', '#FFE3E3', '#FFC9C9', '#FFA8A8', '#FF8787', '#FF6B6B', '#FA5252', '#F03E3E', '#E03131', '#C92A2A'],
        teal: ['#E6FCF5', '#C3FAE8', '#96F2D7', '#63E6BE', '#38D9A9', '#20C997', '#12B886', '#0CA678', '#099268', '#087F5B'],
        yellow: ['#FFF9DB', '#FFF3BF', '#FFEC99', '#FFE066', '#FFD43B', '#FCC419', '#FAB005', '#F59F00', '#F08C00', '#E67700'],
    };

    // Ensure primaryColor is a valid key of colors
    const validPrimaryColor = colors.hasOwnProperty(primaryColor) ? primaryColor : 'myColor';

    return createTheme({
        colors,
        primaryColor: validPrimaryColor,
        fontFamily,
        other: {
            fontColor,
        },
    });
};

export default createAppTheme();