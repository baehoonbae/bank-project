package com.bank.bankproject.controller;

import com.bank.bankproject.service.AccountService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    // 계좌 개설
    @PostMapping("/account/create")
    public ResponseEntity<String> createAccount(@RequestParam String accountType,
                                                @RequestParam String accountPassword,
                                                HttpServletRequest request) {
        // 토큰을 추출합니다.
        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        return accountService.createAccount(token, accountType, accountPassword);
    }
}
