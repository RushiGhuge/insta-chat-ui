import { Component, Input } from '@angular/core';
import { User } from '../../constants/constant';
import { Store } from '@ngrx/store';
import { selectOplineUsersList } from '../../store/user/user.select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input() user: User | undefined;
  constructor(public store: Store<any>) {}
  isUserOnline = false;
  subscribtion: Subscription[] = [];

  ngOnInit(): void {
    const Subscribtion$ = this.store
      .select(selectOplineUsersList)
      .subscribe((list) => {
        if (this.user) this.isUserOnline = list.includes(this.user._id);
      });
    this.subscribtion.push(Subscribtion$);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtion.forEach((subscribtion) => {
      subscribtion.unsubscribe();
    });
  }
}
