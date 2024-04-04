import { User } from './User.model';

export class Team {
  members: User[];

  constructor() {
    this.members = [];
  }

  
  addMember(member: User): void {
    const isUnique = !this.members.some(m => m.domain === member.domain && m.available === member.available);
    if (isUnique) {
      this.members.push(member);
    }
  }

  removeMember(member: User): void {
    const index = this.members.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }
}
