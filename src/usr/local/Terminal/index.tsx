import React from 'react';
import * as Style from './styles.tsx';

const TerminalComponent: React.FC = () => {
    return (
        <Style.TerminalContainer>
          <Style.InputContainer>
            {">"}<Style.Input type="text" />
          </Style.InputContainer>
        </Style.TerminalContainer>
    )
}

export default TerminalComponent;