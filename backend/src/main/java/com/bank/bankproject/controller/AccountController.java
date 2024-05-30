package com.bank.bankproject.controller;

import com.bank.bankproject.service.AccountService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    // 계좌 개설
    @PostMapping("/create")
    public ResponseEntity<String> createAccount(@RequestParam String email,
                                                @RequestParam String accountType,
                                                @RequestParam String accountPassword,
                                                HttpServletRequest request,
                                                HttpSession session) {
        // 토큰을 추출하고 유효성을 검사합니다.
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

        return accountService.createAccount(token, email, accountType, accountPassword, session);
    }
}
