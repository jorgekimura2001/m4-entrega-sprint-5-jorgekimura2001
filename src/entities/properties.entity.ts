import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addresses } from "./addresses.entity";
import { Category } from "./categories.entity";
import { SchedulesUserProperties } from "./schedules_user_properties.entity";

@Entity('properties')

export class Properties{
    
    @PrimaryGeneratedColumn('uuid')
    readonly id:string

    @Column({default: false})
    sold: boolean

    @Column({type: "decimal", precision: 12, scale: 2})
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses, { eager: true }) @JoinColumn()
    address: Addresses

    @ManyToOne(() => Category, { eager: true })
    category: Category

    @OneToMany(() => SchedulesUserProperties, schedulesUserProperties => schedulesUserProperties.properties)
    schedules: SchedulesUserProperties[]
}