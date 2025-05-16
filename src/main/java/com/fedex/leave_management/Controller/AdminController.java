package com.fedex.leave_management.Controller;

import com.fedex.leave_management.Entity.Admin;
import com.fedex.leave_management.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;


    @GetMapping("/{username}")
    public ResponseEntity<Admin> getAdminByUsername(@PathVariable String username) {
        System.out.println("Fetching admin for username: " + username); // Log the username
        Admin admin = adminService.findByUsername(username);
        if (admin != null) {
            System.out.println("Found admin: " + admin); // Log admin details
        } else {
            System.out.println("Admin not found for username: " + username);
        }
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/id/{username}")
    public ResponseEntity<Long> getAdminIdByUsername(@PathVariable String username) {
        System.out.println("Fetching admin ID for username: " + username); // Log the username
        Long adminId = adminService.findIdByUsername(username);
        if (adminId != null) {
            System.out.println("Found admin ID: " + adminId); // Log admin ID
        } else {
            System.out.println("Admin ID not found for username: " + username);
        }
        return ResponseEntity.ok(adminId);
    }

    @PostMapping("/save")
    public ResponseEntity<Admin> saveAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Username: " + loginRequest.getUsername());
        System.out.println("Password: " + loginRequest.getPassword());

        boolean isAuthenticated = adminService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok(new SuccessResponse("Login successful")); // or return a token if using JWT
        } else {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid username or password"));
        }
    }
}

class SuccessResponse {
    private String message;
    public SuccessResponse(String message) { this.message = message; }
    public String getMessage() { return message; }
}

class ErrorResponse {
    private String message;
    public ErrorResponse(String message) { this.message = message; }
    public String getMessage() { return message; }
}
