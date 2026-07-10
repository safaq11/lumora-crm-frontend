export interface Reminder {

  id?: number;

  customerLeadId: number;

  customerName: string;

  discussion: string;

  nextFollowUpDate: string;

  remarks: string;

  createdDate?: string;

}