package com.todo_backend.todo_backend.repository;

import com.todo_backend.todo_backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository
  extends JpaRepository<Todo, Long>, JpaSpecificationExecutor<Todo> {}
