import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { SchedulesUserProperties } from "./schedules_user_properties.entity";

@Entity('users')

export class User {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    readonly isAdm: boolean

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => SchedulesUserProperties, schedulesUserProperties => schedulesUserProperties.user)
    SchedulesUserProperties: SchedulesUserProperties[]
}