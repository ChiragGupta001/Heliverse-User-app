
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/User.model';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css'] 
})
export class TeamDialogComponent {
  teamMembers: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TeamDialogComponent>,
    private teamService: TeamService 
  ) {
    this.teamMembers = data.teamMembers;
  }

 
  removeMember(member: User): void {
    this.teamService.removeMemberFromTeam(member);
    this.data.teamMembers = this.data.teamMembers.filter((m: User) => m.id !== member.id);
    this.dialogRef.close();
  }
  
}
