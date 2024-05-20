package com.bank.bankproject.controller;

import com.bank.bankproject.domain.User;
import com.bank.bankproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 회원 가입
    @PostMapping("/user/signup")
    public ResponseEntity<String> join(@RequestBody User user) {
        userService.signUp(user);
        return ResponseEntity.ok("회원가입이 성공적으로 완료되었습니다.");
    }

    // 아이디 중복 확인
    @GetMapping("/user/check/username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean check = userService.checkUsername(username);
        return check ? new ResponseEntity<>(check, HttpStatus.CONFLICT) : ResponseEntity.ok(check);
    }

    // 이메일 중복 확인
    @GetMapping("/user/check/email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean check = userService.checkEmail(email);
        return check ? new ResponseEntity<>(check, HttpStatus.CONFLICT) : ResponseEntity.ok(check);
    }

    // 로그인
    @PostMapping("/user/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String token = userService.login(user.getUsername(), user.getPassword());
        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

}
