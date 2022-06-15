import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';

const Toggle = (props) => {
  const switchStyles = useN01SwitchStyles();
  return (
    <div style={{marginBottom: "10px"}}>
      <Switch
        classes={switchStyles}
        checked={props.toggled}
        onChange={props.onChangeToggled}
      />
    </div>
  );
};

export default Toggle;