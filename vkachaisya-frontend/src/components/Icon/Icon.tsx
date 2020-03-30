import { palette, PaletteProps, sizing, SizingProps, spacing, SpacingProps } from '@material-ui/system';
import React from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';

interface IconProps extends SpacingProps, PaletteProps, SizingProps {
  name: string;
  rotate?: string;
  size?: string | number;
  hoverColor?: string;
  className?: string;
}

const icons: { [key: string]: any } = {
  arrow: Arrow,
  search: Search,
};

const rotate = (props: IconProps) =>
  props.rotate &&
  css`
    transition: transform 300ms ease;
    transform: rotate(${props.rotate});
  `;

const hoverColor = ({ hoverColor: color }: IconProps) =>
  color &&
  css`
    &:hover {
      color: ${({ theme }) => (theme.palette[color] ? theme.palette[color] : color)};
    }
  `;

const SvgTag = ({ name, size, rotate, hoverColor, ...props }: IconProps) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) {
    return null;
  }

  return <SvgIcon width={size} height={size} {...props} />;
};

const StyledIcon = styled(SvgTag)`
  ${sizing}
  ${spacing}
  ${palette}
  ${rotate}
  ${hoverColor}
`;

const Icon: React.FC<IconProps> = (props) => <StyledIcon {...props} />;

export { Icon };
