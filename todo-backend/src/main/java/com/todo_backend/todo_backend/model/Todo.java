package com.todo_backend.todo_backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

/**
 * Represents a Todo item entity in the database.
 * This class is mapped to the "todo" table, with properties reflecting the columns in the table.
 */
@Entity
@Table(name = "todo")
@Setter
@Getter
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
  private Long id;

  @NonNull
  @JsonFormat(shape = JsonFormat.Shape.STRING)
  @Column(nullable = false) // Database-level non-null constraint
  private String description;

  @NonNull
  @JsonFormat(pattern = "yyyy-MM-dd")
  @Column(nullable = false) // Database-level non-null constraint
  private LocalDate dueDate;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate createdAt;

  @Column(name = "is_done")
  @JsonProperty("isDone")
  private boolean isDone;
}
