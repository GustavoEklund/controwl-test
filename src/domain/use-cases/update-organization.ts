import { TypeOrmOrganizationRepository } from '@/infra/repos/organization'
import { Organization } from '@/domain/entities/organization'
import { OrganizationRepository } from '@/domain/repositories/organization'


interface UpdateOrganization {
  perform: (input: UpdateOrganization.Input) => void
}

export class UpdateOrganizationUseCase implements UpdateOrganization {
  public constructor(private readonly organizationRepository: OrganizationRepository) {}

  public async perform(input: UpdateOrganization.Input): Promise<void> {
    const organization = await this.organizationRepository.load(input.organization.id)
    if (organization === undefined) throw new Error('organization not found')
    organization.updateName(input.organization.name)
    organization.updateDescription(input.organization.description)
    this.organizationRepository.save(organization)
  }
}

export namespace UpdateOrganization {
  type Organization = {
    id: string
    name: string
    description: string
  }
  export type Input = {
    organization: Organization
  }
}











const organizationRepository = new TypeOrmOrganizationRepository()
const updateOrganizationUseCase = new UpdateOrganizationUseCase(organizationRepository)
updateOrganizationUseCase.perform({
  organization: {
    id: '1',
    name: 'Organization 1',
    description: 'Description 1'
  }
})
