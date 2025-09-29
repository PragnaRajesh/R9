import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download
} from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  email: string;
  contact: string;
  position: string;
  location: string;
  client: string;
  status: 'Selected' | 'Joined' | 'Pending' | 'Rejected' | 'In Progress';
  doj: string;
  salary: string;
  recruiterName: string;
  reportingLead: string;
  reportingManager: string;
  arpu: string;
  additionalInfo: string;
  notes: string;
}

interface CandidateTableProps {
  selectedKPI: string | null;
  onAction?: (key: string) => void;
  filters?: { month?: string; recruiter?: string; client?: string };
}

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    contact: '+1 (555) 123-4567',
    position: 'Software Engineer',
    location: 'San Francisco, CA',
    client: 'TechCorp',
    status: 'Selected',
    doj: '2024-01-15',
    salary: '$120,000',
    recruiterName: 'Sarah Chen',
    reportingLead: 'Mike Johnson',
    reportingManager: 'Lisa Wong',
    arpu: '$15,000',
    additionalInfo: 'React, Node.js',
    notes: 'Strong technical background'
  },
  {
    id: 2,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    contact: '+1 (555) 234-5678',
    position: 'Product Manager',
    location: 'New York, NY',
    client: 'Global Inc',
    status: 'Joined',
    doj: '2024-01-08',
    salary: '$140,000',
    recruiterName: 'Mike Johnson',
    reportingLead: 'Sarah Chen',
    reportingManager: 'David Kumar',
    arpu: '$18,000',
    additionalInfo: 'Agile, Scrum',
    notes: 'Excellent leadership skills'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    contact: '+1 (555) 345-6789',
    position: 'Data Scientist',
    location: 'Seattle, WA',
    client: 'Startup X',
    status: 'Pending',
    doj: '2024-02-01',
    salary: '$110,000',
    recruiterName: 'Lisa Wong',
    reportingLead: 'David Kumar',
    reportingManager: 'Sarah Chen',
    arpu: '$14,000',
    additionalInfo: 'Python, ML',
    notes: 'PhD in Computer Science'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    contact: '+1 (555) 456-7890',
    position: 'UX Designer',
    location: 'Austin, TX',
    client: 'TechCorp',
    status: 'In Progress',
    doj: '2024-01-22',
    salary: '$95,000',
    recruiterName: 'David Kumar',
    reportingLead: 'Lisa Wong',
    reportingManager: 'Mike Johnson',
    arpu: '$12,000',
    additionalInfo: 'Figma, Adobe XD',
    notes: 'Strong portfolio'
  },
  {
    id: 5,
    name: 'James Rodriguez',
    email: 'james.rodriguez@email.com',
    contact: '+1 (555) 567-8901',
    position: 'DevOps Engineer',
    location: 'Denver, CO',
    client: 'Global Inc',
    status: 'Selected',
    doj: '2024-02-05',
    salary: '$125,000',
    recruiterName: 'Sarah Chen',
    reportingLead: 'Mike Johnson',
    reportingManager: 'Lisa Wong',
    arpu: '$16,000',
    additionalInfo: 'AWS, Docker',
    notes: 'Cloud architecture expert'
  }
];

const statusColors = {
  'Selected': 'bg-blue-100 text-blue-800',
  'Joined': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Rejected': 'bg-red-100 text-red-800',
  'In Progress': 'bg-purple-100 text-purple-800'
};

export function CandidateTable({ selectedKPI, onAction }: CandidateTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Candidate>('recruiterName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = mockCandidates.filter(candidate => {
      // Search filter
      const matchesSearch = searchTerm === '' ||
        Object.values(candidate).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );

      // KPI filter
      const matchesKPI = !selectedKPI ||
        (selectedKPI === 'Targets Pending' && candidate.status === 'Pending') ||
        (selectedKPI === 'Selections' && candidate.status === 'Selected') ||
        (selectedKPI === 'Joined' && candidate.status === 'Joined') ||
        (selectedKPI === 'Open Positions' && candidate.status === 'In Progress');

      // Recruiter filter
      const matchesRecruiter = selectedRecruiter === 'all' || candidate.recruiterName === selectedRecruiter;

      // Client filter
      const matchesClient = selectedClient === 'all' || candidate.client === selectedClient;

      // Month filter (based on DOJ month)
      const candidateMonth = new Date(candidate.doj).toLocaleString('default', { month: 'long' }).toLowerCase();
      const matchesMonth = selectedMonth === 'all' || candidateMonth === selectedMonth;

      return matchesSearch && matchesKPI && matchesRecruiter && matchesClient && matchesMonth;
    });

    // Sort data
    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, selectedKPI, selectedMonth, selectedRecruiter, selectedClient]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: keyof Candidate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map(candidate => candidate.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recruiters</SelectItem>
                <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                <SelectItem value="Lisa Wong">Lisa Wong</SelectItem>
                <SelectItem value="David Kumar">David Kumar</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="TechCorp">TechCorp</SelectItem>
                <SelectItem value="Global Inc">Global Inc</SelectItem>
                <SelectItem value="Startup X">Startup X</SelectItem>
              </SelectContent>
            </Select>

            {selectedKPI && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Filtered by: {selectedKPI}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedRows.length > 0 && (
              <Button variant="outline" size="sm">
                Bulk Actions ({selectedRows.length})
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">Sl No</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Candidate Name
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>DOJ</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('recruiterName')}
              >
                <div className="flex items-center">
                  Recruiter
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </div>
              </TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>ARPU</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="sticky right-0 bg-white z-10">Closure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((candidate, index) => (
              <TableRow key={candidate.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(candidate.id)}
                    onCheckedChange={(checked) => handleSelectRow(candidate.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-navy-dark">{candidate.name}</p>
                    <p className="text-sm text-gray-500">{candidate.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">{candidate.contact}</span>
                  </div>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>{candidate.client}</TableCell>
                <TableCell>
                  <Badge className={statusColors[candidate.status]}>
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell>{candidate.doj}</TableCell>
                <TableCell className="font-medium">{candidate.salary}</TableCell>
                <TableCell>{candidate.recruiterName}</TableCell>
                <TableCell>{candidate.reportingLead}</TableCell>
                <TableCell>{candidate.reportingManager}</TableCell>
                <TableCell className="font-medium">{candidate.arpu}</TableCell>
                <TableCell>
                  <div className="max-w-32">
                    <p className="text-sm text-gray-600 truncate" title={candidate.notes}>
                      {candidate.notes}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="sticky right-0 bg-white">
                  <Button size="sm" className="bg-blue-bright hover:bg-blue-600 text-white" onClick={() => onAction && onAction('addClosure')}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredAndSortedData.length)} of{' '}
            {filteredAndSortedData.length} results
          </p>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && <span className="text-gray-400">...</span>}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
