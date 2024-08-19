import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Forms = ({ onSubmit, widgetDatas }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            widgetName: '',
            widgetText: '',
        }
    });

    return (
        <div className='frm-wid'>
            <h3>Add Widgets</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item lg={12} md={12} sm={12} xs={12} className='mb-3'>
                        <Controller
                            name="widgetName"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Widget Name is required' }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    label="Widget Name"
                                    placeholder="Enter Widget Name"
                                    fullWidth
                                    size='small'
                                    {...field}
                                    error={Boolean(errors.widgetName)}
                                    helperText={errors.widgetName?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className='mb-3'>
                        <Controller
                            name="widgetText"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Widget Text is required' }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    label="Widget Text"
                                    placeholder="Enter Widget Text"
                                    fullWidth
                                    size='small'
                                    multiline
                                    rows={4}
                                    {...field}
                                    error={Boolean(errors.widgetText)}
                                    helperText={errors.widgetText?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <div className='btn-act'>
                    <Button variant='outlined' type="submit">+ Add Widget</Button>
                </div>
            </form>
        </div>
    );
};

export default Forms;
