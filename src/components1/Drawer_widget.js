import React, { useEffect, useState } from 'react';
import { RiCloseLine } from "react-icons/ri";
import "./drawer_widget.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Checkbox, Tabs } from '@mui/material';
import Forms from './Forms';

export const Drawer_widget = ({setWidget, onSubmit, widgetDatas,setWidgetDatas, tabvalue, setTabValue, handleDelete }) => {
    const [checkedWidgets, setCheckedWidgets] = useState({});

    const handleChange = (newValue) => {
        setTabValue(newValue);
    };
    useEffect(() => {
        const FullDatas = JSON.parse(localStorage.getItem('Datas')) || [];
        setWidgetDatas(FullDatas);
    }, [checkedWidgets])
    

    const handleCheckboxChange = (id) => (event) => {
        const isChecked = event.target.checked;
        setCheckedWidgets((prevCheckedWidgets) => {
            const updatedCheckedWidgets = { ...prevCheckedWidgets, [id]: isChecked };
            if (!isChecked) {
                // If unchecked, delete the widget
                handleDelete(id);
            }
            return updatedCheckedWidgets;
        });
    };

    // Function to filter widgets based on the selected tab
    const filterWidgets = (category) => {
        return widgetDatas.filter(widget => widget.category === category);
    };

    return (
        <div className='drawer'>
            <div className='navbar-widget'>
                <div>
                    <h5>App Widget</h5>
                </div>

                <div className='widget-close' onClick={()=>setWidget(false)}>
                    <RiCloseLine />
                </div>
            </div>

            <div className='paragraph-content'>
                <p>Personalize your dashboard by adding the following widget</p>
                <div>
                    <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
                        <TabContext value={tabvalue}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={tabvalue}
                                    aria-label="widget tabs"
                                    variant="fullWidth"
                                    textColor="inherit"
                                    TabIndicatorProps={{
                                        sx: {
                                            height: 2,
                                            backgroundColor: "#083fb2",
                                            borderBottom: "3px solid #083fb2",
                                            width: "100px",
                                        },
                                    }}
                                >
                                    <Tab
                                        label="CSPM"
                                        value="1"
                                        className="resource-tab-style"
                                        onClick={() => handleChange("1")}
                                        sx={{
                                            color: tabvalue === "1" ? "#0a2a5b" : "#757575",
                                            "&:hover": { color: "#0a2a5b" },
                                            "&.Mui-selected": {
                                                color: "#0a2a5b",
                                                border: '1px solid lightgray'
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="CWPP"
                                        value="2"
                                        className="resource-tab-style"
                                        onClick={() => handleChange("2")}
                                        sx={{
                                            "&:hover": { color: "#0a2a5b" },
                                            "&.Mui-selected": {
                                                color: "#0a2a5b",
                                                border: '1px solid lightgray'
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Image"
                                        value="3"
                                        className="resource-tab-style"
                                        onClick={() => handleChange("3")}
                                        sx={{
                                            color: tabvalue === "3" ? "#0a2a5b" : "#757575",
                                            "&:hover": { color: "#0a2a5b" },
                                            "&.Mui-selected": {
                                                color: "#0a2a5b",
                                                border: '1px solid lightgray'
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Ticket"
                                        value="4"
                                        className="resource-tab-style"
                                        onClick={() => handleChange("4")}
                                        sx={{
                                            color: tabvalue === "4" ? "#0a2a5b" : "#757575",
                                            "&:hover": { color: "#0a2a5b" },
                                            "&.Mui-selected": {
                                                color: "#0a2a5b",
                                                border: '1px solid lightgray'
                                            },
                                        }}
                                    />
                                </Tabs>
                            </Box>
                            <TabPanel value="1" sx={{ padding: "16px" }}>
                                <div style={{ margin: '5px 0px' }}>
                                    <Forms onSubmit={onSubmit} widgetDatas={widgetDatas} />
                                </div>
                                <div className='lists-wid'>
                                    <h3>CSPM Widget Lists</h3>
                                    {filterWidgets("1").map((widget) => (
                                        <div className='widget-tab' key={widget.id}>
                                            <p>
                                                <Checkbox
                                                    defaultChecked
                                                    onChange={handleCheckboxChange(widget.id)}
                                                />
                                                {widget.widgetName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel value="2" sx={{ padding: "16px" }}>
                                <div style={{ margin: '5px 0px' }}>
                                    <Forms onSubmit={onSubmit} widgetDatas={widgetDatas} />
                                </div>
                                <div className='lists-wid'>
                                    <h3>CWPP Widget Lists</h3>
                                    {filterWidgets("2").map((widget) => (
                                        <div className='widget-tab' key={widget.id}>
                                            <p>
                                                <Checkbox
                                                    defaultChecked
                                                    onChange={handleCheckboxChange(widget.id)}
                                                />
                                                {widget.widgetName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel value="3" sx={{ padding: "16px" }}>
                                <div style={{ margin: '5px 0px' }}>
                                    <Forms onSubmit={onSubmit} widgetDatas={widgetDatas} />
                                </div>
                                <div className='lists-wid'>
                                    <h3>Image Widget Lists</h3>
                                    {filterWidgets("3").map((widget) => (
                                        <div className='widget-tab' key={widget.id}>
                                            <p>
                                                <Checkbox
                                                    defaultChecked
                                                    onChange={handleCheckboxChange(widget.id)}
                                                />
                                                {widget.widgetName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel value="4" sx={{ padding: "16px" }}>
                                <div style={{ margin: '5px 0px' }}>
                                    <Forms onSubmit={onSubmit} widgetDatas={widgetDatas} />
                                </div>
                                <div className='lists-wid'>
                                    <h3>Ticket Widget Lists</h3>
                                    {filterWidgets("4").map((widget) => (
                                        <div className='widget-tab' key={widget.id}>
                                            <p>
                                                <Checkbox
                                                    defaultChecked
                                                    onChange={handleCheckboxChange(widget.id)}
                                                />
                                                {widget.widgetName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    )
}
