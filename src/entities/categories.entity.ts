import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";

@Entity('categories')

export class Category {
    @PrimaryGeneratedColumn('uuid')
    readonly id:string

    @Column({ unique:true })
    name: string

    @OneToMany(() => Properties, properties => properties.category)
    properties: Properties[]
}