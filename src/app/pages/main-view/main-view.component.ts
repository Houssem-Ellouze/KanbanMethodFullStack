import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.models';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  ngOnInit() {}
  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "",
      "",
      "",
      "",
      "",
      ""

    ]),
    new Column('Research', [
      "",
      "",
      "",
      "",
      "",
      ""
    ]),
    new Column('Todo', [
      "",
      "",
      "",
      "",
      "",
      ""
    ]),
    new Column('Done', [
      "",
      "",
      "",
      "",
      "",
      ""
    ])
  ]);

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
