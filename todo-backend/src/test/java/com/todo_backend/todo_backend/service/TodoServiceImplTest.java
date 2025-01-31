package com.todo_backend.todo_backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.todo_backend.todo_backend.dto.TodoFilterRequest;
import com.todo_backend.todo_backend.model.Todo;
import com.todo_backend.todo_backend.repository.TodoRepository;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

@ExtendWith(MockitoExtension.class)
public class TodoServiceImplTest {

  @Mock
  private TodoRepository todoRepository;

  @InjectMocks
  private TodoServiceImpl todoService;

  private Todo validTodo;
  private final LocalDate testDate = LocalDate.now();

  @BeforeEach
  void setUp() {
    validTodo = new Todo();
    validTodo.setId(1L);
    validTodo.setDescription("Test Todo");
    validTodo.setDueDate(testDate);
    validTodo.setCreatedAt(testDate.minusDays(1));
    validTodo.setDone(false);
  }

  @Test
  void getTodoById_WhenExists_ShouldReturnTodo() {
    when(todoRepository.findById(1L)).thenReturn(Optional.of(validTodo));
    Optional<Todo> result = todoService.getTodoById(1L);
    assertTrue(result.isPresent());
    assertEquals(validTodo, result.get());
  }

  @Test
  void getTodoById_WhenNotExists_ShouldReturnEmpty() {
    when(todoRepository.findById(99L)).thenReturn(Optional.empty());
    Optional<Todo> result = todoService.getTodoById(99L);
    assertTrue(result.isEmpty());
  }

  @Test
  void createTodo_WithValidTodo_ShouldSaveAndReturnTodo() {
    validTodo.setId(null);
    when(todoRepository.save(any(Todo.class))).thenReturn(validTodo);
    Optional<Todo> result = todoService.createTodo(validTodo);
    assertTrue(result.isPresent());
    assertEquals(validTodo, result.get());
    verify(todoRepository).save(validTodo);
  }

  @Test
  void createTodo_WithInvalidTodo_ShouldReturnEmpty() {
    Todo invalidTodo = new Todo();
    Optional<Todo> result = todoService.createTodo(invalidTodo);
    assertTrue(result.isEmpty());
    verify(todoRepository, never()).save(any());
  }

  @Test
  void updateTodo_WhenExists_ShouldUpdateAndReturnTodo() {
    when(todoRepository.existsById(1L)).thenReturn(true);
    when(todoRepository.save(validTodo)).thenReturn(validTodo);
    Optional<Todo> result = todoService.updateTodo(1L, validTodo);
    assertTrue(result.isPresent());
    assertEquals(1L, result.get().getId());
    verify(todoRepository).save(validTodo);
  }

  @Test
  void updateTodo_WhenNotExists_ShouldReturnEmpty() {
    when(todoRepository.existsById(99L)).thenReturn(false);
    Optional<Todo> result = todoService.updateTodo(99L, validTodo);
    assertTrue(result.isEmpty());
    verify(todoRepository, never()).save(any());
  }

  @Test
  void deleteTodo_WhenExists_ShouldReturnTrue() {
    when(todoRepository.existsById(1L)).thenReturn(true);
    doNothing().when(todoRepository).deleteById(1L);
    boolean result = todoService.deleteTodo(1L);
    assertTrue(result);
    verify(todoRepository).deleteById(1L);
  }

  @Test
  void deleteTodo_WhenNotExists_ShouldReturnFalse() {
    when(todoRepository.existsById(99L)).thenReturn(false);
    boolean result = todoService.deleteTodo(99L);
    assertFalse(result);
    verify(todoRepository, never()).deleteById(any());
  }

  @Test
  void getTodosWithFilters_ShouldApplySpecifications() {
    TodoFilterRequest filter = new TodoFilterRequest(
      true,
      testDate,
      null,
      null,
      "test"
    );
    List<Todo> expected = Collections.singletonList(validTodo);
    when(todoRepository.findAll(any(Specification.class))).thenReturn(expected);
    List<Todo> result = todoService.getTodosWithFilters(filter);
    assertEquals(expected, result);
    verify(todoRepository).findAll(any(Specification.class));
  }

  @Test
  void createTodo_WithNullDescription_ShouldFail() {
    Todo invalidTodo = new Todo();
    invalidTodo.setDueDate(testDate);
    Optional<Todo> result = todoService.createTodo(invalidTodo);
    assertTrue(result.isEmpty());
  }

  @Test
  void createTodo_WithNullDueDate_ShouldFail() {
    Todo invalidTodo = new Todo();
    invalidTodo.setDescription("Invalid Todo");
    Optional<Todo> result = todoService.createTodo(invalidTodo);
    assertTrue(result.isEmpty());
  }
}
