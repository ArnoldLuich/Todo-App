package com.todo_backend.todo_backend.service;

import com.todo_backend.todo_backend.dto.TodoFilterRequest;
import com.todo_backend.todo_backend.model.Todo;
import com.todo_backend.todo_backend.repository.TodoRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class TodoServiceImpl implements TodoService {

  @Autowired
  private TodoRepository todoRepository;

  @Override
  public List<Todo> getAllTodos() {
    return todoRepository.findAll();
  }

  @Override
  public Optional<Todo> getTodoById(Long id) {
    return todoRepository.findById(id);
  }

  @Override
  public Optional<Todo> createTodo(Todo todo) {
    if (todo.getDescription() != null && todo.getDueDate() != null) {
      todo.setId(null); // Ensure a new Todo is created
      Todo savedTodo = todoRepository.save(todo);
      return Optional.of(savedTodo);
    }
    return Optional.empty();
  }

  @Override
  public Optional<Todo> updateTodo(Long id, Todo todo) {
    if (todoRepository.existsById(id)) {
      todo.setId(id); // Make sure the ID of the passed Todo is the same as the one we want to update
      Todo savedTodo = todoRepository.save(todo);
      return Optional.of(savedTodo);
    }
    return Optional.empty();
  }

  @Override
  public boolean deleteTodo(Long id) {
    boolean exists = todoRepository.existsById(id);
    if (exists) {
      todoRepository.deleteById(id);
    }
    return exists;
  }

  @Override
  public List<Todo> getTodosWithFilters(TodoFilterRequest filter) {
    Specification<Todo> spec = Specification.where(
      TodoSpecification.hasDone(filter.isDone())
    )
      .and(TodoSpecification.hasDueDate(filter.dueDate()))
      .and(TodoSpecification.dueDateBefore(filter.dueDateBefore()))
      .and(TodoSpecification.dueDateAfter(filter.dueDateAfter()))
      .and(TodoSpecification.descriptionContains(filter.description()));

    return todoRepository.findAll(spec);
  }
}
