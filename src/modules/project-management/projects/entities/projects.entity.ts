import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Client } from '../../../crm/client-profile/entities/clients.entity';
import { ProjectStatus } from '../dto/project-status.enum';
import { ProjectMilestone } from '../../project-milestones/entities/project-milestone.entity';
import { ProjectMember } from '../../project-members/entities/project-member.entity';
import { ProjectTechnology } from '../../project-technologies/entities/project-technology.entity';
import { Invoice } from '../../../billing/invoices/entities/invoice.entity';
import { ProjectUpdate } from '../../project-updates/entities/project-update.entity';
import { TimeEntry } from '../../time-entries/entities/time-entry.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
  })
  status: ProjectStatus;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  budget: number;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  images: string[];

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'client_id',
  })
  clientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Client, (client) => client.projects, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.project)
  timeEntries: TimeEntry[];

  @OneToMany(() => ProjectUpdate, (update) => update.project)
  updates: ProjectUpdate[];

  @OneToMany(() => ProjectMilestone, (milestone) => milestone.project)
  milestones: ProjectMilestone[];

  @OneToMany(() => ProjectMember, (member) => member.project)
  members: ProjectMember[];

  @OneToMany(() => ProjectTechnology, (pt) => pt.project)
  projectTechnologies: ProjectTechnology[];

  @OneToMany(() => Invoice, (invoice) => invoice.project)
  invoices: Invoice[];
}
