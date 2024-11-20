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

  list = ['Ideas', 'Research', 'ToDo', 'Done'];

  titleColors = ['#000000', '#000000', '#000000', '#000000'];

  colors = ['#FFB3B3', '#FFE0B3', '#D4FFB3', '#B3E5FF'];

  // Define board with columns and tasks
  board: Board = new Board('Test Board', [
    new Column(this.list[0], this.generateTasks(5)),
    new Column(this.list[1], this.generateTasks(5)),
    new Column(this.list[2], this.generateTasks(5)),
    new Column(this.list[3], this.generateTasks(5))
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

  // Get the color for a specific column
  getColumnColor(index: number): string {
    return this.colors[index];
  }
  getTitleColor(index: number): string {
    return this.titleColors[index];
  }

  addTask(columnIndex: number): void {
    this.board.columns[columnIndex].tasks.push(new Task(''));
  }

}
