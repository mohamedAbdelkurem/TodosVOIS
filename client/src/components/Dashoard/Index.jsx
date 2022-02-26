import React from 'react'
import CreateTask from '../Task/CreateTask'
import CreateTaskstatus from '../Taskstatus/AddTaskStatus'

export default function Index() {
  return (
    <div>
        <h1>Dashboard</h1>

        <div>
            <CreateTask />

        </div>
        <div>
            <CreateTaskstatus />
            
        </div>

    </div>
  )
}
