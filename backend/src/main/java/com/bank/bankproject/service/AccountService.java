package com.bank.bankproject.service;

import com.bank.bankproject.domain.Account;
import com.bank.bankproject.domain.User;
import com.bank.bankproject.repository.AccountRepository;
import com.bank.bankproject.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;

    @Autowired
    public AccountService(AccountRepository accountRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, UserService userService) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    // 계좌 개설
    public ResponseEntity<String> createAccount(String token, String accountType, String accountPassword) {
        if (token != null && token.startsWith("Bearer ")) {
            // 토큰에서 "Bearer "를 제거합니다.
            token = token.substring(7);

            // 토큰에서 userId 를 추출하고 검증합니다.
            Long userId = userService.getUserIdFromToken(token);
            if (userId == null) {
                return ResponseEntity.status(401).body("로그인이 필요합니다.");
            }
            Optional<User> userOptional = userRepository.findById(userId);

            // 계좌 개설 로직
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Account newAccount = new Account();
                newAccount.setAccountType(accountType);
                newAccount.setAccountPassword(passwordEncoder.encode(accountPassword));
                newAccount.setUser(user);
                newAccount.setBalance(0.0);
                accountRepository.save(newAccount);
                return ResponseEntity.ok("계좌가 생성되었습니다.");
            } else {
                return ResponseEntity.badRequest().body("오류 발생");
            }
        } else {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
    }
}
