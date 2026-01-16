import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => props.theme.spacing.medium};
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.$primary ? props.theme.colors.primary : props.theme.colors.secondary)};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${props => props.theme.fonts.main};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

export default StyledButton;