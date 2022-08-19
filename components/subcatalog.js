import React, { useState } from 'react';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'

// import IconExpandMore from '@material-ui/icons/ExpandMore'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import IconExpandLess from '@material-ui/icons/ExpandLess'
const Subcat = () => {
    // const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    function handleClick() {
        setOpen(!open)
    }
    return (
        <>
            <ListItem button
             onClick={handleClick} >
                {/* <div className="icons"> */}
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open}
            timeout="auto"
             unmountOnExit>
                <Divider />
                <List component="div"
                disablePadding>
                    <Link href="/E4gadmin/config"
                    passHref={true}>
                        <ListItem button  >
                            <ListItemText inset
                            primary="Category" />
                        </ListItem>
                    </Link>

                </List>
            </Collapse>
            {/* </div> */}
        </>
    )
};
export default Subcat;
