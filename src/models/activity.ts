import type { Profile } from "./User"
import type { PagedRequest } from "./auxillary/interfaces"

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
  host: Profile,
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
  attender: Profile,
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

export interface ActivityListOptions extends PagedRequest{
  hostedBy: string | null,
  joinedBy: string | null,
  dateFrom: Date | null,
  dateTo: Date | null,
}