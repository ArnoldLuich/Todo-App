package com.todo_backend.todo_backend.service;

import com.todo_backend.todo_backend.model.Todo;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class TodoFilterSpecification {

  // Specification to filter Todos by their completion status (isDone)
  public static Specification<Todo> hasDone(Boolean isDone) {
    return (root, query, cb) ->
      isDone != null ? cb.equal(root.get("isDone"), isDone) : null;
  }

  //Specification to filter Todos by their due date.
  public static Specification<Todo> hasDueDate(LocalDate dueDate) {
    return (root, query, cb) ->
      dueDate != null ? cb.equal(root.get("dueDate"), dueDate) : null;
  }

  //Specification to filter Todos by a due date before the provided date.
  public static Specification<Todo> dueDateBefore(LocalDate dueDate) {
    return (root, query, cb) ->
      dueDate != null ? cb.lessThan(root.get("dueDate"), dueDate) : null;
  }

  //Specification to filter Todos by a due date after the provided date.
  public static Specification<Todo> dueDateAfter(LocalDate dueDate) {
    return (root, query, cb) ->
      dueDate != null ? cb.greaterThan(root.get("dueDate"), dueDate) : null;
  }

  //Specification to filter Todos by a description that contains the provided text.
  public static Specification<Todo> descriptionContains(String description) {
    return (root, query, cb) ->
      !StringUtils.hasText(description)
        ? null
        : cb.like(
          cb.lower(root.get("description")),
          "%" + description.toLowerCase() + "%"
        );
  }
}
