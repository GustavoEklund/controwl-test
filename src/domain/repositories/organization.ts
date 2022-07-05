import { Organization } from '@/domain/entities/organization'

export interface OrganizationRepository {
  load: (id: string) => Promise<Organization | undefined>
  save: (input: OrganizationRepository.Input) => Promise<void>
}

export namespace OrganizationRepository {
  export type Input = Organization
}
