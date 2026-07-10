export interface CustomerLead {

    id?: number;

    customerName: string;

    mobile: string;

    alternateNumber: string;

    email: string;

    leadTypeId: number;

    leadTypeName?: string;

    city: string;

    address: string;

    requirement: string;

    leadSource: string;

    assignedExecutive: string;

    discussionDetails: string;

    visitDate: string;

    nextFollowUpDate: string;

    status: string;

    priority: string;

    createdDate?: string;

}