export const CLIENTS = [
  { id: "CLI-001", name: "Metalware India",         type: "Industrial",   loc: "New Delhi",   lat: 28.6139, lng: 77.2090, devices: 24,  energy: 184,  co2: 142.8, status: "live",      since: "Jan 2024", tier: "Enterprise", savings: 18.4, usersWithAccess: 4 },
  { id: "CLI-002", name: "Infosys Electronic City", type: "IT Campus",    loc: "Bengaluru",   lat: 12.8456, lng: 77.6603, devices: 142, energy: 892,  co2: 684.2, status: "live",      since: "Mar 2023", tier: "Enterprise", savings: 22.1, usersWithAccess: 12 },
  { id: "CLI-003", name: "ITC Grand Chola",         type: "Hospitality",  loc: "Chennai",     lat: 13.0117, lng: 80.2206, devices: 68,  energy: 324,  co2: 248.4, status: "live",      since: "Aug 2024", tier: "Growth",     savings: 15.8, usersWithAccess: 6 },
  { id: "CLI-004", name: "Flipkart Fulfillment",     type: "Warehousing",  loc: "Bengaluru",   lat: 13.1986, lng: 77.7066, devices: 48,  energy: 212,  co2: 162.4, status: "live",      since: "Nov 2024", tier: "Growth",     savings: 19.2, usersWithAccess: 5 },
  { id: "CLI-005", name: "IndiGo Hangar",            type: "Aviation",     loc: "Hyderabad",   lat: 17.2403, lng: 78.4294, devices: 32,  energy: 268,  co2: 205.1, status: "live",      since: "Feb 2025", tier: "Growth",     savings: 14.6, usersWithAccess: 4 },
  { id: "CLI-006", name: "Lemon Tree Hotels (Grp)",  type: "Hospitality",  loc: "Multi-site",  lat: 19.0760, lng: 72.8777, devices: 184, energy: 684,  co2: 523.8, status: "live",      since: "Jun 2024", tier: "Enterprise", savings: 21.3, usersWithAccess: 18 },
  { id: "CLI-007", name: "UPL Chemicals",            type: "Chemicals",    loc: "Jhagadia",    lat: 21.6567, lng: 73.0890, devices: 86,  energy: 1240, co2: 948.6, status: "live",      since: "Apr 2024", tier: "Enterprise", savings: 11.2, usersWithAccess: 8 },
  { id: "CLI-008", name: "Apollo Hospital",          type: "Healthcare",   loc: "Chennai",     lat: 13.0569, lng: 80.2425, devices: 54,  energy: 418,  co2: 320.4, status: "live",      since: "Jul 2024", tier: "Growth",     savings: 16.9, usersWithAccess: 7 },
  { id: "CLI-009", name: "Reliance Jamnagar",        type: "Energy",       loc: "Jamnagar",    lat: 22.4707, lng: 70.0577, devices: 0,   energy: 0,    co2: 0,     status: "handover",  since: "Oct 2026", tier: "Enterprise", savings: null, usersWithAccess: 3 },
  { id: "CLI-010", name: "Aditya Birla Textile",     type: "Manufacturing",loc: "Pune",         lat: 18.5204, lng: 73.8567, devices: 0,   energy: 0,    co2: 0,     status: "deploying", since: "Sep 2026", tier: "Growth",     savings: null, usersWithAccess: 2 },
  { id: "CLI-011", name: "Marriott BLR Marathahalli",type: "Hospitality",  loc: "Bengaluru",   lat: 12.9591, lng: 77.6974, devices: 0,   energy: 0,    co2: 0,     status: "proposal",  since: "Discovery",tier: "Growth",     savings: null, usersWithAccess: 1 },
  { id: "CLI-012", name: "Tata Steel Jamshedpur",    type: "Steel",         loc: "Jamshedpur",  lat: 22.8046, lng: 86.2029, devices: 0,   energy: 0,    co2: 0,     status: "lead",      since: "—",       tier: "Enterprise", savings: null, usersWithAccess: 0 },
];

export const CLIENT_ACCESS_USERS = [
  { name: "Sarah Chen",    email: "s.chen@client.in",   role: "Facility Head", level: "Admin",  lastActive: "2h ago",   status: "active" },
  { name: "Raj Patel",     email: "r.patel@client.in",  role: "Operations",    level: "Editor", lastActive: "1d ago",   status: "active" },
  { name: "Deepak Kumar",  email: "d.kumar@client.in",  role: "Energy Mgr",    level: "Viewer", lastActive: "3d ago",   status: "active" },
  { name: "Audit Partner", email: "audit@kpmg.in",      role: "External",      level: "Viewer", lastActive: "22d ago",  status: "limited" },
];
