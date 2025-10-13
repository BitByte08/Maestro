import styled from "styled-components";

export const QuicklyContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 4rem);
    grid-template-rows: repeat(auto-fit, 4rem);
    grid-auto-flow: column;
    gap: .5rem;
    padding: .5rem;
    box-sizing: border-box;
`;


export const ShortCutButton = styled.button`
    border-radius: .25rem;
`;