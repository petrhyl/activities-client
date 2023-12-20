import type { User } from "./User"

export interface Activity {
  id?: string,
  title: string,
  beginDate: Date,
  description: string,
  category: ActivityCategory,
  city: string,
  venue: string,
  isActive: boolean,
  attenders: Attendee[]
}

export interface ActivityCategory {
    id: string,
    name: string,
    value: string
 }

export interface Attendee{
  attender: User,
  isHost: boolean
}
