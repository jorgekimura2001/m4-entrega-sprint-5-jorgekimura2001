import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addresses } from "./addresses.entity";

@Entity('properties')

export class Properties{
    
    @PrimaryGeneratedColumn('uuid')
    readonly id:string

    @Column({default: false})
    sold: boolean

    @Column()
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses, { eager: true }) @JoinColumn()
    address: Addresses
}