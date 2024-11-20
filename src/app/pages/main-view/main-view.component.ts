import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.models';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  ngOnInit() {}

  // Method to generate an array of empty tasks
  generateTasks(count: number): Task[] {
    return Array.from({ length: count }, () => new Task(""));
  }

  // Define board with columns and tasks
  board: Board = new Board('Test Board', [
    new Column('Ideas', this.generateTasks(5)),
    new Column('Research', this.generateTasks(5)),
    new Column('Todo', this.generateTasks(5)),
    new Column('Done', this.generateTasks(5))
  ]);

  // Method to handle drag and drop
  drop(event: CdkDragDrop<Task[]>) {
    // If the task is moved within the same column
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // If the task is moved to another column
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
