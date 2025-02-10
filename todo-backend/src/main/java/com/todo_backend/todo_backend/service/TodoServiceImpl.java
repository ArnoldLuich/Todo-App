package com.todo_backend.todo_backend.service;

import com.todo_backend.todo_backend.dto.TodoFilterRequest;
import com.todo_backend.todo_backend.model.Todo;
import com.todo_backend.todo_backend.repository.TodoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/**
 * This service interacts with the repository to manage Todo entities.
 * It provides methods to create, update, delete, retrieve, and filter Todo items.
 */
@Service
public class TodoServiceImpl implements TodoService {

  private final TodoRepository todoRepository;

  public TodoServiceImpl(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  /**
   * Retrieves a Todo by its ID.
   * @param id The ID of the Todo to retrieve.
   * @return An Optional containing the Todo if found, or empty if not.
   */
  @Override
  public Optional<Todo> getTodoById(Long id) {
    return todoRepository.findById(id);
  }

  /**
   * Creates a new Todo in the database.
   * @param todo The Todo object to be created.
   * @return An Optional containing the saved Todo if creation was successful, or empty if validation fails.
   */
  @Override
  public Optional<Todo> createTodo(Todo todo) {
    try {
      todo.setId(null); // Ensure a new Todo is created
      Todo savedTodo = todoRepository.save(todo);
      return Optional.of(savedTodo);
    } catch (Exception e) {
      return Optional.empty();
    }

  }

  /**
   * Updates an existing Todo in the database.
   * @param id The ID of the Todo to update.
   * @param todo The updated Todo data.
   * @return An Optional containing the updated Todo if successful, or empty if the Todo does not exist.
   */
  @Override
  public Optional<Todo> updateTodo(Long id, Todo todo) {
      return todoRepository.findById(id).map(existingTodo -> {

        existingTodo.setDescription(todo.getDescription());
        existingTodo.setDueDate(todo.getDueDate());
        existingTodo.setDone(todo.isDone());

        Todo updatedTodo = todoRepository.save(existingTodo);
        return Optional.of(updatedTodo);
      }).orElse(Optional.empty());
  }

  /**
   * Deletes a Todo by its ID.
   * @param id The ID of the Todo to delete.
   * @return true if the Todo was successfully deleted, false if the Todo does not exist.
   */
  @Override
  public boolean deleteTodo(Long id) {
    if (!todoRepository.existsById(id)) {
      return false;
    }
    todoRepository.deleteById(id);
    return true;
  }

  /**
   * Retrieves a list of Todos based on filters provided in the TodoFilterRequest.
   * @param filter The filter criteria to apply to the Todo list.
   * @return A list of Todos that match the provided filters.
   */
  @Override
  public List<Todo> getTodosWithFilters(TodoFilterRequest filter) {
    Specification<Todo> spec = Specification.where(
      TodoFilterSpecification.hasDone(filter.isDone())
    )
      .and(TodoFilterSpecification.hasDueDate(filter.dueDate()))
      .and(TodoFilterSpecification.dueDateBefore(filter.dueDateBefore()))
      .and(TodoFilterSpecification.dueDateAfter(filter.dueDateAfter()))
      .and(TodoFilterSpecification.descriptionContains(filter.description()));

    return todoRepository.findAll(spec);
  }
}
