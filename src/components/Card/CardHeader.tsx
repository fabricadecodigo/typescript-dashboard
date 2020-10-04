import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons

// core components
import cardHeaderStyle from '../../assets/jss/material-dashboard-react/components/cardHeaderStyle';

function CardHeader({ ...props }: any) {
  const {
    classes,
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

export default withStyles(cardHeaderStyle)(CardHeader);
