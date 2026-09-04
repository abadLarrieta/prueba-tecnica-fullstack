import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string | null;

    @Column({ default: false })
    completado: boolean;

    @CreateDateColumn()
    fechaCreacion: Date;
}