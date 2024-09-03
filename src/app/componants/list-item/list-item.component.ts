import { Component, Input } from '@angular/core';
import { User } from '../../constants/constant';
import { Store } from '@ngrx/store';
import { selectOplineUsersList } from '../../store/user/user.select';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input() user: User | undefined;
  constructor(public store: Store<any>) {}
  isUserOnline = false;

  ngOnInit(): void {
    console.log(this.user);
    this.store.select(selectOplineUsersList).subscribe((list) => {
      console.log(list);
      if (this.user) this.isUserOnline = list.includes(this.user._id);
    });
  }
}
