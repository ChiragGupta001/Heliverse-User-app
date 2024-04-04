import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User.model';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../team.service';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  selectedTeamMembers: User[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  usersPerPage: number = 20;
  filters: any = {
    domain: '',
    gender: '',
    availability: ''
  };

  domains: string[] = ['UI Designing', 'IT', 'Business Development', 'Marketing', 'Finance', 'Sales', 'Management'];
  genders: string[] = ['Bigender', 'Genderqueer', 'Non-binary', 'Agender', 'Genderfluid', 'Female', 'Male', 'Polygender'];

  @Output() teamMembersSelected: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  filterUsers(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    
    this.currentPage = 1;

  
    this.filteredUsers = this.users.filter(user => {
      
      const matchesSearchQuery =
        user.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchQuery.toLowerCase());

    
      const matchesDomain = !this.filters.domain || user.domain.toLowerCase() === this.filters.domain.toLowerCase();

     
      const matchesGender = !this.filters.gender || user.gender.toLowerCase() === this.filters.gender.toLowerCase();

     
      const matchesAvailability =
        this.filters.availability === '' || user.available === (this.filters.availability === 'true');


      return matchesSearchQuery && matchesDomain && matchesGender && matchesAvailability;
    });

    if (this.filteredUsers.length === 0) {
      this.currentPage = 1;
    }
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.filteredUsers
      .filter(user => !this.teamService.isUserInTeam(user.id))
      .slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  openTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '400px',
      data: { teamMembers: this.teamService.getTeamMembers() }
    });

    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  addUserToTeam(user: User): void {
    user.selected = !user.selected;
    if (user.selected) {
      if (this.isUniqueAvailabilityAndDomain(user)) {
        console.log(this.teamService.getTeamMembers())
        this.teamService.addMemberToTeam(user);
        this.openTeamDialog();
      } else {
        this.snackBar.open('A user with similar domain and availability is already in the team', 'Close', {
          duration: 3000
        });
      }
    } else {
      this.teamService.removeMemberFromTeam(user);
    }
  }

  isUniqueAvailabilityAndDomain(user: User): boolean {
    const teamMembers = this.teamService.getTeamMembers();
    if (teamMembers.length === 0) {
      return true;
    }
    return !teamMembers.some(member => member.domain === user.domain && member.available === user.available);
  }
}
