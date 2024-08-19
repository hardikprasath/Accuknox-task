import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import { ImSearch } from "react-icons/im";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { Container, Grid } from '@mui/material';
import { BsThreeDotsVertical } from "react-icons/bs";
import { SlRefresh } from "react-icons/sl";
import { FaClock } from "react-icons/fa6";
import { PiLineVerticalBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import { Drawer_widget } from './Drawer_widget';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { default as Button } from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import axios from "axios";

function Dashboard() {

    const [widget, setWidget] = useState(false);
    const [open, setOpen] = useState(false);
    const [tabvalue, setTabValue] = useState("1");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [widgetDatas, setWidgetDatas] = useState([
        {
            "id": 1,
            "widgetName": "Kesavan",
            "widgetText": "Test"
        },
        {
            "id": 2,
            "widgetName": "Ram",
            "widgetText": "Test"
        }
    ]);
    const filteredWidgets = widgetDatas.filter(widget => 
        widget.widgetName.toLowerCase().includes(searchInputValue.toLowerCase()) 
    );

    useEffect(() => {
        // Load saved widgets from localStorage
        const FullDatas = JSON.parse(localStorage.getItem('Datas')) || [];
        setWidgetDatas(FullDatas);
    }, [filteredWidgets]);

    const refresh = () => {
        const FullDatas = JSON.parse(localStorage.getItem('Datas')) || [];
        setWidgetDatas(FullDatas);
        console.log(FullDatas);
    };

    const onSubmit = (data) => {
        const newWidget = {
            id: widgetDatas.length + 1,
            widgetName: data.widgetName,
            widgetText: data.widgetText,
            category: tabvalue // Assign the current tab value
        };

        const pushedDatas = [...widgetDatas, newWidget];
        setWidgetDatas(pushedDatas);
        localStorage.setItem('Datas', JSON.stringify(pushedDatas));
        setWidget(false);
        refresh();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const toggleDrawer = (anchor, open, tab) => () => {
        if (anchor === "widget") {
            setWidget(open);
            setTabValue(tab);
        }
    };
    const handleDelete = (id) => {
        const updatedWidgets = widgetDatas.filter(widget => widget.id !== id);
        setWidgetDatas(updatedWidgets);
        localStorage.setItem('Datas', JSON.stringify(updatedWidgets));
        debugger
    };
    const handleSearch = (e) => {
        setSearchInputValue(e.target.value);
        debugger
    };


    const Drawer = (
        <Box sx={{ width: 550 }} role="presentation" className="drawer-background">
            <Drawer_widget handleDelete={handleDelete} onSubmit={onSubmit}setWidgetDatas={setWidgetDatas} widgetDatas={widgetDatas} tabvalue={tabvalue} setTabValue={setTabValue} setWidget={setWidget}/>
        </Box>
    );

    const breadcrumbs = [
        <Link underline="hover" color="inherit" fontWeight={600} key="home">
            Home
        </Link>,
        <Typography color="darkblue" fontWeight={600} key="dashboard">
            Dashboard V2
        </Typography>,
    ];

   
    

    return (
        <div className='dash-board'>
            <div className="navbar">
                <Container maxWidth="xl">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={6}
                    >
                        <Grid item sm={12} md={4} lg={4}>
                            <Stack spacing>
                                <Breadcrumbs separator="›" aria-label="breadcrumb">
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </Stack>
                        </Grid>
                        <Grid item sm={12} md={4} lg={4}>
                            <div className='search-bar'>
                                <input 
                                    className="input" 
                                    placeholder="Search anything"  
                                    value={searchInputValue} 
                                    onChange={handleSearch}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12} md={4} lg={4}>
                            <div className='navbar-icon'>
                                <MdKeyboardArrowDown />
                                <LuBellRing />
                                <RxAvatar />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className='dashboard-heading'>
                <Container maxWidth="xl">
                    <div className='dashboard-content'>
                        <div className='dashboard-name'>
                            <h3>CNAPP Dashboard</h3>
                        </div>

                        <div className='dashboard-control'>
                            <Grid
                                display="flex"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                gap={2}
                            >
                                <Grid item xs={12} sm={6} md={3} lg={3} sx={{ marginRight: "-28px" }}>
                                    <div className='addwidget-button right' onClick={handleClickOpen}>
                                        Add Widget <IoMdAdd className='add-icon' />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className='refresh-icon'>
                                        <SlRefresh />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className='three-dot'>
                                        <BsThreeDotsVertical />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className='history'>
                                        <FaClock /><PiLineVerticalBold />
                                        <span>Last 2 days</span>
                                        <span className='down-arrow'><MdKeyboardArrowDown /></span>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Container>
            </div>

            <div className='dashboard-widget'>
                <Container maxWidth="xl">
                    <div className="indi-widget">
                        <h3>CSPM Executive Dashboard</h3>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            {/* <Grid item sm={12} md={4} lg={4} >
                                        <div className='box-white'>
                                            <div className='cspm-executive-dashboard'>
                                                <h4>CSPM</h4>
                                                <div className='close-button'><RiCloseLine /></div>
                                            </div>
                                            <p>test</p>
                                        </div>
                                    </Grid> */}
                            {filteredWidgets
                                .filter(widget => widget.category === "1") // Filter for CSPM widgets
                                .map((a, i) => (
                                    
                                    <Grid item sm={12} md={4} lg={4} key={i}>
                                        <div className='box-white'>
                                            <div className='cspm-executive-dashboard'>
                                                <h4>{a.widgetName}</h4>
                                                <div className='close-button' onClick={()=>handleDelete(a.id)}><RiCloseLine /></div>
                                            </div>
                                            <p>{a.widgetText}</p>
                                        </div>
                                    </Grid>
                                ))
                            }
                            <Grid item sm={12} md={4} lg={4}>
                                <div className='add-widget'>
                                    <button className='widget-button' onClick={toggleDrawer("widget", true, "1")}>
                                        <IoMdAdd className='add-button-icon' />Add Widget
                                    </button>
                                    <SwipeableDrawer
                                        anchor="right"
                                        open={widget}
                                        onClose={toggleDrawer("widget", false)}
                                        onOpen={toggleDrawer("widget", true)}
                                    >
                                        {Drawer}
                                    </SwipeableDrawer>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="indi-widget">
                        <h3>CWPP Dashboard</h3>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            {filteredWidgets
                                .filter(widget => widget.category === "2") // Filter for CWPP widgets
                                .map((a, i) => (
                                    <Grid item sm={12} md={4} lg={4} key={i}>
                                        <div className='box-white'>
                                            <div className='cspm-executive-dashboard'>
                                                <h4>{a.widgetName}</h4>
                                                <div className='close-button' onClick={()=>handleDelete(a.id)}><RiCloseLine /></div>
                                            </div>
                                            <p>{a.widgetText}</p>
                                        </div>
                                    </Grid>
                                ))
                            }
                            <Grid item sm={12} md={4} lg={4}>
                                <div className='add-widget'>
                                    <button className='widget-button' onClick={toggleDrawer("widget", true, "2")}>
                                        <IoMdAdd className='add-button-icon' />Add Widget
                                    </button>
                                    <SwipeableDrawer
                                        anchor="right"
                                        open={widget}
                                        onClose={toggleDrawer("widget", false)}
                                        onOpen={toggleDrawer("widget", true)}
                                    >
                                        {Drawer}
                                    </SwipeableDrawer>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="indi-widget">
                        <h3>Registry Scan</h3>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            {filteredWidgets
                                .filter(widget => widget.category === "3") // Filter for Image widgets
                                .map((a, i) => (
                                    <Grid item sm={12} md={4} lg={4} key={i}>
                                        <div className='box-white'>
                                            <div className='cspm-executive-dashboard'>
                                                <h4>{a.widgetName}</h4>
                                                <div className='close-button' onClick={()=>handleDelete(a.id)}><RiCloseLine /></div>
                                            </div>
                                            <p>{a.widgetText}</p>
                                        </div>
                                    </Grid>
                                ))
                            }
                            <Grid item sm={12} md={4} lg={4}>
                                <div className='add-widget'>
                                    <button className='widget-button' onClick={toggleDrawer("widget", true, "3")}>
                                        <IoMdAdd className='add-button-icon' />Add Widget
                                    </button>
                                    <SwipeableDrawer
                                        anchor="right"
                                        open={widget}
                                        onClose={toggleDrawer("widget", false)}
                                        onOpen={toggleDrawer("widget", true)}
                                    >
                                        {Drawer}
                                    </SwipeableDrawer>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="indi-widget">
                        <h3>Ticket Executive Dashboard</h3>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            {filteredWidgets
                                .filter(widget => widget.category === "4") // Filter for Ticket widgets
                                .map((a, i) => (
                                    <Grid item sm={12} md={4} lg={4} key={i}>
                                        <div className='box-white'>
                                            <div className='cspm-executive-dashboard'>
                                                <h4>{a.widgetName}</h4>
                                                <div className='close-button' onClick={()=>handleDelete(a.id)}><RiCloseLine /></div>
                                            </div>
                                            <p>{a.widgetText}</p>
                                        </div>
                                    </Grid>
                                ))
                            }
                            <Grid item sm={12} md={4} lg={4}>
                                <div className='add-widget'>
                                    <button className='widget-button' onClick={toggleDrawer("widget", true, "4")}>
                                        <IoMdAdd className='add-button-icon' />Add Widget
                                    </button>
                                    <SwipeableDrawer
                                        anchor="right"
                                        open={widget}
                                        onClose={toggleDrawer("widget", false)}
                                        onOpen={toggleDrawer("widget", true)}
                                    >
                                        {Drawer}
                                    </SwipeableDrawer>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>

            <SwipeableDrawer
                anchor="right"
                open={widget}
                onClose={toggleDrawer("widget", false)}
                onOpen={toggleDrawer("widget", true)}
            >
                {Drawer}
            </SwipeableDrawer>
        </div>
    );
}

export default Dashboard;
