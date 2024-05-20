package com.bank.bankproject.repository;

import com.bank.bankproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<Object> findByUsername(String username);

    Optional<Object> findByEmail(String email);
}
