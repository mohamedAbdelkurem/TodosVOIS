import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MAIN_COLOR } from "../../utilities/theme";
import {
    Button,
    Form,
    Grid,
    Segment,
    Card, Icon, Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import axios from 'axios';

import '../../utilities/my.css'

import { createTaskStatus,getTaskStatus } from "../../redux/tstatus";


export default function AddTaskStatus() {
    const dispatch = useDispatch();

    const [name, setTStausName] = useState("");


    const createTaskstatusFuncP = (e) => {
        // e.preventDefault()
    
        axios.post('http://localhost:5000/api/tstatus', {
            name: name,
           
        }
            , {
    
                withCredentials: true,
            }
        )
            .then(function (response) {
                console.log(response);
    
            })
    }

  return (
    <div>
        <h1 className='title'>Task Page</h1>
        <div>
        <Grid
                    padded
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    textAlign="center"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <p style={{ textAlign: 'center', padding: '20px', fontSize: '25px' }}>  <Icon size="large" name="hdd" />  Create a  <span style={{ color: 'blue' }}>   Task</span> </p>

                        <Form
                            size="large"
                            onSubmit={(e) =>createTaskstatusFuncP() }

                        // error={errors}
                        >



                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name="Taskstatus Name"

                                    iconPosition="left"
                                    placeholder=" Name"
                                    onChange={(e) => setTStausName(e.target.value)}
                                    autoComplete="Name"
                                    focus
                                    label=" Taskstatus Name"
                                    type="text"
                                    required
                                // error={errors && errors.noVisit}
                                />

                           
                            


    



                                <Button color={MAIN_COLOR} fluid size="large" >
                                    Add TaskStatus
                                </Button>
                            
                            </Segment>
                        </Form>
                       
                              
                         
                    </Grid.Column>
                </Grid>
        </div>
    </div>
  )
}
