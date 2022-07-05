import { createConnection } from 'typeorm'
import { PgOrganization } from '@/infra/entities/organization'
import { Organization } from '@/domain/entities/organization'
import { OrganizationRepository } from '@/domain/repositories/organization'

export class TypeOrmOrganizationRepository implements OrganizationRepository {
  public async load(id: string): Promise<Organization | undefined> {
    const connection = await createConnection()
    const pgOrganizationRepository = connection.getRepository(PgOrganization)
    const pgOrganization = await pgOrganizationRepository.findOne({ where: { id }})
    if (pgOrganization === null) return undefined
    return new Organization({
      id: pgOrganization.id,
      name: pgOrganization.name,
      description: pgOrganization.description
    })
  }

  public async save({ id, name, description }: { id: string, name: string, description: string}): Promise<void> {
    const connection = await createConnection()
    const pgOrganizationRepository = connection.getRepository(PgOrganization)
    const pgOrganization = await pgOrganizationRepository.findOne({ where: { id }})
    if (pgOrganization === null) {
      await pgOrganizationRepository.save({ id, name, description })
      return
    }
    if (name !== undefined) pgOrganization.name = name
    if (description !== undefined) pgOrganization.description = description
    await pgOrganizationRepository.save(pgOrganization)
  }
}
