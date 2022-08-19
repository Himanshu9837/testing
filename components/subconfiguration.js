import React, { useState } from 'react';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ExpandLessIcon from '@material-ui/icons/ExpandLess'
const Subconfig = () => {
    // const classes = useStyles()
    const [open, setOpen] = useState(false)
    function handleClick() {
        setOpen(!open)
    }
    return (
        <>
            {/* <div className="backenddiv"> */}


                <ListItem button
                onClick={handleClick} >
                    {/* <div className="icons"> */}
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={open}
                timeout="auto"
                 unmountOnExit>
                    {/* <Divider /> */}
                    <List component="div" >
                        <Link href="/E4gadmin/configuration"
                        passHref={true}>
                            <ListItem button >
                                 <ListItemText inset
                                 primary="Payment Method" />
                            </ListItem>
                        </Link>
                        <Link href="/E4gadmin/badge"
                         passHref={true}>
                            <ListItem button >
                                 <ListItemText inset
                                 primary="Badge" />
                            </ListItem>
                        </Link>
                        <Link href="/E4gadmin/currency"
                        passHref={true}>
                            <ListItem button >
                                 <ListItemText inset
                                 primary="Currency" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            {/* </div> */}
        </>
    )
};

// const drawerWidth = 240

const useStyles = makeStyles(theme =>
    createStyles({
        appMenu: {
            width: '100%',
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
)

export default Subconfig;
