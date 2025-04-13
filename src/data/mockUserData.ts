
export type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  role: 'user' | 'store_owner' | 'admin';
  storesRated: number;
};

export const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Anytown, CA 94111', role: 'user', storesRated: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak Ave, Somewhere, NY 10001', role: 'user', storesRated: 8 },
  { id: 3, name: 'Tech Gadgets Inc.', email: 'info@techgadgets.com', address: '789 Tech Blvd, Silicon Valley, CA 94043', role: 'store_owner', storesRated: 0 },
  { id: 4, name: 'Michael Johnson', email: 'michael.j@example.com', address: '101 Pine Rd, Elsewhere, TX 75001', role: 'admin', storesRated: 0 },
  { id: 5, name: 'Sarah Williams', email: 'sarah.w@example.com', address: '202 Cedar St, Nowhere, WA 98001', role: 'user', storesRated: 12 },
  { id: 6, name: 'Gourmet Foods', email: 'contact@gourmetfoods.com', address: '303 Culinary Ave, Foodtown, IL 60007', role: 'store_owner', storesRated: 0 },
  { id: 7, name: 'Robert Martinez', email: 'robert.m@example.com', address: '404 Elm St, Someplace, FL 33101', role: 'user', storesRated: 3 },
  { id: 8, name: 'Emily Brown', email: 'emily.b@example.com', address: '505 Maple Dr, Anywhere, CO 80001', role: 'user', storesRated: 7 },
];
