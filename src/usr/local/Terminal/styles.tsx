import styled from 'styled-components';

export const TerminalContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: #FDFDFD;
`;

export const InputContainer = styled.div`
    display: flex;
`;

export const Input = styled.input`
    width: 100%;
    border: none;
    background-color: #FDFDFD;
    &:focus {
        outline: none;
    }
`;