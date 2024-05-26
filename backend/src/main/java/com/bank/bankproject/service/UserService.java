package com.bank.bankproject.service;

import com.bank.bankproject.domain.User;
import com.bank.bankproject.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final String secretKey = generateSecretKey();

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입
    public User signUp(User user) {
        // 유효성 검사
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new IllegalArgumentException("* 아이디: 필수 정보입니다.");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("* 비밀번호: 필수 정보입니다.");
        }
        if (user.getName() == null || user.getName().isEmpty()) {
            throw new IllegalArgumentException("* 이름: 필수 정보입니다.");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("* 이메일: 필수 정보입니다.");
        }
        if (user.getBirthDate() == null || user.getBirthDate().isEmpty()) {
            throw new IllegalArgumentException("* 생년월일: 필수 정보입니다.");
        }
        if (user.getPhoneNumber() == null || user.getPhoneNumber().isEmpty()) {
            throw new IllegalArgumentException("* 전화번호: 필수 정보입니다.");
        }
        if (checkUsername(user.getUsername())) {
            throw new IllegalArgumentException("*아이디: 이미 존재하는 아이디입니다.");
        }
        if (checkEmail(user.getEmail())) {
            throw new IllegalArgumentException("*이메일: 이미 존재하는 이메일입니다.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // 아이디 중복 확인
    public boolean checkUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    // 이메일 중복 확인
    public boolean checkEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // 로그인
    public Map<String, String> login(String username, String password, HttpServletRequest request) {
        // 사용자를 찾습니다.
        User user = (User) userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // 비밀번호를 검증합니다.
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 쿠키에서 리프레시 토큰 및 액세스 토큰을 가져옵니다.
            Cookie[] cookies = request.getCookies();
            String accessToken = null;
            String refreshToken = null;

            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals("accessToken")) {
                        accessToken = cookie.getValue();
                    } else if (cookie.getName().equals("refreshToken")) {
                        refreshToken = cookie.getValue();
                    }
                }
            }
            // 토큰이 만료되었는지 확인하고 재발급 및 새로운 토큰을 발급합니다.
            return reissueToken(accessToken, refreshToken, user);
        } else {
            throw new BadCredentialsException("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

    // 비밀 키 생성
    public String generateSecretKey() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey = keyGen.generateKey();
            return Base64.getEncoder().encodeToString(secretKey.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to generate secret key", e);
        }
    }

    // 디코딩된 비밀 키 반환
    private Key getSecretKey() {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
    }

    // 액세스 토큰 생성
    public String createAccessToken(Long userId) {
        Date now = new Date();
        Date expireTime = new Date(now.getTime() + 600000); // 10 minutes

        return Jwts.builder()
                .setSubject(userId.toString())
                .setExpiration(expireTime)
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 리프레시 토큰 생성
    public String createRefreshToken(Long userId) {
        Date now = new Date();
        Date expireTime = new Date(now.getTime() + 1800000); // 30 minutes

        return Jwts.builder()
                .setSubject(userId.toString())
                .setExpiration(expireTime)
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 만료 여부 확인
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Date expiration = claims.getExpiration();
            Date now = new Date();

            return expiration.before(now);
        } catch (Exception e) {
            // 토큰이 유효하지 않거나 만료되었을 경우
            return true;
        }
    }

    // 토큰으로부터 사용자의 id 값 추출
    public Long getUserIdFromToken(String token) {
        try {
            byte[] decodedKey = Base64.getDecoder().decode(secretKey);
            Key hmacKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");

            Claims claims = Jwts.parser()
                    .setSigningKey(hmacKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String userId = claims.getSubject();
            return Long.parseLong(userId);
        } catch (Exception e) {
            System.out.println("Error extracting userId from token: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // 로그인 시 토큰 재발급
    public Map<String, String> reissueToken(String accessToken,
                                            String refreshToken,
                                            User user) {
        Map<String, String> tokens = new HashMap<>();

        // 액세스 토큰과 리프레시 토큰의 만료 여부를 확인합니다.
        boolean isAccessTokenExpired = accessToken == null || isTokenExpired(accessToken);
        boolean isRefreshTokenExpired = refreshToken == null || isTokenExpired(refreshToken);

        if (isAccessTokenExpired && isRefreshTokenExpired) {
            // 두 토큰이 모두 만료되었다면, 새로운 토큰을 생성합니다.
            tokens.put("accessToken", createAccessToken(user.getId()));
            tokens.put("refreshToken", createRefreshToken(user.getId()));
        } else if (isAccessTokenExpired) {
            // 액세스 토큰만 만료되었다면, 액세스 토큰을 새로 발급합니다.
            tokens.put("accessToken", createAccessToken(user.getId()));
            tokens.put("refreshToken", refreshToken);
        } else if (isRefreshTokenExpired) {
            // 리프레시 토큰만 만료되었다면, 리프레시 토큰을 새로 발급합니다.
            tokens.put("accessToken", accessToken);
            tokens.put("refreshToken", createRefreshToken(user.getId()));
        } else {
            // 두 토큰이 모두 유효하다면, 기존의 토큰을 반환합니다.
            tokens.put("accessToken", accessToken);
            tokens.put("refreshToken", refreshToken);
        }

        return tokens;
    }

    // 토큰 재발급
    public long[] reissueToken(Cookie[] cookies) {
        // 쿠키로부터 액세스 토큰과 리프레시 토큰을 가져옵니다.
        String accessToken = null;
        String refreshToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    accessToken = cookie.getValue();
                } else if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }
        System.out.println("Refresh token: " + refreshToken);  // 로그 메시지 추가

        long isAccessTokenExpired = (accessToken == null || isTokenExpired(accessToken)) ? 1L : 0L;
        long isRefreshTokenExpired = (refreshToken == null || isTokenExpired(refreshToken)) ? 1L : 0L;
        long userId = getUserIdFromToken(refreshToken);
        return new long[]{isAccessTokenExpired, isRefreshTokenExpired, userId};
    }
}