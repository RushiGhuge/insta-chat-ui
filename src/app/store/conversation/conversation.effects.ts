// conversation.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { refreshUser } from '../user/user.action';
import { loadConversation } from './conversation.actions';

@Injectable()
export class ConversationEffects {
  constructor(private actions$: Actions, private store: Store) {}
  loadConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConversation),
      switchMap(() => {
        return of(refreshUser()); // Dispatch the action to refresh user data
      })
    )
  );
}
