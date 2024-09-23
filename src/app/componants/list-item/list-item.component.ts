import { Component, Input } from '@angular/core';
import { User } from '../../constants/constant';
import { Store } from '@ngrx/store';
import { selectOplineUsersList as selectOnlineUsersList } from '../../store/user/user.select';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input() user: User | undefined;
  constructor(public store: Store<any>, public router: Router) {}
  isUserOnline = false;
  subscription: Subscription[] = [];

  ngOnInit(): void {
    console.log(this.user);
    const Subscription$ = this.store
      .select(selectOnlineUsersList)
      .subscribe((list) => {
        if (this.user) this.isUserOnline = list.includes(this.user._id);
      });
    this.subscription.push(Subscription$);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
