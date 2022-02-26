import { Exclude } from "class-transformer";
import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from "typeorm";

import Entity from "./Entity";
import Task from "./Task";
import TaskStatus from "./TaskStatus";
import User from "./User";




@TYPEORM_ENTITY("taskhistory")
export default class TaskHistory extends Entity {

    constructor(taskhistory: Partial<TaskHistory>) {
        super();
        Object.assign(this, taskhistory);
    }
 


    @Column()
    comment: string;

    @Column({nullable:true})
    assignedto: number;


    @ManyToOne(() => Task, (task) => task.taskhistory, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
      @JoinColumn({ name: "taskid", referencedColumnName: "id" })
      task: Task;
    
      @ManyToOne(() => TaskStatus, (taskstatus) => taskstatus.taskhistory, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
      @JoinColumn({ name: "taskstatusid", referencedColumnName: "id" })
      taskstatus: TaskStatus;



      @ManyToOne(() => User, (user) => user.taskhistory, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "addedby", referencedColumnName: "username" })
      user: User;




    // @Column()
    // Quantitiy: number;

    // @Column("real")
    // unitBudget: number;
    // @Column("real")
    // totalBudget: number;

    
    // @Exclude()
    // @ManyToOne(() => Project, (project) => project.project, {
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE",
    // })
    // @JoinColumn()
    // project: Project;

    // @OneToOne(() => Unit)
    // @JoinColumn()
    // unit: Unit;


  
//   @ManyToOne(() => Unit, (unit) => unit.projectdata, {
//     onUpdate: "CASCADE",
//     onDelete: "CASCADE",
// })
//   @JoinColumn({ name: "unitId", referencedColumnName: "id" })
//   unit: Unit;

    // @OneToOne(() => Actualcost)
    // @JoinColumn()
    // actualcost: Actualcost;


}
