import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Generated,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
 
  @Entity()
  export class File {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty()
    created: Date;  
     
    @ApiProperty()
    @Column({
        name: 'path',
        type: 'varchar',
        length: 512,
        unique: true,
    })
    path: string;
    
    @Column()
    @Generated('uuid')
    alias: string;
  }
  