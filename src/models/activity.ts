export interface Activity {
  id?: string,
  title: string,
  beginDate: Date,
  description: string,
  category: ActivityCategory,
  city: string,
  venue: string
}

export interface ActivityCategory {
    id: string,
    name: string,
    value: string
 }
