import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn, OneToMany, OneToOne,
  } from "typeorm";
  
 
  import User from "./User";
  import Entity from "./Entity";
import TaskHistory from "./TaskHistory";
 
  // import ProjectData from "./ProjectData";
  
  @TYPEORM_ENTITY("tasks")
  export default class Task extends Entity {
    
    constructor(task: Partial<Task>) {
      super();
      Object.assign(this, task);
    }
    @Index()
    @Column({ unique: true })
    title: string;
  
   
    @Column()
    description: string;

  

    @OneToMany(() => Task, (task) => task.taskhistory, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
    taskhistory: TaskHistory[];
  
   
  
  
    @ManyToOne(() => User, (user) => user.task, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
    @JoinColumn({ name: "addedby", referencedColumnName: "username" })
    user: User;
  
    // @ManyToOne(() => Projectdata, (projectdata) => projectdata.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    
    // @ManyToOne(() => Result, (Result) => Result.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
  
  
  
    // @OneToMany(() => Projectdata, (projectdata) => projectdata.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // project: Project;
  
    // @OneToMany(() => Unit, (unit) => unit.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // unitid: Project;
  
    
    // @OneToMany(() => Actualcost, (actualcost) => actualcost.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projectid: Project;
  
    // @OneToMany(() => Output, (output) => output.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projectoutput: Project;
  
    // @OneToMany(() => Unit, (unit) => unit.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projectunit: Project;
  
    // @JoinColumn({ name: "projectname", referencedColumnName: "name" })
    // project: Project;
    
  //   @ManyToOne(() => Project, (project) => project.Location, {
  //     onUpdate: "CASCADE",
  //     onDelete: "CASCADE",
  // })
  //   @JoinColumn({ name: "locationId", referencedColumnName: "id" })
  //   location: Location;
  
    // @OneToMany(() => Location, (location) => location.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // location: Project[];
    // // @OneToMany(() => Location, location => location.project)
    // // location: Location[];
    
//     @ManyToOne(() => Location, (location) => location.project, {
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//   })
//     @JoinColumn({ name: "countryName", referencedColumnName: "Country" })
//     location: Location;
  
  
//     @ManyToOne(() => Currency, (currency) => currency.project, {
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//   })
//     @JoinColumn({ name: "currency", referencedColumnName: "currency" })
//     currency: Currency;
    
  
    // @OneToMany(() => Project, (project) => project.Location, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // project: Project[];
  
    // @OneToOne(() => Location)
    // @JoinColumn()
    // location: Project;
    // @OneToOne(() => Location, location => Location.project) // specify inverse side as a second parameter
    // @JoinColumn()
    // project: Project;
  
    
    // @OneToOne(() => Profile, profile => profile.user) // specify inverse side as a second parameter
    // @JoinColumn()
    // profile: Profile;
  
  }
  