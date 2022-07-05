import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'organization' })
export class PgOrganization {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  description!: string
}
