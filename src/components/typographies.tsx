import * as React from 'react';
import Typography from '@material-ui/core/Typography';
const colorInherit = {color:'inherit'};

const Display4 = (props:any) => (
    <Typography style={colorInherit} {...props} variant="display4"/>
);
const Display3 = (props:any) => (
    <Typography style={colorInherit} {...props} variant="display3"/>
);
const Display2 = (props:any) => (
    <Typography style={colorInherit} {...props} variant="display2"/>
);
const Display1 = (props:any) => (
    <Typography style={colorInherit} {...props} variant="display1"/>
);
const Headline = (props:any) => (
    <Typography style={colorInherit} {...props} variant="headline"/>
);
const Title = (props:any) => (
    <Typography style={colorInherit} {...props} variant="title"/>
);
const Subheading = (props:any) => (
    <Typography style={colorInherit} {...props} variant="subheading"/>
);
const Body2 = (props:any) => (
    <Typography style={colorInherit} {...props} variant="body2"/>
);
const Body1 = (props:any) => (
    <Typography style={colorInherit} {...props} variant="body1"/>
);
const Caption = (props:any) => (
    <Typography {...props} variant="caption"/>
);
export {Display4, Display3, Display2, Display1, Headline, Title, Subheading, Body1, Body2, Caption};
