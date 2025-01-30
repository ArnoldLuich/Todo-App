package com.todo_backend.todo_backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "todo")
@Setter
@Getter
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
  private Long id;

  @JsonFormat(shape = JsonFormat.Shape.STRING)
  @Column(nullable = false) // Database-level non-null constraint
  private String description;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @Column(nullable = false) // Database-level non-null constraint
  private LocalDate dueDate;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false, nullable = false)
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate createdAt;

  @Column(name = "is_done")
  @JsonProperty("isDone")
  private boolean isDone;
}
