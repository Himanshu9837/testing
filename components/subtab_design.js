import React, { useState } from 'react';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'

// import IconExpandMore from '@material-ui/icons/ExpandMore'
// import IconExpandLess from '@material-ui/icons/ExpandLess'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const Subtab = () => {
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
                    <Link href="/E4gadmin/backendhomepage"
                    passHref={true}>
                        <ListItem button  >
                            <ListItemText inset
                            primary="Main Homepage" />
                        </ListItem>
                    </Link>
                    <Link href="/E4gadmin/backendaccountpage"
                     passHref={true}>
                        <ListItem button >
                            <ListItemText inset
                            primary="Account Homepage" />
                        </ListItem>
                    </Link>
                    <Link href="/E4gadmin/aboutus"
                     passHref={true}>
                        <ListItem button >
                            <ListItemText inset
                            primary="About-Us page" />
                        </ListItem>
                    </Link>
                    <Link href="/E4gadmin/contact_us"
                     passHref={true}>
                        <ListItem button >
                            <ListItemText inset
                            primary="Contact Us" />
                        </ListItem>
                    </Link>

                </List>
            </Collapse>
            {/* </div> */}
        </>
    )
};
export default Subtab;
