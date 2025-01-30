package com.todo_backend.todo_backend.service;

import com.todo_backend.todo_backend.model.Todo;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class TodoSpecification {

  public static Specification<Todo> hasDone(Boolean isDone) {
    return (root, query, cb) ->
      isDone != null ? cb.equal(root.get("isDone"), isDone) : null;
  }

  public static Specification<Todo> hasDueDate(LocalDate dueDate) {
    return (root, query, cb) ->
      dueDate != null ? cb.equal(root.get("dueDate"), dueDate) : null;
  }

  public static Specification<Todo> dueDateBefore(LocalDate dueDate) {
    return (root, query, cb) ->
      dueDate != null ? cb.lessThan(root.get("dueDate"), dueDate) : null;
  }

  public static Specification<Todo> dueDateAfter(LocalDate dueDate) {
    return (root, query, cb) ->
      dueDate != null ? cb.greaterThan(root.get("dueDate"), dueDate) : null;
  }

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
