package com.bank.bankproject.service;

import com.bank.bankproject.domain.User;
import com.bank.bankproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

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
        if(user.getName() == null || user.getName().isEmpty()) {
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
    // 로그아웃
}
