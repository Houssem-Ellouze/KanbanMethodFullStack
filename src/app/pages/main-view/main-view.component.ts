import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.models';
import { Task } from 'src/app/models/task.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  ngOnInit() {}

  // Board Definition
  board: Board = new Board('Test Board', [
    new Column('Ideas', [new Task('Task 1'), new Task('Task 2')]),
    new Column('Research', [new Task('Task 3'), new Task('Task 4')]),
    new Column('ToDo', [new Task('Task 5'), new Task('Task 6')]),
    new Column('Done', [new Task('Task 7'), new Task('Task 8')])
  ]);

  // Export Board as PDF
  exportBoardAsPDF(): void {
    const boardElement = document.querySelector('.board') as HTMLElement;
    if (!boardElement) return;

    html2canvas(boardElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Kanban_Board.pdf');
    });
  }

  // Add Task
  addTask(columnIndex: number): void {
    this.board.columns[columnIndex].tasks.push(new Task(''));
  }

  // Remove Task
  removeTask(columnIndex: number, taskIndex: number): void {
    this.board.columns[columnIndex].tasks.splice(taskIndex, 1);
  }



  // Drag and Drop Logic
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  list = ['Ideas', 'Research', 'ToDo', 'Done'];

  titleColors = ['#000000', '#000000', '#000000', '#000000'];

  colors = ['#FFB3B3', '#FFE0B3', '#D4FFB3', '#B3E5FF'];


  getColumnColor(index: number): string {
    return this.colors[index];
  }
  getTitleColor(index: number): string {
    return this.titleColors[index];
  }
}
