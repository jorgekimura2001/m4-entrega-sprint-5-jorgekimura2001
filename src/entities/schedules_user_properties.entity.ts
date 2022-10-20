import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./users.entity";

@Entity('schedules_user_properties')
export class SchedulesUserProperties{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ type: "date" })
    date: string

    @Column({ type: "time" })
    hour: string

    @ManyToOne(() => User, { eager: true })
    user: User

    @ManyToOne(() => Properties)
    properties: Properties
}