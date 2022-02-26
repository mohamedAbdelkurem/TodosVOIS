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

import { createTask,getTasks } from "../../redux/task";

export default function CreateTask() {
  const dispatch = useDispatch();
  const [title, setTaskName] = useState("");
  const [description, SetTaskDesc] = useState("");

  const createTask = (e) => {
    // e.preventDefault()

    axios.post('http://localhost:5000/api/task', {
        title: title,
        description: description,
    }
        , {

            withCredentials: true,
        }
    )
        .then(function (response) {
            console.log(response);

        })
}

  useEffect(() => {

    dispatch(getTasks());

  }, []);
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
                            onSubmit={(e) =>createTask() }
                        // error={errors}
                        >



                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name="Name"

                                    iconPosition="left"
                                    placeholder="Shelf"
                                    onChange={(e) => setTaskName(e.target.value)}
                                    autoComplete="Name"
                                    focus
                                    label=" Name"
                                    type="text"
                                    required
                                // error={errors && errors.noVisit}
                                />

                                <Form.TextArea
                                    fluid
                                    name="Description"


                                    placeholder="Description"
                                    onChange={(e) => SetTaskDesc(e.target.value)}
                                    autoComplete="Name"
                                    focus
                                    label="Description"
                                    type="text"
                                   
                                // error={errors && errors.noVisit}
                                />
                            


    



                                <Button color={MAIN_COLOR} fluid size="large" >
                                    Add Task
                                </Button>
                            
                            </Segment>
                        </Form>
                       
                              
                         
                    </Grid.Column>
                </Grid>
      </div>
    </div>
  )
}
