package com.todo_backend.todo_backend.controller;

import com.todo_backend.todo_backend.dto.TodoFilterRequest;
import com.todo_backend.todo_backend.model.Todo;
import com.todo_backend.todo_backend.service.TodoService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/todos")
public class TodoController {

  private TodoService todoService;

  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  /**
   * Retrieves a list of todos based on the provided filter criteria.
   *
   * @param filter The filter request containing criteria for fetching todos.
   * @return A list of filtered todos.
   */
  @GetMapping("/filter")
  public List<Todo> getTodosByFilter(TodoFilterRequest filter) {
    return todoService.getTodosWithFilters(filter);
  }

  /**
   * Retrieves a specific todo by its ID.
   *
   * @param id The ID of the todo to retrieve.
   * @return The requested Todo object.
   * @throws ResponseStatusException if the todo is not found.
   */
  @GetMapping("/{id}")
  public Todo getTodoById(@PathVariable Long id) {
    return todoService
      .getTodoById(id)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")
      );
  }

  /**
   * Creates a new todo item.
   *
   * @param todo The todo object to be created.
   * @return The created Todo object.
   * @throws ResponseStatusException if the request data is invalid.
   */
  @PostMapping("")
  public Todo createTodo(@RequestBody Todo todo) {
    return todoService
      .createTodo(todo)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "Failed to create Todo: Invalid or missing data"
        )
      );
  }

  /**
   * Updates an existing todo item by its ID.
   *
   * @param id   The ID of the todo to update.
   * @param todo The updated todo object.
   * @return The updated Todo object.
   * @throws ResponseStatusException if the provided data is invalid or the todo is not found.
   */
  @PutMapping("/{id}")
  public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
    if (todo.getDueDate() == null || todo.getDescription() == null) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        "Todo data is not valid"
      );
    }
    return todoService
      .updateTodo(id, todo)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")
      );
  }

  /**
   * Deletes a todo item by its ID.
   *
   * @param id The ID of the todo to delete.
   * @return HTTP 204 (No Content) if deleted successfully, or 404 if not found.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
    if (todoService.deleteTodo(id)) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
