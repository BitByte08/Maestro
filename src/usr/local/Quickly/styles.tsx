import styled from "styled-components";

export const QuicklyContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    box-sizing: border-box;
`;


export const ShortCutButton = styled.button`
    border-radius: .25rem;
    position: absolute;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    
    &:active {
        cursor: grabbing;
    }
`;