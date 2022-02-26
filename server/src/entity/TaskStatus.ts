import { Exclude } from "class-transformer";
import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn,OneToMany
} from "typeorm";

import Entity from "./Entity";
import Task from "./Task";
import TaskHistory from "./TaskHistory";
import User from "./User";




@TYPEORM_ENTITY("taskstatus")
export default class TaskStatus extends Entity {

    constructor(taskstatus: Partial<TaskStatus>) {
        super();
        Object.assign(this, taskstatus);
    }
 


    @Column()
    name: string;

   


    // @ManyToOne(() => Task, (task) => task.taskhistory, {
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE",
    // })
    //   @JoinColumn({ name: "taskid", referencedColumnName: "id" })
    //   task: Task;
    



    @OneToMany(() => TaskStatus, (taskstatus) => taskstatus.taskhistory, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      taskhistory: TaskHistory[];









      


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
