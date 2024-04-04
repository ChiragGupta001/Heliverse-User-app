import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from './models/Team.model';
import { User } from './models/User.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private team: Team = new Team();
  private teamSubject: BehaviorSubject<Team> = new BehaviorSubject<Team>(this.team);
  private teamMemberIds: Set<number> = new Set<number>();
  private teamMembers: User[] = [];

  constructor() {

    if (this.isLocalStorageAvailable()) {
      
      const storedTeamMembers = localStorage.getItem('teamMembers');
      if (storedTeamMembers) {
        this.teamMembers = JSON.parse(storedTeamMembers);
        this.teamMembers.forEach(member => this.teamMemberIds.add(member.id));
        this.updateTeam();
      }
    }
  }

  
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }


  getTeam(): Observable<Team> {
    return this.teamSubject.asObservable();
  }

  getTeamMembers(): User[] {
    return this.teamMembers;
  }


  addMemberToTeam(member: User): void {
    if (!this.isUserInTeam(member.id)) {
      this.team.addMember(member);
      this.teamMemberIds.add(member.id);
      this.teamMembers.push(member); 
      this.updateTeam();
    }
  }

 
  removeMemberFromTeam(member: User): void {
    this.team.removeMember(member);
    this.teamMemberIds.delete(member.id);
    this.teamMembers = this.teamMembers.filter(m => m.id !== member.id);
    this.updateTeam();
  }

  isUserInTeam(userId: number): boolean {
    return this.teamMemberIds.has(userId);
  }


  private updateTeam(): void {
    this.teamSubject.next(this.team);
    localStorage.setItem('teamMembers', JSON.stringify(this.teamMembers));
  }
}
