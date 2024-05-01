package com.bank.bankproject.repository;

import com.bank.bankproject.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
