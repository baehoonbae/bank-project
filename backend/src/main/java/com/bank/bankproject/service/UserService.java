package com.bank.bankproject.service;

import com.bank.bankproject.domain.User;
import com.bank.bankproject.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

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
    public String login(String username, String password) {
        User user = (User) userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (passwordEncoder.matches(password, user.getPassword())) {
            Date now = new Date();
            Date expireTime = new Date(now.getTime() + 1800000);

            return Jwts.builder()
                    .claim("sub", username)
                    .claim("exp", expireTime.getTime() / 1000)
                    .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .compact();
        } else {
            return null;
        }
    }

    // 로그아웃


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
}