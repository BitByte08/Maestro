import styled from 'styled-components';

export const HeaderContainer = styled.button`
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2rem;
`;
export const SideContainer = styled.button`
    position: absolute;
    top: 0; bottom: .5rem;
    width: .5rem;
    padding: 0; margin: 0;
    &:hover {
        cursor: col-resize;
    }
`;
const CornerContainer = styled.button`
    position: absolute;
    bottom: 0;
    width: .5rem; height: .5rem;
    padding: 0; margin: 0;
`;
export const LeftCornerContainer = styled(CornerContainer)`
    &:hover {
        cursor: nesw-resize;
    }
`;
export const RightCornerContainer = styled(CornerContainer)`
    &:hover {
        cursor: nwse-resize;
    }
`;
export const BottomContainer = styled.button`
    position: absolute;
    bottom: 0; left: .5rem; right: .5rem;
    height: .5rem;
    &:hover {
        cursor: row-resize;
    }
`;
export const BodyContainer = styled.div`
    position: absolute;
    top: 2rem; left: 0; right: 0; bottom: 0;
`;
export const ContentContainer = styled.div`
    position: absolute;
    top: .5rem; left: .5rem; right: .5rem; bottom: .5rem;
`