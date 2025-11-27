import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ClientPlanQuotation } from '../../../client-plan-quotations/entities/client-plan-quotation.entity';
import { Invoice } from '../../../billing/invoices/entities/invoice.entity';
import { Project } from '../../../project-management/projects/entities/projects.entity';

@Entity('client_profile')
export class Client {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'profile_photo' })
  profilePhoto: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ClientPlanQuotation, (quotation) => quotation.client)
  clientPlanQuotations: ClientPlanQuotation[];

  @OneToMany(() => Invoice, (invoice) => invoice.client)
  invoices: Invoice[];

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];
}
