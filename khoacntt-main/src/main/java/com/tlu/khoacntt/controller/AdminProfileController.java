package com.tlu.khoacntt.controller;

import com.tlu.khoacntt.dto.response.AdminResponse;
import com.tlu.khoacntt.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminProfileController {

    private final AdminRepository adminRepository;

    @GetMapping
    public ResponseEntity<AdminResponse> getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return adminRepository.findByUsername(username)
                .map(admin -> ResponseEntity.ok(AdminResponse.builder()
                        .id(admin.getId())
                        .username(admin.getUsername())
                        .email(admin.getEmail())
                        .fullName(admin.getFullName())
                        .build()))
                .orElse(ResponseEntity.notFound().build());
    }
}
