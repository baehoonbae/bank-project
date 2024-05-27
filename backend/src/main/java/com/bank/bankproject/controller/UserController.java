package com.bank.bankproject.controller;

import com.bank.bankproject.domain.User;
import com.bank.bankproject.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response, HttpServletRequest request) {
        // 토큰을 발급 받습니다.
        Map<String, String> tokens = userService.login(user.getUsername(), user.getPassword(), request);

        // 발급된 토큰을 반환합니다.
        if (tokens != null) {
            Cookie accessTokenCookie = new Cookie("accessToken", tokens.get("accessToken"));
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setPath("/");
            response.addCookie(accessTokenCookie);

            Cookie refreshTokenCookie = new Cookie("refreshToken", tokens.get("refreshToken"));
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setPath("/");
            response.addCookie(refreshTokenCookie);

            return ResponseEntity.ok(tokens.get("accessToken"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    // 로그아웃
    @GetMapping("/user/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // 액세스 토큰과 리프레시 토큰을 저장한 쿠키를 제거합니다.
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setMaxAge(0);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok("로그아웃 되었습니다.");
    }

    // 로그인 상태 확인
    @GetMapping("/user/check/login")
    public ResponseEntity<String> checkLoginStatus(HttpServletRequest request,
                                                   HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        long[] result = userService.reissueToken(cookies);

        long isAccessTokenExpired = result[0];
        long isRefreshTokenExpired = result[1];

        if (isAccessTokenExpired == 1 && isRefreshTokenExpired == 1) {
            // 두 토큰이 모두 만료되었다면, 로그인 페이지로 이동하라는 메시지를 반환하고 401 상태 코드를 반환합니다.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("다시 로그인 해주세요.");
        } else if (isAccessTokenExpired == 1 && isRefreshTokenExpired == 0) {
            // 액세스 토큰만 만료되었다면, 새로운 액세스 토큰을 발급하고 200 상태 코드를 반환합니다.
            long userId = result[2];
            String newAccessToken = userService.createAccessToken(userId);

            // 새로운 액세스 토큰을 쿠키에 저장합니다.
            Cookie accessTokenCookie = new Cookie("accessToken", newAccessToken);
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setPath("/");
            response.addCookie(accessTokenCookie);

            return ResponseEntity.ok(newAccessToken);
        } else {
            // 두 토큰이 모두 유효하거나 액세스 토큰만 유효하다면, 200 상태 코드를 반환합니다.
            return ResponseEntity.ok("액세스 토큰이 유효합니다.");
        }
    }
}
