package com.todo_backend.todo_backend.service;

import com.todo_backend.todo_backend.dto.TodoFilterRequest;
import com.todo_backend.todo_backend.model.Todo;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodoService {
  List<Todo> getAllTodos();

  Optional<Todo> getTodoById(Long id);

  Optional<Todo> createTodo(Todo todo);

  Optional<Todo> updateTodo(Long id, Todo todo);

  boolean deleteTodo(Long id);

  List<Todo> getTodosWithFilters(TodoFilterRequest filter);
}
