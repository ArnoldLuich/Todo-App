package com.todo_backend.todo_backend.dto;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

public record TodoFilterRequest(
  Boolean isDone,
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDate,
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDateBefore,
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDateAfter,
  String description
) {}
