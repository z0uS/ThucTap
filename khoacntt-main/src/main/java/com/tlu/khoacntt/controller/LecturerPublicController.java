package com.tlu.khoacntt.controller;

import com.tlu.khoacntt.dto.response.LecturerResponse;
import com.tlu.khoacntt.service.LecturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/lecturers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LecturerPublicController {

    private final LecturerService lecturerService;

    @GetMapping
    public ResponseEntity<List<LecturerResponse>> getAllLecturers() {
        return ResponseEntity.ok(lecturerService.getAllLecturers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LecturerResponse> getLecturerById(@PathVariable String id) {
        return ResponseEntity.ok(lecturerService.getLecturerById(id));
    }
}
