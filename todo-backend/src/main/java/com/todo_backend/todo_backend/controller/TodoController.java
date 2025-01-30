package com.todo_backend.todo_backend.controller;

import com.todo_backend.todo_backend.dto.TodoFilterRequest;
import com.todo_backend.todo_backend.model.Todo;
import com.todo_backend.todo_backend.service.TodoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/todos")
public class TodoController {

  @Autowired
  private TodoService toDoService;

  @GetMapping("/filter")
  public List<Todo> getTodosByFilter(TodoFilterRequest filter) {
    return toDoService.getTodosWithFilters(filter);
  }

  @GetMapping("/") //ToDo: võta "/" ära ja tee parandus frontendis
  public List<Todo> getAllTodos() {
    return toDoService.getAllTodos();
  }

  @GetMapping("/{id}")
  public Todo getTodoById(@PathVariable Long id) {
    return toDoService
      .getTodoById(id)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")
      );
  }

  @PostMapping("/") //ToDo: võta "/" ära ja tee parandus frontendis
  public Todo createTodo(@RequestBody Todo todo) {
    return toDoService
      .createTodo(todo)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "Failed to create Todo: Invalid or missing data"
        )
      );
  }

  @PutMapping("/{id}")
  public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
    if (todo.getDueDate() == null || todo.getDescription() == null) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        "Todo data is not valid"
      );
    }
    return toDoService
      .updateTodo(id, todo)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")
      );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
    if (toDoService.deleteTodo(id)) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
