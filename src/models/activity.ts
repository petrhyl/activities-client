import type { User } from "./User"

export interface Activity {
  id: string,
  title: string,
  beginDate: Date,
  description: string,
  category: ActivityCategory,
  city: string,
  venue: string,
  isActive: boolean,
  attenders: Attendee[],
  host: User,
  isCurrentUserAttender: boolean
}

export interface ActivityRequest {
  id?: string,
  title: string,
  beginDate: Date,
  description: string,
  category: ActivityCategory,
  city: string,
  venue: string,
  isActive: boolean
}

export interface ActivityCategory {
  id: string,
  name: string,
  value: string
}

export interface Attendee {
  attender: User,
  isHost: boolean
}

export interface ChatPost {
  id: number,
  content: string,
  createdAt: Date,
  username: string,
  displayName: string,
  userImage: string
}

export interface ChatPostRequest {
  activityId: string,
  content: string
}