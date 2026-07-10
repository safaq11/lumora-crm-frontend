export interface Dashboard {

  totalLeads: number;

  todayFollowUps: number;

  pendingFollowUps: number;

  hotCustomers: number;

  closedDeals: number;

  statusCounts: { [key: string]: number };

  priorityCounts: { [key: string]: number };

}