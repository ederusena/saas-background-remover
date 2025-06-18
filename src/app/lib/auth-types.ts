import { User, Plan } from '@prisma/client'

export interface AuthResult {
  user: (User & { currentPlan?: Plan }) | null
  error: string | null
}