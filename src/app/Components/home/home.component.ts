import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data = {};

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTodo();
  }
  addTodo(todo: { value: any }) {
    const obj = { todo: todo.value };
    this.todoService.addTodo(obj).subscribe((res: any) => {
      console.log(res);
      this.getAllTodos();
      todo.value = '';
    });
  }
  getAllTodos() {
    this.todoService.getAllTodos().subscribe((res: any) => {
      Object.keys(res).forEach((key) => {
        this.data[key] = res[key];
      });
    });
  }

  updateTodo() {
    this.todoService.updateTodo(this.data).subscribe(
      (res) => {},
      (err) => {
        console.error(err);
      }
    );
  }
  removeTodo(id: any) {
    if (confirm("Bu maddeyi silmek istediğinize emin misiniz ?")) {
      this.todoService.removeTodo(id).subscribe((res) => {
        this.getAllTodos();
      });
    }
  }
}
